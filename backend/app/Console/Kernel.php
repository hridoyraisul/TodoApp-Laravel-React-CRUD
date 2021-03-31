<?php

namespace App\Console;

use App\Console\Commands\EmailUserCommand;
use App\Jobs\SendEmailJob;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [

    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->job(new SendEmailJob())->between('09:00', '10:00');
        $schedule->job(new SendEmailJob())->between('11:30', '12:30');
        $schedule->job(new SendEmailJob())->between('15:30', '16:30');
        $schedule->job(new SendEmailJob())->between('19:30', '20:30');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
