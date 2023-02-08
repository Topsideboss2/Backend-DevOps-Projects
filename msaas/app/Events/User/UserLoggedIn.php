<?php

namespace App\Events\User;

use App\Models\User;
use Illuminate\Queue\SerializesModels;

class UserLoggedIn {
    use SerializesModels;

    public $user;

    public function _construct(User $user) {
        $this->user = $user;
    }
}
