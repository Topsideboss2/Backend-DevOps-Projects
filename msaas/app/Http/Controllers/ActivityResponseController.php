<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityResponse;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ActivityResponseController extends Controller
{
    use ApiResponser;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'activity_responses' => 'required',
        ]);

        if($validator->fails()){
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        DB::beginTransaction();
        try {
            foreach ($request->activity_responses as $key => $value) {
                $valid = Validator::make($value, [
                    'activity_field_id' => 'required|exists:activity_fields,id',
                    'value' => 'required'
                ]);
                if($valid->fails()){
                    return $this->errorResponse($valid->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
                }
                $activity_response = array();
                $activity_response['company_id'] = User::company_id();
                $activity_response['activity_field_id'] = $value['activity_field_id'];
                $activity_response['value'] = $value['value'];
                ActivityResponse::updateOrCreate(['activity_field_id' => $value['activity_field_id']], $activity_response);
            }
            DB::commit();
            return $this->successResponse($request->activity_responses, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_UNPROCESSABLE_ENTITY);
            DB::rollback();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ActivityResponse  $activityResponse
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    public function company_show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ActivityResponse  $activityResponse
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ActivityResponse  $activityResponse
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
