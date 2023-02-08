<?php

namespace App\Http\Controllers;

use App\Models\FieldReport;
use App\Models\Report;
use App\Traits\ApiResponser;
use App\Traits\ReportGenerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    use ApiResponser;

    public function test () {
        $authGuard = Auth::guard();
        if($authGuard->guest()) {
            return $this->errorResponse('You are not logged in', Response::HTTP_UNAUTHORIZED);
        }

        $rolesOrPermissions = is_array($roleOrPermission)
            ? $roleOrPermission
            : explode('|', $roleOrPermission);

        if (! $authGuard->user()->hasAnyRole($rolesOrPermissions) && ! $authGuard->user()->hasAnyPermission($rolesOrPermissions)) {
            throw UnauthorizedException::forRolesOrPermissions($rolesOrPermissions);
        }

        return $next($request);
        dd($authGuard->guest());
        dd($authGuard);
    }
}
