<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Invite extends Model
{
    use HasFactory, Notifiable, Uuid;

    protected $fillable = [
        'email',
        'token'
    ];

    public $incrementing = false;

    protected $keyType = 'uuid';
}
