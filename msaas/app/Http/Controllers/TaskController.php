<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use App\Models\Milestone;
use App\Models\User;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
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
            $tasks = Task::all();
            return $this->successResponse($tasks);
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
            'project_id' => 'required|exists:projects,id',
            'milestone_id' => 'required|exists:milestones,id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after:start_date',
            'priority' => 'nullable',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        DB::beginTransaction();
        
        //Checking if the passed foreign parameters are valid
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

            $milestone = Milestone::find($request->milestone_id);
            if(!$milestone) {
                return $this->notFound();
                DB::rollBack();
            }
            if($milestone->company->id != User::company_id()) {
                return $this->forbidden();
                DB::rollBack();
            }
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }

        try {
            $task = new Task();
            $task->company_id = User::company_id();
            $task->project_id = $request->project_id;
            $task->user_id = $request->user_id;
            $task->milestone_id = $request->milestone_id;
            $task->title = $request->title;
            $task->description = $request->description;
            $task->start_date = $request->start_date;
            $task->due_date = $request->due_date;
            $task->priority = $request->priority;
            $task->status = 'incomplete';
            $task->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $task->project->id,
                    $this->logDescription('Task', $task->title, 'added to the project'),
                    auth()->user(),
                    $task
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($task);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $task = Task::find($id);
            if(!$task) {
                return $this->notFound();
            }

            return $this->successResponse($task);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $task = Task::find($id);
            if(!$task) {
                return $this->notFound();
            }
            if($task->company->id != User::company_id()) {
                return $this->forbidden();
            }

            return $this->successResponse($task);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required',
            'milestone_id' => 'required',
            'user_id' => 'required',
            'title' => 'required',
            'description' => 'nullable',
            'due_date' => 'required|date',
            'priority' => 'nullable',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        DB::beginTransaction();
        if(User::company_id() != User::checkCompany($request->user_id)) {
            return $this->forbidden();
            DB::rollBack();
        }
        try {
            $task = Task::find($id);
            if(!$task) {
                return $this->notFound();
            }
            $task->company_id = User::company_id();
            $task->project_id = $request->project_id;
            $task->milestone_id = $request->milestone_id;
            $task->user_id = $request->user_id;
            $task->title = $request->title;
            $task->description = $request->description;
            $task->due_date = $request->due_date;
            $task->priority = $request->priority;
            $task->status = $request->status;
            $task->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $task->project->id,
                    $this->logDescription('Task', $task->title, 'has been updated'),
                    auth()->user(),
                    $task
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($task);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    public function company_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'milestone_id' => 'required|exists:milestones,id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after:start_date',
            'priority' => 'nullable',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        DB::beginTransaction();
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

            $milestone = Milestone::find($request->milestone_id);
            if(!$milestone) {
                return $this->notFound();
                DB::rollBack();
            }
            if($milestone->company->id != User::company_id()) {
                return $this->forbidden();
                DB::rollBack();
            }
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }

        try {
            $task = Task::find($id);
            if(!$task) {
                return $this->notFound();
            }
            if($task->company->id != User::company_id()) {
                return $this->forbidden();
            }
            $task->company_id = User::company_id();
            $task->project_id = $request->project_id;
            $task->milestone_id = $request->milestone_id;
            $task->user_id = $request->user_id;
            $task->title = $request->title;
            $task->description = $request->description;
            $task->start_date = $request->start_date;
            $task->due_date = $request->due_date;
            $task->priority = $request->priority;
            $task->status = 'incomplete';
            $task->save();

            try {
                $this->logActivity(
                    User::company_id(),
                    $task->project->id,
                    $this->logDescription('Task', $task->title, 'has been updated'),
                    auth()->user(),
                    $task
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($task);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $task = Task::find($id);
            if(!$task) {
                return $this->notFound();
            }

            DB::beginTransaction();

            $task->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $task->project->id,
                    $this->logDescription('Task', $task->title, 'was deleted'),
                    auth()->user(),
                    $task
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Task', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_destroy($id)
    {
        try {
            $task = Task::find($id);
            if(!$task) {
                return $this->notFound();
            }
            if($task->company->id != User::company_id()) {
                return $this->forbidden();
            }

            DB::beginTransaction();

            $task->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $task->project->id,
                    $this->logDescription('Task', $task->title, 'was deleted'),
                    auth()->user(),
                    $task
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Task', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
