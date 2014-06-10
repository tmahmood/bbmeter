<!DOCTYPE html>
<html>
	<head>

		@section('title')
    	<title>{{ Config::get('client.title') }}</title>
		@show

		<script type="text/javascript">
				var calllater = [];
		</script>

		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<!-- GOOGLE FONTS -->

		<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,700'
			rel='stylesheet' type='text/css'>

		<link href='http://fonts.googleapis.com/css?family=Source+Code+Pro:400,700'
			rel='stylesheet' type='text/css'>

		<!-- STYLES -->
		@section('styles')
		{{ HTML::style('assets/css/master.css')}}
		{{ HTML::style('assets/css/static.css')}}
		@show
	</head>
    <body>

		<!-- HEADER -->
		<header id="logo">
			<h1>Bangladesh Barometer</h1>
		</header>

		<!-- NAVIGATION -->
		<nav>
			<p><img src="assets/imgs/icon-menu.svg"></p>

			<h4>Latest Survey</h4>
			<a class="_nv_graphs" href="catss">Most Recent Survey Results</a>
			<a class="_nv_graphs" href="demography">Demography</a>

			<h4>All Survey</h4>
			<a class="_nv_graphs" href="compendium">All Survey Results</a>


			<h4>user</h4>
			@if (Auth::check())
			@section('navigation')
				<a href="/logout">Logout</a>
			@show
			@else
			<a href="/login">Login</a>
			@endif

		</nav>

		<!-- NOTIFICATIONS -->
		<div id="notifications"></div>

		<!-- CONTENT -->
		<main>
			@yield('content')
		</main>

		@if(isset($debug) && $debug != '')
			<pre>{{ print_r($debug) }}</pre>
		@endif

		<!-- SCRIPTS -->
		@section('scripts')
		{{ HTML::script("https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js") }}
		{{ HTML::script('assets/js/production.min.js') }}
		@show

		<!-- NOTIFICATION HANDLE -->
		<script type="text/javascript">
		@if(Session::has('message'))
			notification('{{ Session::get('message') }}', 'message');
		@endif
		@if(Session::has('error'))
			notification('{{ Session::get('error') }}', 'error');
		@endif
		@if(Session::has('success'))
			notification('{{ Session::get('success') }}', 'success');
		@endif
		@if(Session::has('warn'))
			notification('{{ Session::get('warn') }}', 'warn');
		@endif
		</script>
    </body>
</html>
