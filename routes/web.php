<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\AuthController;

Route::get('/', function () {
   return view('welcome');
   //return Inertia::render('Main');
});

Route::get('/main', function () {
   //return view('welcome');
   return Inertia::render('Main');
});

Route::get('/salao', function () {
   //return view('welcome');
   return Inertia::render('Salao');
});

/*login e token */
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

