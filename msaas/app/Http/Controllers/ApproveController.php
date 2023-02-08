<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\User;
use App\Traits\ApiResponser;
use App\Traits\LogProjectActivity;
use App\Traits\ProjectCost;
use App\Traits\ProjectPercentage;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ApproveController extends Controller
{
    use ApiResponser, ProjectPercentage, LogProjectActivity, ProjectCost;
    public function approve_activity (Request $request, $activity_id) {
        $validator = Validator::make($request->all(), [
            'actual_cost' => 'nullable',
            'approved' => 'required',
            'note' => 'nullable',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        DB::beginTransaction();

        try {
            $activity = Activity::find($activity_id);
            if(!$activity) {
                return $this->notFound();
                DB::rollBack();
            }

            if($activity->approved == 'yes') {
                return $this->errorResponse('Activity already approved', Response::HTTP_BAD_REQUEST);
            }

            if($activity->activity_response == null) {
                return $this->errorResponse('An activity has to be responded to be approved', Response::HTTP_BAD_REQUEST);
            }

            $activity->actual_cost = $request->actual_cost;
            $activity->approved = $request->approved;
            if($request->approved == 'yes') {
                $activity->status = 'complete';
            }
            $activity->note = $request->note;
            $activity->save();

            try {
                $this->calculateTaskProgress($activity->task->id);
                $this->calculateTaskCost($activity->task->id);
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }


            try {
                $this->logActivity(
                    User::company_id(),
                    $activity->project->id,
                    $this->logDescription('Activity', $activity->title, 'status has been updated'),
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
    public function company_approve_activity (Request $request, $activity_id) {
        $validator = Validator::make($request->all(), [
            'actual_cost' => 'nullable',
            'approved' => 'required',
            'note' => 'nullable',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        DB::beginTransaction();

        try {
            $activity = Activity::find($activity_id);
            if(!$activity) {
                return $this->notFound();
                DB::rollBack();
            }

            if($activity->company->id != User::company_id()) {
                return $this->forbidden();
            }

            if($activity->approved == 'yes') {
                return $this->errorResponse('Activity already approved', Response::HTTP_BAD_REQUEST);
            }

            if($activity->activity_response == null) {
                return $this->errorResponse('An activity has to be responded to be approved', Response::HTTP_BAD_REQUEST);
            }

            $activity->actual_cost = $request->actual_cost;
            $activity->approved = $request->approved;
            if($request->approved == 'yes') {
                $activity->status = 'complete';
            }
            $activity->note = $request->note;
            $activity->save();

            try {
                $this->calculateTaskProgress($activity->task->id);
                $this->calculateTaskCost($activity->task->id);
            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollBack();
            }


            try {
                $this->logActivity(
                    User::company_id(),
                    $activity->project->id,
                    $this->logDescription('Activity', $activity->title, 'status has been updated'),
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
}
