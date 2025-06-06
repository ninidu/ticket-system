<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Custommer Support Tickets System</title>
    @vite(['resources/css/app.css'])
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
</head>
<body class="bg-gray-100 text-gray-900">

    <nav class="bg-white shadow p-4 mb-6">
    </nav>

    <main class="container mx-auto">
        @yield('content')
    </main>

</body>
</html>
