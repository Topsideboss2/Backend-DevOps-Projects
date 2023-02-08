<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityField;
use App\Models\User;
use App\Models\Project;
use App\Models\Milestone;
use App\Models\Task;
use App\Models\Field;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use App\Traits\ProjectPercentage;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ActivityController extends Controller
{
    use ApiResponser, ProjectPercentage, LogProjectActivity;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $activities = Activity::all();
            foreach ($activities as $key => $value) {
                $fields = [];
                foreach ($activity->activity_fields as $key => $value) {
                    $field = Field::find($value->field_id);
                    array_push($fields, $field);
                }
                $value->fields = $fields;
            }
            return $this->successResponse($activities);
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
            'user_id' => 'nullable|exists:users,id',
            'task_id' => 'required|exists:tasks,id',
            'title' => 'required',
            'description' => 'nullable',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after:start_date',
            'estimated_cost' => 'nullable',
            'actual_cost' => 'nullable',
            'fields' => 'nullable',
            'longitude' => 'required',
            'latitude' => 'required'
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
            $task = Task::find($request->task_id);
            if(!$task) {
                return $this->notFound();
                DB::rollBack();
            }
            if($task->company->id != User::company_id()) {
                return $this->forbidden();
                DB::rollBack();
            }
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
        try {
            $activity = new Activity();
            $activity->company_id = User::company_id();
            $activity->project_id = $request->project_id;
            $activity->milestone_id = $request->milestone_id;
            $activity->user_id = $request->user_id;
            $activity->task_id = $request->task_id;
            $activity->title = $request->title;
            $activity->description = $request->description;
            $activity->longitude = $request->longitude;
            $activity->latitude = $request->latitude;
            $activity->start_date = $request->start_date;
            $activity->due_date = $request->due_date;
            $activity->estimated_budget = $request->estimated_budget;
            $activity->actual_cost = $request->actual_cost;
            $activity->save();

            try {
                $this->calculateTaskProgress($activity->task->id);
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            if($request->fields) {
                foreach ($request->fields as $key => $value) {
                        $activityfield = new ActivityField();
                        $activityfield->company_id = User::company_id();
                        $activityfield->activity_id = $activity->id;
                        $activityfield->field_id = $value;
                        $activityfield->save();
                }
            }

            try {
                $this->logActivity(
                    User::company_id(),
                    $activity->project->id,
                    $this->logDescription('Activity', $activity->title, 'added to the project'),
                    auth()->user(),
                    $activity
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();

            return $this->successResponse($activity);

        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $activity = Activity::find($id);
            if(!$activity) {
                return $this->notFound();
            }

            return $this->successResponse($activity);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $activity = Activity::find($id);
            if(!$activity) {
                return $this->notFound();
            }
            if($activity->company->id != User::company_id()) {
                return $this->forbidden();
            }
            $fields = [];
            foreach ($activity->activity_fields as $key => $value) {
                $field = Field::find($value->field_id);
                array_push($fields, $field);
            }
            $activity->fields = $fields;
            return $this->successResponse($activity);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $activity = Activity::find($id);

            if(!$activity) {
                return $this->notFound();
            }

            $validator = Validator::make($request->all(), [
                'project_id' => 'required',
                'milestone_id' => 'required',
                'user_id' => 'nullable',
                'task_id' => 'required',
                'title' => 'required',
                'description' => 'nullable',
                'due_date' => 'required|date|after:today',
                'estimated_cost' => 'nullable',
                'actual_cost' => 'nullable',
                'activity_type' => 'required',
                'longitude' => 'required',
                'latitude' => 'required'
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

                $activity->project_id = $request->project_id;
                $activity->milestone_id = $request->milestone_id;
                $activity->user_id = $request->user_id;
                $activity->task_id = $request->task_id;
                $activity->title = $request->title;
                $activity->description = $request->description;
                $activity->longitude = $request->longitude;
                $activity->latitude = $request->latitude;
                $activity->due_date = $request->due_date;
                $activity->estimated_budget = $request->estimated_budget;
                $activity->actual_cost = $request->actual_cost;
                $activity->activity_type = $request->activity_type;
                $activity->save();

                try {
                    $this->logActivity(
                        User::company_id(),
                        $activity->project->id,
                        $this->logDescription('Task', $activity->title, 'has been updated'),
                        auth()->user(),
                        $activity
                    );
                } catch (\Throwable $th) {
                    return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                    DB::rollBack();
                }

                DB::commit();

                return $this->successResponse($activity);

            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            return $this->successResponse($activity);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'project_id' => 'required|exists:projects,id',
                'milestone_id' => 'required|exists:milestones,id',
                'user_id' => 'nullable|exists:users,id',
                'task_id' => 'required|exists:tasks,id',
                'title' => 'required',
                'description' => 'nullable',
                'start_date' => 'required|date',
                'due_date' => 'required|date|after:start_date',
                'estimated_cost' => 'nullable',
                'actual_cost' => 'nullable',
                'activity_type' => 'required',
                'fields' => 'nullable'
            ]);

            if($validator->fails()) {
                return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $activity = Activity::find($id);

            if(!$activity) {
                return $this->notFound();
            }

            if($activity->company->id != User::company_id()) {
                return $this->forbidden();
            }

            DB::beginTransaction();
            if(User::company_id() != User::checkCompany($request->user_id, User::company_id())) {
                return $this->forbidden();
                DB::rollBack();
            }
            try {

                $activity->project_id = $request->project_id;
                $activity->milestone_id = $request->milestone_id;
                $activity->user_id = $request->user_id;
                $activity->task_id = $request->task_id;
                $activity->title = $request->title;
                $activity->description = $request->description;
                $activity->start_date = $request->start_date;
                $activity->due_date = $request->due_date;
                $activity->estimated_budget = $request->estimated_budget;
                $activity->actual_cost = $request->actual_cost;
                $activity->save();

                if($request->fields) {
                    foreach ($request->fields as $key => $value) {
                        foreach($value as $key => $field) {
                            $activityfield = array();
                            $activityfield['company_id'] = User::company_id();
                            $activityfield['activity_id'] = $activity->id;
                            $activityfield['field_id'] = $key;
                            // $activityfield['value'] = $field;
                            ActivityField::where('activity_id', $activity->id)->updateOrCreate(['field_id' => $key]);
                        }
                    }
                }

                try {
                    $this->logActivity(
                        User::company_id(),
                        $activity->project->id,
                        $this->logDescription('Task', $activity->title, 'has been updated'),
                        auth()->user(),
                        $activity
                    );
                } catch (\Throwable $th) {
                    return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                    DB::rollBack();
                }

                DB::commit();

                return $this->successResponse($activity);

            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            return $this->successResponse($activity);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $activity = Activity::find($id);
            if(!$activity) {
                return $this->notFound();
            }
            DB::beginTransaction();
            $activity->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $activity->project->id,
                    $this->logDescription('Activity', $activity->title, 'was deleted'),
                    auth()->user(),
                    $activity
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Activity', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    //company  delete activity
    public function company_destroy($id)
    {
        try {
            $activity = Activity::find($id);
            if(!$activity) {
                return $this->notFound();
            }
            if($activity->company->id != User::company_id()) {
                return $this->forbidden();
            }
            DB::beginTransaction();

            $activity->delete();

            try {
                $this->logActivity(
                    User::company_id(),
                    $activity->project->id,
                    $this->logDescription('Activity', $activity->title, 'was deleted'),
                    auth()->user(),
                    $activity
                );
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }

            DB::commit();
            return $this->deleteMessage('Activity', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    //users activities
    public function userActivities () {
        $activities = Activity::join('users', 'users.id', '=', 'activities.user_id')
        ->join('projects', 'projects.id', '=', 'activities.project_id')
        ->select('activities.*','users.name','projects.title as project_name', 'projects.id as project_id')
        ->where('activities.user_id', auth()->user()->id)
        ->get();

        $activities = $activities->map(function($activity) {
            $activity->fields = ActivityField::where('activity_id', $activity->id)->get();
            return $activity;
        });
        return $this->successResponse($activities);
    }
}
