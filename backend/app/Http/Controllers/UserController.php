<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmailJob;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Http\Request;
use Illuminate\Queue\Jobs\Job;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function createUser(Request $request){
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json(['status'=>true],201);
    }
    public function userLogin(Request $request){
        if ($user = User::where('email',$request->email)->first()){
            if (Hash::check($request->password, $user->password)){
                session([
                    'user_name' => $user->name,
                    'user_email' => $user->email,
                    'user_id' => $user->id,
                ]);
                return response()->json(['login_status'=>true,'user'=>$user],200);
            }
            else{
                return response()->json(['login_status'=>false,'error_msg'=>'Wrong Password'],200);
            }
        }
        else{
            return response()->json(['login_status'=>false,'error_msg'=>'User not exist'],200);
        }
    }
    public function getUser($id){
        return response()->json(User::find($id),200);
    }
    //---------Newsletter Email Pause---------//
    public function pauseEmail(Schedule $schedule){
        $schedule->command('email:pause')
            ->delay(now()->addMinutes(10));
        return response()->json(['send_status'=>'paused'],200);
    }
    public function stopSendEmail(Schedule $schedule){
        $schedule->command('email:pause')->at(Carbon::now());
        return response()->json(['send_status'=>'paused'],200);
    }
}
