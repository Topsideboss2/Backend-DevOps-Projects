<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use App\Models\Objectives;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Models\Activity;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{
    use ApiResponser;
    protected $project_completion;
    public function dashboard() {
        try {
            $user = auth()->user()->id;
            $company = User::find($user)->company;
            $years =['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
            $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sartuday'];
            $monthData = [];
            $yearData = [];
            $dayData = [];
            foreach ($months as $key => $value) {
                $monthData[] = Project::where(DB::raw("DATE_FORMAT(created_at, '%M')"), $value)
                ->where('company_id', $company->id)->count();
            }
            foreach ($years as $key => $value) {
                $yearData[] = Project::where(DB::raw("DATE_FORMAT(created_at, '%Y')"), $value)
                ->where('company_id', $company->id)->count();
            }
            foreach ($days as $key => $value) {
                $dayData[] = Project::where(DB::raw("DATE_FORMAT(created_at, '%W')"), $value)
                ->where('company_id', $company->id)->count();
            }

        $total_projects = Project::where('company_id', $company->id)->count();

        $total_tasks = Task::where('company_id', $company->id)->count();
        $completed_tasks = Task::where('status', 'complete')
        ->where('company_id', $company->id)->count();
        $incomplete_tasks = Task::where('status', 'incomplete')
        ->where('company_id', $company->id)->count();

        return response()->json([
            'total_projects' => $total_projects,

            'total_tasks' => $total_tasks,
            'completed_tasks' => $completed_tasks,
            'incomplete_tasks' => $incomplete_tasks,
            'year' => $yearData,
            'month' => $monthData,
            'day' => $dayData], Response::HTTP_OK);

        } catch (\Exception $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function project($id) {
        try {
            $user = auth()->user()->id;
            $company = User::find($user)->company;

            $total_tasks = Task::where('company_id', $company->id)
            ->where('project_id', $id)
            ->where('company_id', $company->id)
            ->count();
            $completed_tasks = Task::where('status', 'complete')
            ->where('project_id', $id)
            ->where('company_id', $company->id)->count();
            $incomplete_tasks = Task::where('status', 'incomplete')
            ->where('project_id', $id)
            ->where('company_id', $company->id)->count();

            $total_milestones = Milestone::where('company_id', $company->id)
            ->where('project_id', $id)
            ->where('company_id', $company->id)
            ->count();
            $completed_milestones = Milestone::where('status', 'complete')
            ->where('project_id', $id)
            ->where('company_id', $company->id)->count();
            $incomplete_milestones = Milestone::where('status', 'incomplete')
            ->where('project_id', $id)
            ->where('company_id', $company->id)->count();

            $total_objectives = Objectives::where('company_id', $company->id)
            ->where('project_id', $id)
            ->where('company_id', $company->id)
            ->count();
            $completed_objectives = Objectives::where('project_id', $id)
            ->where('company_id', $company->id)->count();
            $incomplete_objectives = Objectives::where('project_id', $id)
            ->where('company_id', $company->id)->count();

            $estimated_budget = Milestone::where('project_id', $id)
            ->where('company_id', $company->id)->sum('estimated_cost');

            $project = Project::where('id', $id)->first();
            if(is_null($project->completion_percent)) {
                $project_completion = 0;
            }

            else {
                $project_completion = $project->completion_percent;
            }

        return response()->json([
            'total_tasks' => $total_tasks,
            'completed_tasks' => $completed_tasks,
            'incomplete_tasks' => $incomplete_tasks,
            'total_milestones' => $total_milestones,
            'completed_milestones' => $completed_milestones,
            'incomplete_milestones' => $incomplete_milestones,
            'total_objectives' => $total_objectives,
            'completed_objectives' => $completed_objectives,
            'incomplete_objectives' => $incomplete_objectives,
            'project_completion' => $project_completion,
            'estimated_budget' => $estimated_budget,
            'actual_cost' => is_null($project->actual_cost) ? 0 : $project->actual_cost,
    ], Response::HTTP_OK);

        } catch (\Exception $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function tasksReport () {
        try {
            $task = Task::where('company_id', User::company_id())
            ->get();

            $complete = Task::where('company_id', User::company_id())->where('status', 'complete')->count();
            $incomplete = Task::where('company_id', User::company_id())->where('status', 'incomplete')->count();

            return response()->json(['complete' => $complete, 'incomplete' => $incomplete, 'table' => $task]);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function userReport () {
            try {
                $user = auth()->user();
                $total_projects = Project::where('user_id', $user->id)->count();
                $total_tasks = Task::where('user_id', $user->id)->count();
                $completed_tasks = Task::where('status', 'complete')->where('user_id', $user->id)->count();
                $incomplete_tasks = Task::where('status', 'incomplete')->where('user_id', $user->id)->count();
                $total_activities = Activity::where('user_id', $user->id)->count();
                $completed_activities = Activity::where('user_id', $user->id)->where('status', 'complete')->count();
                $incomplete_activities = Activity::where('user_id', $user->id)->where('status', 'incomplete')->count();

                return response()->json([
                    'total_projects' => $total_projects,
                    'total_tasks' => $total_tasks,
                    'completed_tasks' => $completed_tasks,
                    'incomplete_tasks' => $incomplete_tasks,
                    'total_activities' => $total_activities,
                    'completed_activities' => $completed_activities,
                    'incomplete_activities' => $incomplete_activities,
                ]);
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            }
    }
}
