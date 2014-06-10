@extends('layout')
@section('content')
	<ul id="questionlist"></ul>
	<div id="displayopts"></div>
	@show

@section('scripts')
	@parent
	{{ HTML::script('assets/js/d3_nvd3.min.js') }}
	{{ HTML::script('assets/js/compendium.min.js') }}
	@show

@stop

