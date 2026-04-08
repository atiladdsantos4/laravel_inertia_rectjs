<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\SectionItemController;
use App\Http\Controllers\Api\TestemunhoController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('section',SectionController::class)->middleware('auth:sanctum');
Route::apiResource('sectionitem',SectionItemController::class)->middleware('auth:sanctum');
Route::apiResource('testemunho',TestemunhoController::class)->middleware('auth:sanctum');
