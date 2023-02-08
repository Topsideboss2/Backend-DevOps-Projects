<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\CompanyRoles;
use App\Traits\ActiveCompany;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    use ApiResponser, ActiveCompany;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $roles = Role::all();
            return $this->successResponse($roles);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {        
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        DB::beginTransaction();
        try {
            // get the users active company
            $content = $this->checkActive();
            $company = json_decode($content->getContent());
            $role = new Role();
            $role->guard_name = 'web';
            // add company name to role name
            $role->name = $company->data->name . '-' . $request->name;
            // $role->name = $request->name;
            $role->save();
            try {
                $companyrole = new CompanyRoles();
                $companyrole->company_id = User::company_id();
                $companyrole->role_id = $role->id;
                $companyrole->save();
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }
            DB::commit();
            return $this->successResponse($role, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $role = Role::find($id);
            if(!$role) {
                return $this->notFound();
            }

            return $this->successResponse($role);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $role = Role::find($id);
            if(!$role) {
                return $this->notFound();
            }

            $role->name = $request->name;
            $role->save();

            return $this->successResponse($role);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $role = Role::find($id);
            if(!$role) {
                return $this->notFound();
            }

            $role->delete();

            return $this->deleteMessage('Role', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function syncPermissions (Request $request) {

        $validator = Validator::make($request->only('role_id','permissions'), [
            'role_id' => 'required|exists:roles,id',
            'permissions' => 'required|exists:permissions,name'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $role = Role::find($request->role_id);
            if(!$role) {
                return $this->notFound();
            }
            $role->syncPermissions($request->permissions);
            return $this->successResponse($role->permissions);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function revokePermission (Request $request, $id) {
        $validator = Validator::make($request->only('permissions'), [
            'permission' => 'required'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $role = Role::find($id);
            if(!$role) {
                return $this->notFound();
            }

            $role->revokePermissionTo($request->permission);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function assignRoleToUser (Request $request) {
        $validator = Validator::make($request->only('user_id','role_id'), [
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $user = User::findOrFail($request->user_id);
            $role = Role::findOrFail($request->role_id);
            $user->assignRole($role);
            $user['roles'] = $user->getRoleNames();
            return $this->successResponse($user);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }


    }
}
