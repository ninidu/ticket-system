@extends('layouts.app')

@section('content')
<div class="max-w-xl mx-auto px-4 py-6">
    <h1 class="text-xl font-bold mb-4">Create Ticket</h1>
    <!-- React Mount Point with data -->
    <div id="create-ticket-app"  data-errors='@json($errors->all())' data-action="{{ route('tickets.store') }}"></div>
</div>
@endsection

@viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/index.jsx','resources/js/pages/CreateTicketForm.jsx'])