<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Traits\ApiResponser;
use App\Traits\ActiveCompany;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class ActiveCompanyController extends Controller
{
    use ApiResponser, ActiveCompany;

    public function checkActiveCompany () {
        return $this->checkActive();
    }

    public function activateCompany (Request $request) {
        $validator = Validator::make($request->all(), [
            'company_id' => 'required|exists:companies,id',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse($validator->errors()->first(), Response::HTTP_BAD_REQUEST);
        }
        return $this->activate($request->company_id);
    }

    public function switchCompany (Request $request) {
        $validator = Validator::make($request->all(), [
            'company_id' => 'required|exists:companies,id',
        ]);
        if ($validator->fails()) {
            return $this->errorResponse($validator->errors()->first(), Response::HTTP_BAD_REQUEST);
        }
        return $this->logoutCompany($request->company_id);
    }

    public function logoutCompany () {
      return $this->logoutAll();
    }
}
