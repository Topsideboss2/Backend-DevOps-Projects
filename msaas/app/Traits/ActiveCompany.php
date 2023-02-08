<?php 

namespace App\Traits;
use App\Traits\ApiResponser;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\User;
use App\Models\Role;

trait ActiveCompany {
    use ApiResponser;

    public function checkRolePermission ($roleOrPermission) {
        $authGuard = Auth::guard();
        if($authGuard->guest()) {
            return $this->errorResponse('You are not logged in', Response::HTTP_UNAUTHORIZED);
        }

        $rolesOrPermissions = is_array($roleOrPermission)
            ? $roleOrPermission
            : explode('|', $roleOrPermission);

        $company_id = $this->checkActiveCompanyId();

        $companyusers = CompanyUser::where('company_id', $company_id)->where('user_id', $authGuard->user()->id)->where('active', 1)->first();
        if(!$companyusers) {
            return $this->errorResponse('You are not authorized to access this resource', Response::HTTP_UNAUTHORIZED);
        }

        $role = Role::find($companyusers->role_id);
        if(!$role->permissions->contains("name", $rolesOrPermissions[0])) {
            return false;
        }

        return true;
    }

    public function ifActiveCompany ($company_id) {
        $company = CompanyUser::where('company_id', $company_id)->where('active', 1)->first();
        if ($company) {
            return true;
        }
        return false;
    }

    public static function checkActiveCompanyId () {

        $user = Auth::user();
        $company_user = CompanyUser::where('user_id', $user->id)->where('active', 1)->first();
        if (!$company_user) {
            return $this->errorResponse('No company is active', Response::HTTP_BAD_REQUEST);
        }
        return $company_user->company_id;

    }

    public function checkActive () {
        $user = Auth::user();
        $company_user = CompanyUser::where('user_id', $user->id)->where('active', 1)->first();
        if (!$company_user) {
            return $this->errorResponse('No company is active', Response::HTTP_BAD_REQUEST);
        }
        $role = Role::where('id', $company_user->role_id)->first();
        $company = Company::find($company_user->company_id);
        $company['permissions'] = $role->permissions;
        return $this->successResponse($company);
    }

    public function activate ($company_id) {
        $user = Auth::user();
        $a = CompanyUser::where('user_id', $user->id)->where('active', 1)->first();
        $company_user = CompanyUser::where('user_id', $user->id)->where('company_id', $company_id)->first();
        if(!$company_user) {
            return $this->errorResponse('Forbidden', Response::HTTP_UNAUTHORIZED);
        }

        if($a) {
            return $this->errorResponse('You are already active in a company', Response::HTTP_BAD_REQUEST);
        }
        $company_user->active = 1;
        $company_user->save();
        $role = Role::where('id', $company_user->role_id)->first();
        $company = Company::find($company_user->company_id);
        $company['permissions'] = $role->permissions;
        return $this->successResponse($company);
    }

    public function logoutCompany ($company_id) {
        if(!$this->ifActiveCompany($company_id)) {
            return $this->errorResponse('Company is not active', Response::HTTP_BAD_REQUEST);
        }
        $user = Auth::user();
        $company_user = CompanyUser::where('user_id', $user->id)->where('company_id', $company_id)->where('active', 1)->first();
        $company_user->active = 0;
        $company_user->save();
        return $this->successResponse("Logged out of company successfully");
    }

    public function logoutAll () {
        $user = Auth::user();
        $company_users = CompanyUser::where('user_id', $user->id)->get();
        foreach ($company_users as $company_user) {
            $company_user->active = 0;
            $company_user->save();
        }
        return $this->successResponse("Logged out of all companies successfully");
    }
}
