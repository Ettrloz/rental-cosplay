<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color so there is no white flash before hydration --}}
        <style>
            html {
                background-color: var(--page, oklch(0.145 0 0));
            }
        </style>

        {{-- Light mode favicon --}}
        <link rel="icon" href="/favicon.ico" sizes="any" media="(prefers-color-scheme: light)">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" media="(prefers-color-scheme: light)">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" media="(prefers-color-scheme: light)">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" media="(prefers-color-scheme: light)">

        {{-- Dark mode favicon --}}
        <link rel="icon" href="/dark/favicon.ico" sizes="any" media="(prefers-color-scheme: dark)">
        <link rel="icon" type="image/png" sizes="32x32" href="/dark/favicon-32x32.png" media="(prefers-color-scheme: dark)">
        <link rel="icon" type="image/png" sizes="16x16" href="/dark/favicon-16x16.png" media="(prefers-color-scheme: dark)">
        <link rel="apple-touch-icon" sizes="180x180" href="/dark/apple-touch-icon.png" media="(prefers-color-scheme: dark)">

        <link rel="manifest" href="/site.webmanifest">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
