<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
