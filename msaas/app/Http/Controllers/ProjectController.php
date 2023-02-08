<?php

namespace App\Http\Controllers;

use App\Models\FieldProject;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    use ApiResponser, LogProjectActivity;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $projects = Project::all();
        return $this->successResponse($projects);
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
        DB::beginTransaction();
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3',
            'location' => 'nullable',
            'description' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'user_id' => 'required|exists:users,id',
            'data' => 'nullable',
            'longitude' => 'required',
            'latitude' => 'required'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
            DB::rollBack();
        }

        if(User::company_id() != User::checkCompany($request->user_id, User::company_id())) {
            return $this->forbidden();
            DB::rollBack();
        }

        try {
            try {
                $project = new Project();
                $project->company_id = User::company_id();
                $project->title = $request->title;
                $project->location = $request->location;
                $project->description = $request->description;
                $project->longitude = $request->longitude;
                $project->latitude = $request->latitude;
                $project->start_date = $request->start_date;
                $project->end_date = $request->end_date;
                $project->user_id = $request->user_id;
                $project->save();
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            if($request->data) {
                foreach ($request->data as $key => $value) {
                    foreach($value as $key => $field) {
                        $fieldproject = new FieldProject();
                        $fieldproject->company_id = User::company_id();
                        $fieldproject->project_id = $project->id;
                        $fieldproject->field_id = $key;
                        $fieldproject->value = $field;
                        $fieldproject->save();
                    }
                }
            }

            try {
                $this->logActivity(
                    User::company_id(),
                    $project->id,
                    $this->logDescription('Project', $project->title, 'created'),
                    auth()->user(),
                    $project
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->successResponse($project, Response::HTTP_CREATED);

        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $project = Project::find($id);
            if(!$project) {
                return $this->notFound();
            }

            return $this->successResponse($project);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $project = Project::find($id);
            if(!$project) {
                return $this->notFound();
            }
            // if($project->company->id != User::company_id()) {
            //     return $this->forbidden();
            // }

            return $this->successResponse($project);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3',
            'location' => 'nullable',
            'description' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'user_id' => 'required|exists:users,id',
            'data' => 'nullable'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
            DB::rollBack();
        }

        if(User::company_id() != User::checkCompany($request->user_id)) {
            return $this->forbidden();
            DB::rollBack();
        }

        try {
            try {
                $project = Project::find($id);
            if(!$project) {
                return $this->notFound();
            }

            if($project->company->id != User::company_id()) {
                return $this->forbidden();
            }
                $project->company_id = User::company_id();
                $project->title = $request->title;
                $project->location = $request->location;
                $project->description = $request->description;
                $project->start_date = $request->start_date;
                $project->end_date = $request->end_date;
                $project->user_id = $request->user_id;
                $project->save();
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            if($request->data) {
                foreach ($request->data as $key => $value) {
                    foreach($value as $key => $field) {
                        $fieldproject = new FieldProject();
                        $fieldproject->company_id = User::company_id();
                        $fieldproject->project_id = $project->id;
                        $fieldproject->field_id = $key;
                        $fieldproject->value = $field;
                        $fieldproject->save();
                    }
                }
            }

            try {
                $this->logActivity(
                    User::company_id(),
                    $project->id,
                    $this->logDescription('Project', $project->title, 'created'),
                    auth()->user(),
                    $project
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->successResponse($project->fields);

        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    public function company_update(Request $request, $id)
    {
        DB::beginTransaction();
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3',
            'location' => 'nullable',
            'description' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'user_id' => 'required|exists:users,id',
            'data' => 'nullable',
            'longitude' => 'required',
            'latitude' => 'required'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
            DB::rollBack();
        }

        if(User::company_id() != User::checkCompany($request->user_id, User::company_id())) {
            return $this->forbidden();
            DB::rollBack();
        }

        try {
            try {
                $project = Project::find($id);
            if(!$project) {
                return $this->notFound();
            }

            if($project->company->id != User::company_id()) {
                return $this->forbidden();
            }
                $project->company_id = User::company_id();
                $project->title = $request->title;
                $project->location = $request->location;
                $project->description = $request->description;
                $project->longitude = $request->longitude;
                $project->latitude = $request->latitude;
                $project->start_date = $request->start_date;
                $project->end_date = $request->end_date;
                $project->user_id = $request->user_id;
                $project->save();
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            if($request->data) {
                foreach ($request->data as $key => $value) {
                    foreach($value as $key => $field) {
                        $fieldproject = array();
                        $fieldproject['company_id'] = User::company_id();
                        $fieldproject['project_id'] = $project->id;
                        $fieldproject['field_id'] = $key;
                        $fieldproject['value'] = $field;
                        FieldProject::where('project_id', $project->id)->updateOrCreate($fieldproject);
                    }
                }
            }

            try {
                $this->logActivity(
                    User::company_id(),
                    $project->id,
                    $this->logDescription('Project', $project->title, 'created'),
                    auth()->user(),
                    $project
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->successResponse($project->fields);

        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $project = Project::find($id);
            if(!$project) {
                return $this->notFound();
            }

            DB::beginTransaction();

            $project->delete();
            try {
                $this->logActivity(
                    User::company_id(),
                    $project->id,
                    $this->logDescription('Project', $project->title, 'was deleted'),
                    auth()->user(),
                    $project
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

    //Company Delete Project

    public function company_destroy($id)
    {
        try {
            $project = Project::find($id);
            if(!$project) {
                return $this->notFound();
            }
            if($project->company->id != User::company_id()) {
                return $this->forbidden();
            }
            DB::beginTransaction();
            $project->delete();
            try {
                $this->logActivity(
                    User::company_id(),
                    $project->id,
                    $this->logDescription('Project', $project->title, 'was deleted'),
                    auth()->user(),
                    $project
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

    public function userProjects () {
        $project = ProjectMember::join('users', 'users.id', '=', 'project_members.user_id')
        ->join('projects', 'projects.id', '=', 'project_members.project_id')
        ->select('project_members.*','users.name', 'projects.*')
        ->where('project_members.user_id', auth()->user()->id)
        ->get();

        return $this->successResponse($project);
    }
}
