<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';

    public function company () {
        return $this->belongsTo(Company::class);
    }
    public function reporttype () {
        return $this->belongsTo(ReportType::class);
    }
}
