"use strict";


//---------------------------------------------------------------------
exports.value_missing =
	function value_missing( Value )
	{
		if ( typeof Value === 'undefined' ) { return true; }
		if ( Value === null ) { return true; }
		return false;
	};


//---------------------------------------------------------------------
exports.clone =
	function clone( Value )
	{
		return JSON.parse( JSON.stringify( Value ) );
	};

