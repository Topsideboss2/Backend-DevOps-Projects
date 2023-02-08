<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class MilestoneDetailsController extends Controller
{
    use ApiResponser;
    
    public function tasks ($id) {
        $milestone = Milestone::find($id);
        if(!$milestone) {
            return $this->notFound();
        }
        return $this->successResponse($milestone->tasks);
    }

    public function activities ($id) {
        $milestone = Milestone::find($id);
        if(!$milestone) {
            return $this->notFound();
        }
        return $this->successResponse($milestone->activities);
    }
}
