"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		CELL VALUE
//
//=====================================================================
//=====================================================================


//=====================================================================
//=====================================================================
//
//		GET VALUE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.GetValue =
	function GetValue( RowIndex, ColIndex )
	{
		// Get the location.
		let rowcol = this.RowCol( RowIndex, ColIndex );
		if ( rowcol.row_index === null ) { throw new Error( `Invalid RowIndex [${rowcol.row_index}].` ); }
		if ( rowcol.col_index === null ) { throw new Error( `Invalid ColIndex [${rowcol.col_index}].` ); }

		// Get the row.
		if ( rowcol.row_index >= this.data.rows.length ) { throw new Error( `RowIndex [${rowcol.row_index}] does not exist.` ); }
		let row = this.data.rows[ rowcol.row_index ];

		// Get the value.
		if ( rowcol.col_index >= row.length ) { return LIB_UTILS.clone( this.options.blank_value ); }
		let value = row[ rowcol.col_index ];

		// Return, OK.
		return value;
	};


//=====================================================================
//=====================================================================
//
//		SET VALUE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.SetValue =
	function SetValue( Value, RowIndex, ColIndex )
	{
		// Get the location.
		let rowcol = this.RowCol( RowIndex, ColIndex );
		if ( rowcol.row_index === null ) { throw new Error( `Invalid RowIndex [${rowcol.row_index}].` ); }
		if ( rowcol.col_index === null ) { throw new Error( `Invalid ColIndex [${rowcol.col_index}].` ); }

		// Get the row.
		let row = this.data.rows[ rowcol.row_index ];

		// Extend the column_headings to include ColIndex.
		while ( rowcol.col_index >= this.data.column_headings.length )
		{ this.data.column_headings.push( '' ); }

		// Extend the row to include ColIndex.
		while ( rowcol.col_index >= row.length )
		{ row.push( LIB_UTILS.clone( this.options.blank_value ) ); }

		// Set the value.
		row[ rowcol.col_index ] = Value;

		// Return, OK.
		return;
	};

