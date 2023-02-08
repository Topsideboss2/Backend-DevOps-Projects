<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    use ApiResponser;
    public function forgot(Request $request) {
        try {
            $validator = Validator::make($request->only('email'), [
                'email' => 'required|email',
            ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = User::where('email', $request->email)->count();

        if($user < 1) {
            return $this->errorResponse('User does not exist', Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $status = Password::sendResetLink($request->only('email'));

        if($status == Password::RESET_LINK_SENT) {
            return $this->successResponse('Reset password link sent to email');
        }
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function reset(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|confirmed',
                'token' => 'required|string'
            ]);

            if($validator->fails()) {
                return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $email_password_status = Password::reset($request->only(['email', 'password', 'token']), function ($user, $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();//$user->setRememberToken(Str::random(60));
            });

            if($email_password_status == Password::INVALID_USER) {
                return $this->errorResponse('User does not exist', Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            if($email_password_status == Password::INVALID_TOKEN) {
                return $this->errorResponse('Invalid reset password token', Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            if($email_password_status == Password::PASSWORD_RESET) {
                return $this->successResponse('Password successfully changed');
            }

        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
