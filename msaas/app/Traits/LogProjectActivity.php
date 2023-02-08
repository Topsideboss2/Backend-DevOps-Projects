<?php

namespace App\Traits;
// use Spatie\Activitylog\Contracts\Activity;
use \Spatie\Activitylog\Models\Activity;

trait LogProjectActivity {
    public function logActivity ($companyId, $projectId, $logDescription, $userModel, $contentModel) {
        activity()
        ->causedBy($userModel)
        ->performedOn($contentModel)
        ->withProperties([
            'company_id' => $companyId,
            'project_id' => $projectId
            ])
        ->log($logDescription);
    }

    public function retrieveProjectActivity ($companyId, $projectId) {
        $activity = Activity::where('properties->company_id', $companyId)
        ->where('properties->project_id', $projectId)
        ->get();

        return $activity;
    }

    public function logDescription ($model, $name, $action) {
        $log = ($model.' '. $name. ' '. $action);
        return $log;
    }
}
