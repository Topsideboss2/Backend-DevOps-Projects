<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\Field;
use App\Traits\ApiResponser;

class ActivityDetailsController extends Controller
{
    use ApiResponser;
    public function fields ($id) {
        $activity = Activity::find($id);
        if(!$activity) {
            return $this->notFound();
        }
        $fields = [];
        foreach ($activity->activity_fields as $key => $value) {
            $field = Field::find($value->field_id);
            array_push($fields, $field);
        }
        $activity['fields'] = $fields;
        return $this->successResponse($fields);
    }
}
