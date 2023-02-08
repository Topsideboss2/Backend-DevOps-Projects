<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class ProjectDetailsController extends Controller
{
    use ApiResponser;

    public function objectives ($id) {
        $project = Project::find($id);
        if(!$project) {
            return $this->notFound();
        }
        return $this->successResponse($project->objectives);
    }

    public function milestones ($id) {
        $project = Project::find($id);
        if(!$project) {
            return $this->notFound();
        }
        return $this->successResponse($project->milestones);
    }

    public function tasks ($id) {
        $project = Project::find($id);
        if(!$project) {
            return $this->notFound();
        }
        return $this->successResponse($project->tasks);
    }

    public function activities ($id) {
        $project = Project::find($id);
        if(!$project) {
            return $this->notFound();
        }
        return $this->successResponse($project->activities);
    }

    public function documents ($id) {
        $project = Project::find($id);
        if(!$project) {
            return $this->notFound();
        }
        return $this->successResponse($project->documents);
    }
}
