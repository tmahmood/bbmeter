@extends('layout')
@section('content')

<div id="surveymenu">
	<h2></h2>
</div>

<div>

	<div id="groupmenu">
		<h2></h2>
	</div>

	<ul id="questionlist">
	</ul>

	<div id="displayopts">
		<h1></h1>
	</div>

</div>

@show

@section('scripts')
	@parent
	{{ HTML::script('assets/js/d3_nvd3.min.js') }}
	{{ HTML::script('assets/js/graphcore.min.js') }}
	{{ HTML::script('assets/js/visual.min.js') }}
	@show

@stop

