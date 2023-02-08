<?php

namespace App\Http\Controllers;

use App\Models\Invite;
use App\Models\User;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Notifications\InviteNotification;
use App\Notifications\InviteExistingUser;
use App\Traits\ApiResponser;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;

class MemberInviteController extends Controller
{
    use ApiResponser;

    public function invite (Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'role_id' => 'required|exists:roles,id'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $company = Company::find(User::company_id());

        DB::beginTransaction();
        try {
            try {

                $existingUser = User::where('email', $request->email)->first();
                if(!(is_null($existingUser))) {
                    $companyusers = new CompanyUser();
                    $companyusers->company_id = $company->id;
                    $companyusers->user_id = $existingUser->id;
                    $companyusers->role_id = $request->role_id;
                    $companyusers->save();

                    $existingUser->notify(new InviteExistingUser($company->name));

                    DB::commit();
                    return $this->successResponse("User invitation link sent", Response::HTTP_OK);
                }

            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
                DB::rollBack();
            }

            do {
                $token = Str::random(20);
            } while (Invite::where('token', $token)->first());
            $invite = new Invite();
            $invite->token = $token;
            $invite->email = $request->email;
            $invite->role_id = $request->role_id;
            $invite->save();

            $url = URL::temporarySignedRoute(
                'registration', now()->addMinutes(300), ['token' => $token, 'company' => User::company_id(), $request->email]
            );

            $invite->notify(new InviteNotification($url));

            DB::commit();
            return $this->successResponse('The invite has been sent successfully');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }

    }

    public function registration_action ($token, $company, $email) {
        $invite = Invite::where('token', $token)->first();
        return Redirect::to('http://18.116.46.98/new-member-register/'.$token.'/'.$company.'/'.$email);
    }

    public function userRegistration (Request $request) {
        $validator = Validator::make($request->all(), [
            'token' => 'required|exists:invites,token',
            'company_id' => 'required|exists:companies,id',
            'name' => 'required',
            'password' => 'required|confirmed',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        DB::beginTransaction();
        try {
            $invite = Invite::where('token', $request->token)->first();
            if(!$invite) {
                return $this->notFound();
            }

            if($request->email != $invite->email) {
                return $this->errorResponse('Email does not match the invited email', Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->company_id = $request->company_id;
            $user->password = Hash::make($request->password);
            $user->email_verified_at = Carbon::now();
            $user->type = 'user';
            $user->save();

            try {
                $companyuser = new CompanyUser();
                $companyuser->company_id = $request->company_id;
                $companyuser->user_id = $user->id;
                $companyuser->role_id = $invite->role_id;
                $companyuser->save();
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
                DB::rollback();
            }

            try {
                $invite->delete();
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->successResponse($user, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }


    }
}
