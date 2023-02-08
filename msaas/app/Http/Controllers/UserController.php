<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\User;
use App\Models\Role;
use App\Models\Task;
use App\Models\Project;
use App\Models\Activity;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    use ApiResponser;
    protected $company_details;
    public function userCompanies () {
        $user = Auth::user();
        $companies = $user->company_users;
        $company_details = [];
        foreach ($companies as $company) {
            $c = Company::find($company->company_id);
            $r = Role::find($company->role_id);
            $details['company_id'] = $c->id;
            $details['company_name'] = $c->name;
            $details['company_role'] = $r->name;
            array_push($company_details, $details);
        }
        
        return $this->successResponse($company_details);
    }

    public function update (Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'active' => 'required',
            'role_id' => 'required|exists:roles,id'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        DB::beginTransaction();
        try {
            $user = User::find($id);
            if(!$user) {
                return $this->errorResponse($this->notFound(), Response::HTTP_NOT_FOUND);
            }

            $user->active = $request->active;
            $user->save();

            $companyusers = CompanyUser::where('user_id', $user->id)->where('company_id', User::company_id())->first();
            $companyusers->role_id = $request->role_id;
            $companyusers->save();

            DB::commit();
            return $this->successResponse("User updated", Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollback();
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        
    }

    public function show ($id) {
        $user = User::find($id);
        if(!$user) {
            return $this->errorResponse($this->notFound(), Response::HTTP_NOT_FOUND);
        }
        return $this->successResponse($user);
    }

    private function project () {
        $company = User::company_id();
        $projects = Project::join('users', 'users.id', '=', 'projects.user_id')
        ->where('projects.company_id', $company)
        ->select('projects.*','users.name')
        ->get();

        return $projects;
    }

    private function tasks () {
        $company = User::company_id();
        $tasks = Task::join('users', 'users.id', '=', 'tasks.user_id')
        ->join('projects', 'projects.id', '=', 'tasks.project_id')
        ->where('tasks.company_id', $company)
        ->select('tasks.*','users.name', 'projects.*')
        ->get();

        return $tasks;
    }

    private function activities () {
        $company = User::company_id();
        $activities = Activity::join('users', 'users.id', '=', 'activities.user_id')
        ->join('projects', 'projects.id', '=', 'activities.project_id')
        ->join('tasks', 'tasks.id', '=', 'activities.task_id')
        ->where('activities.company_id', $company)
        ->select('activities.*','users.name', 'projects.*', 'tasks.*')
        ->get();

        return $activities;
    }

    public function profile () {
        $profile = array();
        $profile['projects'] = $this->project()->count();
        $profile['tasks'] = $this->tasks()->count();
        $profile['activities'] = $this->activities()->count();
        return $this->successResponse($profile);
    }
}
