<?php

namespace App\Http\Controllers;

use App\Models\ReportType;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReportTypeController extends Controller
{
    use ApiResponser;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $reportTypes = ReportType::all();
            return $this->successResponse($reportTypes);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->only('name'), [
            'name' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        try {
            $reportType = new ReportType();
            $reportType->name = $request->name;
            $reportType->save();

            return $this->successResponse($reportType, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ReportType  $reportType
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $reportType = ReportType::find($id);
            if(!$reportType) {
                return $this->notFound();
            }

            return $this->successResponse($reportType);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ReportType  $reportType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->only('name'), [
            'name' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $reportType = ReportType::find($id);
            if(!$reportType) {
                return $this->notFound();
            }

        try {
            $reportType->name = $request->name;
            $reportType->save();

            return $this->successResponse($reportType, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReportType  $reportType
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $reportType = ReportType::find($id);
            if(!$reportType) {
                return $this->notFound();
            }
            $reportType->delete();

            return $this->deleteMessage('Report Type', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
