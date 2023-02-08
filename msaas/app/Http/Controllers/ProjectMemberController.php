<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use App\Notifications\NewProjectMember;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProjectMemberController extends Controller
{
    use ApiResponser, LogProjectActivity;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
        ]);
        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        DB::beginTransaction();
        try {
            $users = $request->user_id;

            foreach ($users as $user) {
                try {
                    if(is_null($user)) {
                        return $this->errorResponse('User '.$user. ' not found', Response::HTTP_BAD_REQUEST);
                        DB::rollBack();
                    }

                    $isMember = ProjectMember::checkIsMember($request->project_id, $user);

                    if($isMember) {
                        return $this->errorResponse('User is already a member of the project', Response::HTTP_NOT_ACCEPTABLE);
                        DB::rollBack();
                    }

                    $member = new ProjectMember();
                    $member->company_id = User::company_id();
                    $member->user_id = $user;
                    $member->project_id = $request->project_id;
                    $member->save();

                    $userModel = User::findOrFail($user);
                    $userModel->notify(new NewProjectMember($member));

                    try {
                        $this->logActivity(
                            User::company_id(),
                            $member->project_id,
                            $this->logDescription('Project Member', $member->id, 'created'),
                            auth()->user(),
                            $member
                        );
                    } catch (\Throwable $th) {
                        return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                        DB::rollBack();
                    }

                } catch (\Throwable $th) {
                    return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                }

            }

            DB::commit();

            return $this->successResponse($users);

        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProjectMember  $projectMember
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $project = Project::find($id)->members_many;

            return $this->successResponse($project);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $project = Project::find($id)->members_many;

            return $this->successResponse($project);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProjectMember  $projectMember
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProjectMember $projectMember)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProjectMember  $projectMember
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $projectMember = ProjectMember::find($id);
            if(!$projectMember) {
                return $this->notFound();
            }

            DB::beginTransaction();

            if($projectMember->type == 'admin') {
                return $this->errorResponse('Cannot delete default admin', Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $projectMember->delete();
            try {
                $this->logActivity(
                    User::company_id(),
                    $projectMember->project_id,
                    $this->logDescription('Project Member', $projectMember->id, 'was deleted'),
                    auth()->user(),
                    $projectMember
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->deleteMessage('Project', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_destroy($id)
    {
        try {
            $projectMember = ProjectMember::find($id);
            if(!$projectMember) {
                return $this->notFound();
            }
            if($$projectMember->company->id != User::company_id()) {
                return $this->forbidden();
            }

            DB::beginTransaction();

            if($projectMember->type == 'admin') {
                return $this->errorResponse('Cannot delete default admin', Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $projectMember->delete();
            try {
                $this->logActivity(
                    User::company_id(),
                    $projectMember->project_id,
                    $this->logDescription('Project Member', $projectMember->id, 'was deleted'),
                    auth()->user(),
                    $projectMember
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->deleteMessage('Project', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
