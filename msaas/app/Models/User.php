<?php

namespace App\Models;

use App\Traits\Uuid;
use App\Traits\ActiveCompany;
use App\Notifications\NewPassword;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\Sanctum;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, Uuid, ActiveCompany;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public const TYPE_SUPER_ADMIN = 'super-admin';
    public const TYPE_ADMIN = 'admin';
    public const TYPE_USER = 'user';


    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $fillable = [
        'type',
        'name',
        'email',
        'password',
        'last_login_at',
        'last_login_ip',
        'active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'active' => 'boolean',
        'last_login_at' => 'datetime',
    ];

    public function tokens()
    {
        return $this->morphMany(Sanctum::$personalAccessTokenModel, 'tokenable', "tokenable_type", "tokenable_uuid");
    }

    public function sendPasswordResetNotification($token): void
    {
        $f = env('SPA_URL');
        $url = ''.$f.'/resetpassword';
        $this->notify(new ResetPasswordNotification($token, $url));
    }

    public function company () {
        return $this->belongsTo(Company::class);
    }

    public static function company_id () {
        return ActiveCompany::checkActiveCompanyId();
    }

    public static function logged_user () {
        $user = auth()->user();
        return $user;
    }

    public static function checkCompany ($id, $company) {
        $companyusers = CompanyUser::where('user_id', $id)->where('company_id', $company)->first();
        return $companyusers->company_id;
    }

    public function company_users () {
        return $this->hasMany(CompanyUser::class);
    }
}
