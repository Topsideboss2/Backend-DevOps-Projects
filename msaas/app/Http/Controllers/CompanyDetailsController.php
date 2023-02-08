<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use App\Models\Report;
use App\Models\Company;
use App\Models\User;
use App\Models\CompanyUser;
use App\Models\CompanyRoles;
use App\Models\Role;

class CompanyDetailsController extends Controller
{
    use ApiResponser;

    protected function company () {
        $company = Company::find(User::company_id());
        return $company;
    }

    public function roles () {
        $roles = array();
        $rs = CompanyUser::where('company_id', $this->company()->id)->get();
        $r = CompanyRoles::where('company_id', $this->company()->id)->get();
        foreach ($r as $key => $role) {
            $role = Role::find($role->role_id);
            $role->permissions;
            array_push($roles, $role);
        }
        return $this->successResponse($roles);
    }

    public function users () {
        $company_users = array();
        $users = CompanyUser::join('users', 'users.id', '=', 'company_users.user_id')
        ->join('companies', 'companies.id', '=', 'company_users.company_id')
        ->select('company_users.*', 'companies.name as company_name', 'users.id as user_id', 'users.name as user_name', 'users.email as user_email')
        ->get();
        $filtered = $users->filter(function ($value, $key) {
            return $value->company_id == $this->company()->id;
        });
        foreach ($filtered as $key => $user) {
            $user->role;
            array_push($company_users, $user);
        }
        return $this->successResponse($company_users);
    }

    public function fields () {
        return $this->successResponse($this->company()->fields);
    }

    public function projects () {
        return $this->successResponse($this->company()->projects);
    }

    public function objectives () {
        return $this->successResponse($this->company()->objectives);
    }

    public function milestones () {
        return $this->successResponse($this->company()->milestones);
    }

    public function tasks () {
        return $this->successResponse($this->company()->tasks);
    }

    public function activities () {
        return $this->successResponse($this->company()->activities);
    }

    public function documents () {
        return $this->successResponse($this->company()->documents);
    }

    public function companysettings () {
        return $this->successResponse($this->company()->companysettings);
    }

    public function reports () {
      $reports = Report::where('company_id', $this->company()->id)
      ->join('report_types', 'report_types.id', '=', 'reports.report_type_id')
      ->select('reports.*', 'report_types.name as report_type_name', 'report_types.id as report_type_id')
      ->get();
      return $this->successResponse($reports);
    }

    public function profile () {
        $profile = array();
        $projects = $this->company()->projects->count();
        $activities = $this->company()->activities->count();

        $company_users = array();
        $users = CompanyUser::join('users', 'users.id', '=', 'company_users.user_id')
        ->join('companies', 'companies.id', '=', 'company_users.company_id')
        ->select('company_users.*', 'companies.name as company_name', 'users.id as user_id', 'users.name as user_name', 'users.email as user_email')
        ->get();
        $filtered = $users->filter(function ($value, $key) {
            return $value->company_id == $this->company()->id;
        });
        foreach ($filtered as $key => $user) {
            $user->role;
            array_push($company_users, $user);
        }

        $profile['projects'] = $projects;
        $profile['activities'] = $activities;
        $profile['members'] = count($company_users);
        return $this->successResponse($profile);
    }
}
