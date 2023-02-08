<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectMember;
use App\Models\Activity;
use App\Models\ActivityField;
use App\Traits\ApiResponser;
use App\Models\Field;
use App\Models\Project;
use App\Models\Task;

class MobileController extends Controller
{
    use ApiResponser;
    public function userProjects () {
        $project = ProjectMember::join('users', 'users.id', '=', 'project_members.user_id')
        ->join('projects', 'projects.id', '=', 'project_members.project_id')
        ->select('project_members.*','users.name', 'projects.*')
        ->where('project_members.user_id', auth()->user()->id)
        ->get();

        return $this->successResponse($project);
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

    //user activity fields
    public function fields ($id) {
        $activity = Activity::find($id);
        if(!$activity) {
            return $this->notFound();
        }
        $fields = [];
        foreach ($activity->activity_fields as $key => $value) {
            $activityFieldId = ActivityField::where('activity_id', $activity->id)->where('field_id', $value->field_id)->first();
            $field = Field::find($value->field_id);
            $field->activity_field_id = $activityFieldId->id;
            array_push($fields, $field);
        }
        $activity['fields'] = $fields;
        return $this->successResponse($fields);
    }

    public function projectTasks ($id) {
        $project = Project::find($id);
        if(!$project) {
            return $this->notFound();
        }
        return $this->successResponse($project->tasks);
    }

    public function taskActivities ($id) {
        $task = Task::find($id);
        if(!$task) {
            return $this->notFound();
        }
        foreach ($task->activities as $key => $activity) {
            $fields = [];
            foreach ($activity->activity_fields as $key => $value) {
                $field = Field::find($value->field_id);
                array_push($fields, $field);
            }
            $activity->fields = $fields;
        }
        return $this->successResponse($task->activities);
    }
}
