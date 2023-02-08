<?php

namespace App\Traits;

use App\Models\FieldProject;
use Illuminate\Support\Facades\DB;

trait ReportGenerator {
    public function Charts ($fields) {
        $data = [];
        foreach($fields as $f => $v){
        $agg = is_array($v) ? $v[0] : $v;
        $pj = FieldProject::query()->where('field_id', $f)
        ->with(['project:id,title'])
        ->when(is_array($v),
            fn($q) => $q->groupBy('project_id')->groupByRaw('value, field_id')->selectRaw("$agg(value) as total, value, field_id, project_id")->get(),
            fn($q) => $q->groupBy('project_id')->groupBy('field_id')->selectRaw("$agg(value) as total, field_id, project_id")->get()
            );
            // dd($pj->toArray());
        if (is_array($v)) {
            foreach($pj as $f){
                $data[$f->project_id] = [
                    "name" => $f->project->title,
                    "count" => $f->total,
                    "category" =>$f->value
                ];
            }
        }
        else {
            foreach ($pj as $value) {
                $data[$value->project_id] = [
                    "name" => $value->project->title,
                    "count" => $value->total
                    ];
            }

        }
        }
        return response()->json($data);
    }
 }
