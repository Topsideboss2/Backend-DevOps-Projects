<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityResponse extends Model
{
    use HasFactory, Uuid;

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $fillable = ['activity_field_id', 'value', 'company_id'];

    public function company () {
        return $this->belongsTo(Company::class);
    }

    public function activity_fields () {
        return $this->belongsTo(ActivityField::class);
    }
}
