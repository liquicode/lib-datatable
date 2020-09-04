"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		CELL VALUE
//
//=====================================================================
//=====================================================================
/*docs

category:	Cell Values
description:
Functions to inspect and manipulate the cells of a `Datatable`.
*/


//---------------------------------------------------------------------
/*docs

category:	Cell Values
function:	GetValue( AtRow, AtColumn )
parameter:	AtRow
parameter:	AtColumn

description:
Gets the value stored at a specific row and column index.
If `AtRow` or `AtColumn` are negative, then the value will be located from the end of the rows or columns. 
If `AtRow` or `AtColumn` are greater than the number of the rows or columns, then a blank value will be returned (`options.blank_value`). 

examples:
	GetValue()					- Gets the value at the first row and column.
	GetValue( 0 )				- Gets the value at the first row and column.
	GetValue( 0, 0 )			- Gets the value at the first row and column.
	GetValue( 1, 1 )			- Gets the value at the second row and column.
	GetValue( -1, -1 )			- Gets the value at the last row and column.
	GetValue( -2, -2 )			- Gets the value at the second to last row and column.
*/
exports.GetValue =
	function GetValue( AtRow, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtRow ) ) { AtRow = 0; }
		if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
		if ( AtRow < 0 ) { AtRow = ( this.data.rows.length + AtRow ); }
		if ( AtColumn < 0 ) { AtColumn = ( this.data.column_headings.length + AtColumn ); }
		if ( AtRow < 0 ) { throw new Error( 'AtRow must be greater than or equal to zero.' ); }
		if ( AtColumn < 0 ) { throw new Error( 'AtColumn must be greater than or equal to zero.' ); }
		if ( AtRow >= this.data.rows.length ) { return LIB_UTILS.clone( this.options.blank_value ); }
		if ( AtColumn >= this.data.column_headings.length ) { return LIB_UTILS.clone( this.options.blank_value ); }

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

