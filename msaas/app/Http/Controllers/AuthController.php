<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Company;
use App\Models\CompanySetting;
use App\Models\User;
use App\Models\CompanyUser;
use App\Traits\ActiveCompany;
use App\Traits\ApiResponser;
use App\Traits\DefaultAdminPermission;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ApiResponser, DefaultAdminPermission, ActiveCompany;
    protected $initialLogin; //cheking if it is the initial company login
    protected function guard()
    {
        return Auth::guard();
    }
    protected function credentials (Request $request) {
        return $request->only('email', 'password');
    }

    private function authenticated(Request $request, $user)
    {
        try {
            $user->last_login_at = Carbon::now();
            $user->last_login_ip = $request->getClientIp();
            $user->save();
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    protected function attemptLogin(Request $request)
    {
        try {
            return Auth::guard()->attempt($this->credentials($request), $request->filled('remember'));
        } catch (\Throwable $th) {

            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    protected function sendLoginResponse(Request $request, User $user = null)
    {
        try {
            if ($user) {
                Auth::guard()->login($user);
            }

            $user = Auth::guard()->user();
            if(!$user->email_verified_at) {
                return $this->errorResponse('Account not verified', Response::HTTP_UNAUTHORIZED);
            }

            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->plainTextToken;
            $ability = $user->getAllPermissions();

            // check if it is the initial company login by checking if the company has company settings
            $company_settings = CompanySetting::where('company_id', User::company_id())->first();
            if($company_settings == null) {
                $isInitialLogin = true;
            } else {
                $isInitialLogin = false;
            }

            // check if there is an active company for the user in the json response then return true or false
            $activeCompany = $this->checkActive();
            $isActiveCompany = false;

            if($activeCompany->status() == 200) {
                $isActiveCompany = true;
            }

            if(!$activeCompany) {
                $isActiveCompany = false;
            }

            return $this->successResponse([
                'accessToken' => $token,
                'token_type' => 'Bearer',
                'initialLogin' => $isInitialLogin,
                'activeCompany' => $isActiveCompany,
                'user' => $user,
                'ability' => $ability,
            ]);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    protected function sendFailedLoginResponse(Request $request)
    {
        return $this->errorResponse('This credentials do not match our records', Response::HTTP_UNAUTHORIZED);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'max:255', 'string'],
            'password' => ['required', 'max:100', 'string'],
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }


        return $this->errorResponse('This credentials do not match our records', Response::HTTP_UNAUTHORIZED);

        return false;
    }

    public function register(Request $request) {
        DB::beginTransaction();
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'phone' => 'required'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $company = new Company();
            $company->name = $request->name;
            $company->email = $request->email;
            $company->phone = $request->phone;
            $company->save();
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }

        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->company_id = $company->id;
            $user->type = 'admin';
            $user->save();

            try {
                $this->givePermission($user->id, $company->id);
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            try {
                $this->resend($user);
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }


        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }

        $company['users'] = $company->users;
        DB::commit();
        return $this->successResponse($company);
    }

    public function verify($user_id, Request $request) {
        if (!$request->hasValidSignature()) {
            return $this->errorResponse('Invalid/Expired url provided', Response::HTTP_UNAUTHORIZED);
        }

        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        $spa_url = env('SPA_URL');
        $url = $spa_url.'/registration-success';

        return Redirect::to($url);
    }

    public function resend(User $user) {
        if ($user->hasVerifiedEmail()) {
            return $this->errorResponse('Email already verified', Response::HTTP_BAD_REQUEST);
        }

        $user->sendEmailVerificationNotification();

        return $this->successResponse('Email verification link sent on your email');
    }

    public function logout() {
        try {
            Session::flush();
            Auth::logout();
            return $this->successResponse('Logout successful');
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }


}
