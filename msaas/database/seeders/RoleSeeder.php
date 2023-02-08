<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// use Spatie\Permission\Models\Role;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Admin Role
        Role::create([
            'guard_name' => 'web',
            'name' => 'admin'
        ]);

        //Project Manager Role
        Role::create([
            'guard_name' => 'web',
            'name' => 'project manager'
        ]);

        //Field Agent Role
        Role::create([
            'guard_name' => 'web',
            'name' => 'field agent'
        ]);

        //User Role
        Role::create([
            'guard_name' => 'web',
            'name' => 'user'
        ]);
    }
}
