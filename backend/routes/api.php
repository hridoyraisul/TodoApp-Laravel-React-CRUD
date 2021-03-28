<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/task-list',[\App\Http\Controllers\TaskController::class,'allTask']);
Route::get('/users-task-list/{user_id}',[\App\Http\Controllers\TaskController::class,'getTodoList']);
Route::get('/one-task/{id}',[\App\Http\Controllers\TaskController::class,'getOneTask']);
Route::post('/add-new-task',[\App\Http\Controllers\TaskController::class,'addTask']);
Route::delete('/delete-task/{id}',[\App\Http\Controllers\TaskController::class,'deleteTask']);
Route::post('/edit-task/{id}',[\App\Http\Controllers\TaskController::class,'editTask']);
