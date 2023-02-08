<?php

namespace App\Http\Controllers;

use App\Models\Objectives;
use App\Models\User;
use App\Models\Project;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ObjectivesController extends Controller
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
            $objectives = Objectives::all();
        return $this->successResponse($objectives);
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
            'project_id' => 'required',
            'objective' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $project = Project::find($request->project_id);
            if(!$project) {
                return $this->notFound();
            }
            if($project->company->id != User::company_id()) {
                return $this->forbidden();
            }
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        

        DB::beginTransaction();
        try {
            $objective = new Objectives();
            $objective->company_id = User::company_id();
            $objective->project_id = $request->project_id;
            $objective->objective = $request->objective;
            $objective->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $objective->project->id,
                    $this->logDescription('Objective', $objective->objective, 'added to the project'),
                    auth()->user(),
                    $objective
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($objective, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Objectives  $objectives
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $objective = Objectives::find($id);
            if(!$objective) {
                return $this->notFound();
            }

            return $this->successResponse($objective);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $objective = Objectives::find($id);
            if(!$objective) {
                return $this->notFound();
            }
            if($objective->company->id != User::company_id()) {
                return $this->forbidden();
            }

            return $this->successResponse($objective);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Objectives  $objectives
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required',
            'objective' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $objective = Objectives::find($id);
            if(!$objective) {
                return $this->notFound();
            }
        DB::beginTransaction();
        try {
            $objective->company_id = User::company_id();
            $objective->project_id = $request->project_id;
            $objective->objective = $request->objective;
            $objective->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $objective->project->id,
                    $this->logDescription('Objective', $objective->objective, 'has been updated'),
                    auth()->user(),
                    $objective
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($objective);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    public function company_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required',
            'objective' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $objective = Objectives::find($id);
        if(!$objective) {
            return $this->notFound();
        }
        if($objective->company->id != User::company_id()) {
            return $this->forbidden();
        }
        DB::beginTransaction();
        try {
            $objective->company_id = User::company_id();
            $objective->project_id = $request->project_id;
            $objective->objective = $request->objective;
            $objective->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $objective->project->id,
                    $this->logDescription('Objective', $objective->objective, 'has been updated'),
                    auth()->user(),
                    $objective
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($objective);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Objectives  $objectives
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $objective = Objectives::find($id);
            if(!$objective) {
                return $this->notFound();
            }
            DB::beginTransaction();
            $objective->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $objective->project->id,
                    $this->logDescription('Objective', $objective->objective, 'was deleted'),
                    auth()->user(),
                    $objective
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Objective', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_destroy($id)
    {
        try {
            $objective = Objectives::find($id);
            if(!$objective) {
                return $this->notFound();
            }
            if($objective->company->id != User::company_id()) {
                return $this->forbidden();
            }
            DB::beginTransaction();
            $objective->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $objective->project->id,
                    $this->logDescription('Objective', $objective->objective, 'was deleted'),
                    auth()->user(),
                    $objective
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Objective', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
