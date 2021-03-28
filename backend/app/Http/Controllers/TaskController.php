<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function getTodoList($user_id){
        $data = Task::where('user_id',$user_id)->get();
        return response()->json($data,200);
    }
    public function getOneTask($id){
        return response()->json(Task::find($id),200);
    }
    public function allTask(){
        return response()->json(Task::all(),200);
    }
    public function addTask(Request $request){
        Task::create($request->all());
        return response(['status'=>true],201);
    }
    public function deleteTask($id){
        Task::find($id)->delete();
        return response()->json(['status'=>true],200);
    }
    public function editTask(Request $request,$id){
        Task::find($id)->update([
            'title' => $request->title,
            'detail' => $request->detail,
            'schedule' => $request->schedule,
        ]);
        return response()->json(['status'=>true],201);
    }
}
