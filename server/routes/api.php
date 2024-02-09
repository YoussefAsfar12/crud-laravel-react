<?php

use App\Http\Controllers\Api\ProductController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::put('test/{id}', [ProductController::class, 'test']);


Route::get('products', [ProductController::class, 'index']);


Route::post('products', [ProductController::class, 'store']);


Route::get('products/{id}', [ProductController::class, 'show']);


Route::put('products/{id}', [ProductController::class, 'update']);


Route::delete('products/{id}', [ProductController::class, 'destroy']);


Route::put('/update/{id}', [ProductController::class, 'updateImage']);
