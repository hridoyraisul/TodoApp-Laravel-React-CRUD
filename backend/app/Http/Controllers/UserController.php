<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
}
