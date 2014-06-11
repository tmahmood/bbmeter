@extends('layout')
@section('content')
	<ul id="questionlist"></ul>
	<div id="displayopts">
		<h1></h1>
	</div>
	@show

@section('scripts')
	@parent
	{{ HTML::script('assets/js/d3_nvd3.min.js') }}
	{{ HTML::script('assets/js/graphcore.min.js') }}
	{{ HTML::script('assets/js/visual.min.js') }}
	@show

@stop

