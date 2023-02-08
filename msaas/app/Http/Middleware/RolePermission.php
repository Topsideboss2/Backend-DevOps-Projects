<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Traits\ActiveCompany;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class RolePermission
{
    use ApiResponser, ActiveCompany;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $roleOrPermission)
    {
        $authGuard = Auth::guard();
        if ($authGuard->guest()) {
            return $this->errorResponse('You are not logged in', Response::HTTP_UNAUTHORIZED);
        }

        $result = $this->checkRolePermission($roleOrPermission);

        if (!$result) {
            return $this->errorResponse('You are not authorized to access this resource', Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}
