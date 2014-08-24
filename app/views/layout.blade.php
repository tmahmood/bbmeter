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

		<link href='http://fonts.googleapis.com/css?family=Roboto:400,400italic,700,700italic,300,300italic|Roboto+Condensed:400,700'
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
		<div id="container">
			<!-- HEADER -->
			<header id="logo">
				<h1>
					<a class="_txt_" href="#txt$frontpage"><img src="assets/imgs/logo.png" alt="Bangladesh Barometer"></a>
				</h1>
			</header>
			<!-- NAVIGATION -->
			<nav>
				<p><img src="assets/imgs/icon-menu.svg"></p>
				<h4>Latest Survey</h4>
				<a class="_nv_graphs" href="visual#catss/2014/july">Most Recent Survey Results</a>
				<a class="_nv_graphs" href="visual#mmonitor/2014/june">Media Monitoring</a>
				<a class="_nv_graphs" href="visual#elections/2014/upazila_march">Election Result Analysis</a>
				<a class="_nv_graphs" href="visual#catss/2014/july">Media Survey</a>
				<h4>Others</h4>
				<a class="_nv_archive" href="visual#archive">All Data</a>
			</nav>
			<!-- NOTIFICATIONS -->
			<div id="notifications"></div>
			<!-- CONTENT -->
			<main>
				<div id="frontend"></div>
				<div id="textcontainer"></div>
				<div id="graphcontent">
					@yield('content')
				</div>
			</main>
			@if(isset($debug) && $debug != '')
				<pre>{{ print_r($debug) }}</pre>
			@endif
		</div>

		<footer id="footer">
			<a class="_txt_" href="#txt$contact">Contact</a>
			<a class="_txt_" href="#txt$aboutdi">About DI</a>
			<img src="assets/imgs/usaid.png" alt="USAID">
			<img src="assets/imgs/di_logo.png" alt="DI">
			<img src="assets/imgs/ukaid.png" alt="UKAID">
		</footer>

		<!-- SCRIPTS -->
		@section('scripts')
		{{ HTML::script("https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js") }}
		{{ HTML::script('assets/js/production.min.js') }}
		{{ HTML::script('assets/js/core.min.js') }}
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
