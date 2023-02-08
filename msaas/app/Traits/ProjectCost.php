<?php

namespace App\Traits;

use App\Models\Activity;
use App\Models\Milestone;
use App\Models\Project;
use App\Models\Task;

trait ProjectCost {
use ApiResponser;

    public function calculateProjectCost ($projectId) {
        if(is_null($projectId)) {
            return $this->notFound();
        }
        $project = Project::findOrFail($projectId);
        $milestonesCost = Milestone::where('project_id', $projectId)->sum('actual_cost');
            $project->actual_cost = $milestonesCost;
            $project->save();
            return $milestonesCost;
    }

    public function calculateMilestoneCost ($milestone_id) {
        if(is_null($milestone_id)) {
            return $this->notFound();
        }
        $milestone = Milestone::findOrFail($milestone_id);
        $tasksCost = Task::where('milestone_id', $milestone_id)->sum('actual_cost');

            $milestone->actual_cost = $tasksCost;
            $milestone->save();
            $this->calculateProjectCost($milestone->project->id);
            return $tasksCost;
    }

    public function calculateTaskCost ($task_id) {
        if(is_null($task_id)) {
            return $this->notFound();
        }
        $task = Task::findOrFail($task_id);
        $activitiesCost = Activity::where('task_id', $task_id)->sum('actual_cost');

            $task->actual_cost = $activitiesCost;
            $task->save();

            $this->calculateMilestoneCost($task->milestone->id);
            return $activitiesCost;
    }

}
