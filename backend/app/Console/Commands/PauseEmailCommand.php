<?php

namespace App\Console\Commands;

use App\Jobs\SendEmailJob;
use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;

class PauseEmailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:pause';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Email Paused';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        SendEmailJob::dispatch();
        $this->info('Email paused');
    }
}
