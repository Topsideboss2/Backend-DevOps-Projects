<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Field;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class TaskDetailsController extends Controller
{
    use ApiResponser;
    public function activities ($id) {
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
