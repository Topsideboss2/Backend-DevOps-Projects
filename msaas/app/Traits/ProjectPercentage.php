<?php

namespace App\Traits;

use App\Models\Activity;
use App\Models\Milestone;
use App\Models\Project;
use App\Models\Task;

trait ProjectPercentage {
use ApiResponser;

    public function calculateProjectProgress ($projectId) {
        if(is_null($projectId)) {
            return $this->notFound();
        }
        $project = Project::findOrFail($projectId);
        $totalMilestones = Milestone::where('project_id', $projectId)->count();
        $completedMilestones = Milestone::where('project_id', $projectId)
                ->where('status', 'complete')
                ->count();
            $percentComplete = ($completedMilestones / $totalMilestones) * 100;
            if($percentComplete == 100) {
                $project->status = 'complete';
            }
            $project->completion_percent = $percentComplete;
            $project->save();
            return $percentComplete;
    }

    public function calculateMilestoneProgress ($milestone_id) {
        if(is_null($milestone_id)) {
            return $this->notFound();
        }
        $milestone = Milestone::findOrFail($milestone_id);
        $totalTasks = Task::where('milestone_id', $milestone_id)->count();
        $completedTasks = Task::where('milestone_id', $milestone_id)
                ->where('status', 'complete')
                ->count();
            $milestonePercentComplete = ($completedTasks / $totalTasks) * 100;
            if($milestonePercentComplete == 100) {
                $milestone->status = 'complete';
            }
            $milestone->completion_percent = $milestonePercentComplete;
            $milestone->save();
            $this->calculateProjectProgress($milestone->project->id);
            return $milestonePercentComplete;
    }

    public function calculateTaskProgress ($task_id) {
        if(is_null($task_id)) {
            return $this->notFound();
        }
        $task = Task::findOrFail($task_id);
        $totalActivities = Activity::where('task_id', $task_id)->count();
        $completedActivities = Activity::where('task_id', $task_id)
                ->where('status', 'complete')
                ->count();
            $taskPercentComplete = ($completedActivities / $totalActivities) * 100;

            $task->completion_percent = $taskPercentComplete;
            $task->save();

            $this->calculateMilestoneProgress($task->milestone->id);
            return $taskPercentComplete;
    }

}
