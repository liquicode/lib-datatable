"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		CELL VALUE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.GetValue =
	function GetValue( AtRow, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtRow ) ) { AtRow = 0; }
		if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
		if ( AtRow < 0 ) { throw new Error( 'AtRow must be greater than or equal to zero.' ); }
		if ( AtColumn < 0 ) { throw new Error( 'AtColumn must be greater than or equal to zero.' ); }
		if ( AtRow >= this.data.rows.length ) { return LIB_UTILS.clone( this.options.blank_value ); }

		// Get the row.
		let row = this.data.rows[ AtRow ];

		// Get the value.
		if ( AtColumn >= row.length ) { return LIB_UTILS.clone( this.options.blank_value ); }
		let value = row[ AtColumn ];

		// Return, OK.
		return value;
	};


//---------------------------------------------------------------------
exports.SetValue =
	function SetValue( Value, AtRow, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtRow ) ) { AtRow = 0; }
		if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
		if ( LIB_UTILS.value_missing( Value ) ) { Value = LIB_UTILS.clone( this.options.blank_value ); }
		if ( AtRow < 0 ) { throw new Error( 'AtRow must be greater than or equal to zero.' ); }
		if ( AtColumn < 0 ) { throw new Error( 'AtColumn must be greater than or equal to zero.' ); }

		// Extend the rows to include AtRow.
		while ( AtRow >= this.data.rows.length )
		{ this.data.rows.push( LIB_UTILS.clone( this.options.blank_row ) ); }

		// Get the row.
		let row = this.data.rows[ AtRow ];

		// Extend the column_headings to include AtColumn.
		while ( AtColumn >= this.data.column_headings.length )
		{ this.data.column_headings.push( '' ); }

		// Extend the row to include AtColumn.
		while ( AtColumn >= row.length )
		{ row.push( LIB_UTILS.clone( this.options.blank_value ) ); }

		// Set the value.
		row[ AtColumn ] = Value;

		// Return, OK.
		return;
	};

