<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

// Ticket System Route
Route::resource('tickets',TicketController::class);
