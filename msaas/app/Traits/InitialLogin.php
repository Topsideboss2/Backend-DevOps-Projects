<?php

namespace App\Traits;

use App\Models\Company;

trait InitialLogin {
    public function checkIfIsCompanyAdmin () {
        $user= auth()->user();
        $company = Company::find($user->id);
        
    }
}
