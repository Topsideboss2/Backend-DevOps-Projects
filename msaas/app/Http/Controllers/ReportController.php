<?php

namespace App\Http\Controllers;

use App\Models\FieldReport;
use App\Models\Report;
use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
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
            $reports = Report::all();
            return $this->successResponse($reports);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'report_type' => 'required|exists:report_types,id',
            'fields' => 'required',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        DB::beginTransaction();
        try {
            $report = new Report();
            $report->company_id = User::company_id();
            $report->report_type_id = $request->report_type;
            $report->name = $request->name;
            $report->save();

            try {
                foreach ($request->fields as $key => $value) {
                    $fieldreport = new FieldReport();
                    $fieldreport->company_id = User::company_id();
                    $fieldreport->report_id = $report->id;
                    $fieldreport->field_id = $value['field_id'];
                    $fieldreport->operation = $value['operation'];
                    $fieldreport->save();
                }

            } catch (\Throwable $th) {
                return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                DB::rollback();
            }
            DB::commit();
            return $this->successResponse($report, Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
            DB::rollBack();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $report = Report::find($id);
            if(!$report) {
                return $this->notFound();
            }

            return $this->successResponse($report);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_show($id)
    {
        try {
            $report = Report::find($id);
            if(!$report) {
                return $this->notFound();
            }
            if($report->company->id != User::company_id()) {
                return $this->forbidden();
            }

            $report = Report::where('company_id', auth()->user()->company->id)
            ->where('reports.id', $id)
            ->join('report_types', 'report_types.id', '=', 'reports.report_type_id')
            ->select('reports.*', 'report_types.name as report_type_name', 'report_types.id as report_type_id')
            ->first();

            return $this->successResponse($report);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function update (Request $request, $id) {
        //
    }

    public function company_update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'report_type_id' => 'required|exists:report_types,id',
        ]);

        if($validator->fails()) {
            return $this->errorResponse($validator->errors()->all(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $report = Report::find($id);
        if(!$report) {
            return $this->notFound();
        }
        if($report->company->id != User::company_id()) {
            return $this->forbidden();
        }

        try {
            $report->company_id = User::company_id();
            $report->report_type_id = $request->report_type_id;
            $report->name = $request->name;
            $report->save();

            return $this->successResponse($report);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $report = Report::find($id);
            if(!$report) {
                return $this->notFound();
            }
            $report->delete();
            return $this->deleteMessage('Report', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function company_destroy($id)
    {
        try {
            $report = Report::find($id);
            if(!$report) {
                return $this->notFound();
            }
            if($report->company->id != User::company_id()) {
                return $this->forbidden();
            }
            $report->delete();
            return $this->deleteMessage('Report', $id);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
