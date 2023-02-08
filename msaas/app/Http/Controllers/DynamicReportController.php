<?php

namespace App\Http\Controllers;

use App\Models\FieldReport;
use App\Models\Report;
use App\Models\User;
use App\Traits\ApiResponser;
use App\Traits\ReportGenerator;
use Illuminate\Http\Request;

class DynamicReportController extends Controller
{
    use ApiResponser, ReportGenerator;
    private function graph ($fields) {
        return $this->Charts($fields);
      }

      public function getReport($id) {
        
          $report = Report::find($id);
          if(!$report) {
              return $this->notFound();
          }
          if(User::company_id() != $report->company->id) {
              return $this->forbidden();
          }
          $fieldreport = FieldReport::where('report_id', $report->id)->get();
          $fields = [];
          foreach ($fieldreport as $key => $value) {
              $fields[$value->field_id] = $value->operation;
          }
          return $this->graph($fields);
      }
}
