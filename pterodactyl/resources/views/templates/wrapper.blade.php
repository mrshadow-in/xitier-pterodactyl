<html>
    <head>
        <title>{{ config('app.name', 'Pterodactyl') }}</title>

        @section('meta')
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
            <meta name="csrf-token" content="{{ csrf_token() }}">
            <meta name="robots" content="noindex">
            
            <?php
            $settings = \Illuminate\Support\Facades\DB::table('theme')->first();
            ?>

            <meta property="og:type" content="website" />
            <meta property="og:image" content="<?php echo $settings->logo; ?>"/>
            <meta property="og:description" content="<?php echo $settings->discription; ?>" />
            <meta name="theme-color" content="<?php echo $settings->metacolor; ?>">
            <meta property="twitter:title" content="<?php echo $settings->title; ?>">


            <link rel="icon" type="image/png" href="<?php echo $settings->logo; ?>" sizes="16x16">
            <style>
                body{
                    background-image:url("<?php echo $settings->backgroundimage; ?>");
                    background-repeat:no-repeat;
                    background-size:cover;
                    background-position:center;
                    background-attachment: fixed;
                }
                :root{
                    --highlight-color:<?php echo $settings->highlightcolor; ?>;
                    --light-color:<?php echo $settings->lightcolor; ?>;
                    --color:<?php echo $settings->color; ?>;
                    --sub-color:<?php echo $settings->subcolor; ?>;
                    --color-4:<?php echo $settings->color4; ?>;
                    --color-5:<?php echo $settings->color5; ?>;
                    --color-6:<?php echo $settings->color6; ?>;
                    --dark:<?php echo $settings->dark; ?>;
                    --background-color:<?php echo $settings->background; ?>;
                    --input:<?php echo $settings->input; ?>;
                    --primary:<?php echo $settings->primary; ?>;
                    --secondary:<?php echo $settings->secondary; ?>;
                    --primary-hover:<?php echo $settings->primaryhover; ?>;
                    --secondary-hover:<?php echo $settings->secondaryhover; ?>;
                    --danger:<?php echo $settings->dangerbutton; ?>;
                    --danger-hover:<?php echo $settings->dangerbuttonhover; ?>;
                    --text:<?php echo $settings->textbutton; ?>;
                    --text-hover:<?php echo $settings->textbuttonhover; ?>;

                    --black:#000000;
                    --white:#fff;

                    --borderradius:<?php echo $settings->borderradius; ?>px;
                    --border-radius-items:10px;

                    <?php if (empty($settings->sidegraph)) {echo "--sidegraph:none;";}?>
                    <?php if (empty($settings->subnavigation)) {echo "--subnavigation:none;";}?>
                    <?php if (empty($settings->infoelement)) {echo "--infoelement:none;";} else {echo "--infoelement:block;";}?>
                    <?php if (empty($settings->graphcard)) {echo "--graphcard:none;";}?>

                    
                    <?php if ($settings->website == 'none') {echo "--website:none;";} else {echo "--website:flex;";}?>
                    <?php if ($settings->status == 'none') {echo "--status:none;";} else {echo "--status:flex;";}?>
                    <?php if ($settings->billing == 'none') {echo "--billing:none;";} else {echo "--billing:flex;";}?>
                    <?php if ($settings->discord == 'none') {echo "--discord:none;";} else {echo "--discord:flex;";}?>
                    <?php if ($settings->knowledgebase  == 'none') {echo "--knowledgebase :none;";} else {echo "--knowledgebase:flex;";}?>
                }

                .darkmode{
                    --highlight-color:<?php echo $settings->lhighlightcolor; ?>;
                    --light-color:<?php echo $settings->llightcolor; ?>;
                    --color:<?php echo $settings->lcolor; ?>;
                    --sub-color:<?php echo $settings->lsubcolor; ?>;
                    --color-4:<?php echo $settings->lcolor4; ?>;
                    --color-5:<?php echo $settings->lcolor5; ?>;
                    --color-6:<?php echo $settings->lcolor6; ?>;
                    --dark:<?php echo $settings->ldark; ?>;
                    --background-color:<?php echo $settings->lbackground; ?>;
                    --input:<?php echo $settings->linput; ?>;
                    --primary:<?php echo $settings->lprimary; ?>;
                    --secondary:<?php echo $settings->lsecondary; ?>;
                    --primary-hover:<?php echo $settings->lprimaryhover; ?>;
                    --secondary-hover:<?php echo $settings->lsecondaryhover; ?>;
                    --danger:<?php echo $settings->ldangerbutton; ?>;
                    --danger-hover:<?php echo $settings->ldangerbuttonhover; ?>;
                    --text:<?php echo $settings->ltextbutton; ?>;
                    --text-hover:<?php echo $settings->ltextbuttonhover; ?>;

                    --black:#fff;
                    --white:#000000;
                }
            </style>

            <link rel="manifest" href="/favicons/manifest.json">
            <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#bc6e3c">
            <link rel="shortcut icon" href="<?php echo $settings->logo; ?>">
            <meta name="msapplication-config" content="/favicons/browserconfig.xml">
            <meta name="theme-color" content="#0e4688">
            
        @show

        @section('user-data')
            @if(!is_null(Auth::user()))
                <script>
                    window.PterodactylUser = {!! json_encode(Auth::user()->toVueObject()) !!};
                </script>
            @endif
            @if(!empty($siteConfiguration))
                <script>
                    window.SiteConfiguration = {!! json_encode($siteConfiguration) !!};
                </script>
            @endif
        @show
        <style>
            @import url('//fonts.googleapis.com/css?family=Rubik:300,400,500&display=swap');
            @import url('//fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans:500&display=swap');
        </style>

        @yield('assets')

        @include('layouts.scripts')
    </head>
    <body class="{{ $css['body'] ?? 'bg-neutral-50' }}">
        @section('content')
            @yield('above-container')
            @yield('container')
            @yield('below-container')
        @show
        @section('scripts')
            {!! $asset->js('main.js') !!}
        @show

    <script>
        // As soon as you adjust or remove this data, and we see this, will result in a lawsuit or multiple sanctions.
        localStorage.setItem("username", "RetlyHosting");
        localStorage.setItem("BuyerID", "456054");
        localStorage.setItem("Timestamp", "1689915511");
    </script>
    </body>
</html>
