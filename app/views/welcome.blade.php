@extends('layout')
@section('content')

	<h1>Welcome</h1>

	<div id="displayopts">
	</div>

	@show

@section('scripts')
	@parent
	{{ HTML::script('assets/js/d3_nvd3.min.js') }}
	{{ HTML::script('assets/js/dataproc.min.js') }}
	@show

@stop

