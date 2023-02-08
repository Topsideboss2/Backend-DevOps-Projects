<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use App\Models\User;
use App\Models\Project;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MilestoneController extends Controller
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
            $milestones = Milestone::all();
            return $this->successResponse($milestones);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);;
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
            'title' => 'required',
            'summary' => 'nullable',
            'estimated_cost' => 'nullable|numeric',
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after:start_date',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        DB::beginTransaction();
        try {

            //Checking if the passed foreign keys are valid
            try {
                if(User::company_id() != User::checkCompany($request->user_id, User::company_id())) {
                    return $this->forbidden();
                    DB::rollBack();
                }

                $project = Project::find($request->project_id);
                if(!$project) {
                    return $this->notFound();
                    DB::rollBack();
                }
                if($project->company->id != User::company_id()) {
                    return $this->forbidden();
                    DB::rollBack();
                }
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }
            

            $milestone = new Milestone();
            $milestone->company_id = User::company_id();
            $milestone->project_id = $request->project_id;
            $milestone->title = $request->title;
            $milestone->summary = $request->summary;
            $milestone->estimated_cost = $request->estimated_cost;
            $milestone->user_id = $request->user_id;
            $milestone->status = 'incomplete';
            $milestone->start_date = $request->start_date;
            $milestone->due_date = $request->due_date;
            $milestone->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $milestone->project->id,
                    $this->logDescription('Milestone', $milestone->title, 'added to the project'),
                    auth()->user(),
                    $milestone
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($milestone, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Milestone  $milestone
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $milestone = Milestone::find($id);
            if(!$milestone) {
                return $this->notFound();
            }

            return $this->successResponse($milestone);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $milestone = Milestone::find($id);
            if(!$milestone) {
                return $this->notFound();
            }
            if($milestone->company->id != User::company_id()) {
                return $this->forbidden();
            }
            return $this->successResponse($milestone);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Milestone  $milestone
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'summary' => 'nullable',
            'estimated_cost' => 'nullable|numeric',
            'project_id' => 'required',
            'user_id' => 'required|exists:users,id'
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        DB::beginTransaction();
        try {
            $milestone = Milestone::find($id);
            if(!$milestone) {
                return $this->notFound();
            }

            if(User::company_id() != User::checkCompany($request->user_id)) {
                return $this->forbidden();
                DB::rollBack();
            }

            $milestone->title = $request->title;
            $milestone->summary = $request->summary;
            $milestone->estimated_cost = $request->estimated_cost;
            $milestone->user_id = $request->user_id;
            $milestone->status = 'incomplete';
            $milestone->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $milestone->project->id,
                    $this->logDescription('Milestone', $milestone->title, 'has been updated'),
                    auth()->user(),
                    $milestone
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($milestone);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    public function company_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'summary' => 'nullable',
            'estimated_cost' => 'nullable|numeric',
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after:start_date',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        DB::beginTransaction();
        try {
            $milestone = Milestone::find($id);
            if(!$milestone) {
                return $this->notFound();
            }
            if($milestone->company->id != User::company_id()) {
                return $this->forbidden();
            }

            if(User::company_id() != User::checkCompany($request->user_id, User::company_id())) {
                return $this->forbidden();
                DB::rollBack();
            }

            try {
                $project = Project::find($request->project_id);
                if(!$project) {
                    return $this->notFound();
                    DB::rollBack();
                }
                if($project->company->id != User::company_id()) {
                    return $this->forbidden();
                    DB::rollBack();
                }
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }
            
            $milestone->title = $request->title;
            $milestone->summary = $request->summary;
            $milestone->estimated_cost = $request->estimated_cost;
            $milestone->user_id = $request->user_id;
            $milestone->status = 'incomplete';
            $milestone->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $milestone->project->id,
                    $this->logDescription('Milestone', $milestone->title, 'has been updated'),
                    auth()->user(),
                    $milestone
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($milestone);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Milestone  $milestone
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $milestone = Milestone::find($id);
            if(!$milestone) {
                return $this->notFound();
            }
            DB::beginTransaction();
            $milestone->delete();
            try {
                $this->logActivity(
                    User::company_id(),
                    $milestone->project->id,
                    $this->logDescription('Milestone', $milestone->title, 'was deleted'),
                    auth()->user(),
                    $milestone
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Milestone', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    //company  delete milestone
    public function company_destroy($id)
    {
        try {
            $milestone = Milestone::find($id);
            if(!$milestone) {
                return $this->notFound();
            }
            if($milestone->company->id != User::company_id()) {
                return $this->forbidden();
            }

            DB::beginTransaction();
            $milestone->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $milestone->project->id,
                    $this->logDescription('Milestone', $milestone->title, 'was deleted'),
                    auth()->user(),
                    $milestone
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Milestone', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
