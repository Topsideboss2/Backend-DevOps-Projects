<?php

namespace Database\Seeders;

use App\Models\ReportType;
use Illuminate\Database\Seeder;

class ReportTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //AreaChart Report
        ReportType::create([
            'name' => 'AreaChart'
        ]);

        //BarChart Report
        ReportType::create([
            'name' => 'BarChart'
        ]);

        //LineChart Report
        ReportType::create([
            'name' => 'LineChart'
        ]);

        //ComposedChart Report
        ReportType::create([
            'name' => 'ComposedChart'
        ]);

        //PieChart Report
        ReportType::create([
            'name' => 'PieChart'
        ]);

        //RadarChart Report
        ReportType::create([
            'name' => 'RadarChart'
        ]);
    }
}
