"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		COLUMN MANIPULATION
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.ColumnCount =
	function ColumnCount()
	{
		return this.data.column_headings.length;
	};


//---------------------------------------------------------------------
/*docs

function:		InsertBlankColumns( Count, AtColumn )
examples:
	InsertBlankColumns()			- Insert a single blank column to the beginning.
	InsertBlankColumns( 3 )			- Insert three blank columns to the beginning.
	InsertBlankColumns( 3, 0 )		- Insert three blank columns to the beginning.
	InsertBlankColumns( 3, 5 )		- Insert three blank columns at column index 5.
	InsertBlankColumns( 3, -1 )		- Insert three blank columns to the end.
*/
exports.InsertBlankColumns =
	function InsertBlankColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) && LIB_UTILS.value_missing( Count ) )
		{
			AtColumn = 0;
			Count = 1;
		}
		else
		{
			if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
			if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }
		}
		if ( AtColumn < -1 ) { throw new Error( 'AtColumn must be either -1 or greater than or equal to zero.' ); }
		if ( AtColumn >= this.data.column_headings.length ) { throw new Error( 'AtColumn must be less than the number of columns.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.data.column_headings.length ) { throw new Error( 'Count must be less than or equal to the number of columns.' ); }
		if ( AtColumn === -1 ) { AtColumn = ( this.data.column_headings.length - Count ); }

		// Splice column_headings.
		let blank_columns = [];
		for ( let index = 0; index < Count; index++ ) { blank_columns.push( '' ); }
		this.data.column_headings.splice( AtColumn, 0, ...blank_columns );

		// Splice rows.
		blank_columns = [];
		for ( let index = 0; index < Count; index++ ) { blank_columns.push( this.options.blank_value ); }
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			let row = this.data.rows[ row_index ];
			row.splice( AtColumn, 0, ...LIB_UTILS.clone( blank_columns ) );
		}

		// Return, OK.
		return;
	};


//---------------------------------------------------------------------
/*docs

function:	DeleteColumns( Count, AtColumn )
returns:	nothing
parameter:	Count
parameter:	AtColumn
description:

examples:
	DeleteColumns()				- Delete all columns.
	DeleteColumns( 1 )			- Delete the first column.
	DeleteColumns( 1, 0 )		- Delete the first column.
	DeleteColumns( 3, 2 )		- Delete three columns starting at column index 2.
	DeleteColumns( 3, -1 )		- Delete the last three columns.
*/
exports.DeleteColumns =
	function DeleteColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) && LIB_UTILS.value_missing( Count ) )
		{
			AtColumn = 0;
			Count = this.data.column_headings.length;
		}
		else
		{
			if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
			if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }
		}
		if ( AtColumn < -1 ) { throw new Error( 'AtColumn must be either -1 or greater than or equal to zero.' ); }
		if ( AtColumn >= this.data.column_headings.length ) { throw new Error( 'AtColumn must be less than the number of columns.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.data.column_headings.length ) { throw new Error( 'Count must be less than or equal to the number of columns.' ); }
		if ( AtColumn === -1 ) { AtColumn = ( this.data.column_headings.length - Count ); }

		// Splice column_headings.
		this.data.column_headings.splice( AtColumn, Count );

		// Splice rows.
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			let row = this.data.rows[ row_index ];
			if ( AtColumn >= row.length ) { continue; }
			row.splice( AtColumn, Count );
		}

		// Return, OK.
		return;
	};


//---------------------------------------------------------------------
/*docs

function:	ClearColumns( Count, AtColumn )
returns:	nothing
parameter:	Count
parameter:	AtColumn
description:

examples:
	ClearColumns()				- Clears all columns.
	ClearColumns( 1 )			- Clears the first column.
	ClearColumns( 1, 0 )		- Clears the first column.
	ClearColumns( 3, 2 )		- Clears three columns starting at column index 2.
	ClearColumns( 3, -1 )		- Clears the last three columns.
*/
exports.ClearColumns =
	function ClearColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) && LIB_UTILS.value_missing( Count ) )
		{
			AtColumn = 0;
			Count = this.data.column_headings.length;
		}
		else
		{
			if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
			if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }
		}
		if ( AtColumn < -1 ) { throw new Error( 'AtColumn must be either -1 or greater than or equal to zero.' ); }
		if ( AtColumn >= this.data.column_headings.length ) { throw new Error( 'AtColumn must be less than the number of columns.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.data.column_headings.length ) { throw new Error( 'Count must be less than or equal to the number of columns.' ); }
		if ( AtColumn === -1 ) { AtColumn = ( this.data.column_headings.length - Count ); }

		// Clear columns.
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			for ( let col_index = 0; col_index < Count; col_index++ )
			{
				this.SetValue( LIB_UTILS.clone( this.options.blank_value ), row_index, AtColumn + col_index );
			}
		}

		// Return, OK.
		return;
	};

