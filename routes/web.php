<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EmpresaController;

Route::get('/', function () {
   return view('welcome');
   //return Inertia::render('Main');
});

/*routes forn end*/
Route::get('/admin', function () {
   //return view('welcome');
   return Inertia::render('Admin');
});

Route::get('/salao', function () {
   //return view('welcome');
   return Inertia::render('Salao');
});

/*end routes forn end*/

/*login e token */
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);


Route::prefix('empresa')->group(function () {
   Route::post('storeapi', [EmpresaController::class, 'storeApi'])->name('empresa.storeApi');
   Route::post('store', [EmpresaController::class, 'store'])->name('empresa.store');
   Route::get('index', [EmpresaController::class, 'index'])->name('empresa.index');
});


