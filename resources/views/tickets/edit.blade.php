@extends('layouts.app')

@section('content')
<div class="max-w-xl mx-auto px-4 py-6">
    <h1 class="text-xl font-bold mb-4">Edit Ticket</h1>
    <!-- React Mount Point with data -->
    <div
        id="edit-ticket-app"
        data-ticket='@json($ticket)'
        data-action="{{ route('tickets.update', $ticket->id) }}"
        data-errors='@json($errors->all())'
    ></div>
</div>
@endsection

@viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/index.jsx'])
