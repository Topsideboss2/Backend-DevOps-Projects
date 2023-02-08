<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ActivityLogController extends Controller
{
    use ApiResponser, LogProjectActivity;

    public function projectLogs ($projectId) {
        $project = Project::find($projectId);
        if(!$project) {
            return $this->notFound();
        }
        try {
            $companyId = User::company_id();
            $logs = $this->retrieveProjectActivity($companyId, $projectId);
            return $this->successResponse($logs);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
