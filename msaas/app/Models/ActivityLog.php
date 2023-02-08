<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Models\Activity as ActivityModel;

class ActivityLog extends ActivityModel
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';
}
