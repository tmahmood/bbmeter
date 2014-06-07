@extends('layout')
@section('content')
{{ Form::open(array('url'=>'users/login', 'class'=>'impform', 'id'=> 'loginform')) }}
	<fieldset>
    <legend class="form-login-heading">Please Login</legend>
	<div>
	{{ Form::label('userName', 'Name') }}
    {{ Form::text('name', null, array('class'=>'input-block-level', 'id'=>'userName')) }}
	</div>
	<div>
	{{ Form::label('userPassword', 'Password') }}
    {{ Form::password('password', array('class'=>'input-block-level', 'id'=>'userPassword')) }}
	</div>
	</fieldset>
	<div class="submit">
		{{ Form::submit('Login', array('class'=>'greenbtn'))}}
	</div>
{{ Form::close() }}
@stop
