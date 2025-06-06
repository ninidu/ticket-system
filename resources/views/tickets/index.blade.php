@extends('layouts.app')

@section('content')
<div class="max-w-6xl mx-auto px-4 py-6">
    <!-- Header with Create Button -->
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Customer Support Ticket System</h1>
        <a
            href="{{ route('tickets.create') }}"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
        >
            + Create Ticket
        </a>
    </div>

    <!-- React Mount Point with ticket data and flash message -->
    <div
        id="ticket-app"
        data-tickets='@json($tickets)'
        data-flash="{{ session('success') }}"
        data-error="{{ session('error') }}"
        data-status="{{ $status ?? '' }}"
        data-search="{{ $search ?? '' }}"
        data-sort="{{ $sort ?? 'desc' }}"
        data-action="{{  url('/') }}"
    ></div>
</div>
@endsection

@viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/index.jsx'])
