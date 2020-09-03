"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		TABLE MANIPULATION
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.TransposeTable =
	function TransposeTable()
	{
		// Create the new column_headings.
		let new_cols = [];
		for ( let index = 0; index < this.rows.length; index++ )
		{ new_cols.push( '' ); }

		// Create the new rows.
		let new_rows = [];
		for ( let col_index = 0; col_index < this.column_headings.length; col_index++ )
		{
			let new_row = [];
			for ( let row_index = 0; row_index < this.rows.length; row_index++ )
			{
				new_row.push( this.GetValue( row_index, col_index ) );
			}
			new_rows.push( new_row );
		}

		// Set the new table.
		this.column_headings = new_cols;
		this.rows = new_rows;

		// Return, OK.
		return;
	};


// //---------------------------------------------------------------------
// exports.UnionTable =
// 	function UnionTable( OtherTable, SourceKeyColumn, OtherKeyColumn )
// 	{
// 		throw new Error( 'Not Implemented' );
// 	};


// //---------------------------------------------------------------------
// exports.IntersectTable =
// 	function IntersectTable( OtherTable )
// 	{
// 		throw new Error( 'Not Implemented' );
// 	};


// //---------------------------------------------------------------------
// exports.SortTable =
// 	function SortTable( AtColumn, SortDirection, ComparisonFunction )
// 	{
// 		throw new Error( 'Not Implemented' );
// 	};


// //---------------------------------------------------------------------
// exports.FilterTable =
// 	function FilterTable( FilterFunction )
// 	{
// 		throw new Error( 'Not Implemented' );
// 	};


//---------------------------------------------------------------------
exports.GetMatrix =
	function GetMatrix( FromRow, FromColumn, ToRow, ToColumn )
	{
		// Copy values.
		let sub_rows = [];
		for ( let row_index = FromRow; row_index <= ToRow; row_index++ )
		{
			let new_row = [];
			for ( let col_index = FromColumn; col_index <= ToColumn; col_index++ )
			{
				let value = this.GetValue( row_index, col_index );
				new_row.push( value );
			}
			sub_rows.push( new_row );
		}

		// Return, OK.
		return sub_rows;
	};


//---------------------------------------------------------------------
exports.SetMatrix =
	function SetMatrix( Matrix, ToRow, ToColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( ToRow ) ) { ToRow = 0; }
		if ( LIB_UTILS.value_missing( ToColumn ) ) { ToColumn = 0; }

		// Copy values.
		for ( let row_index = 0; row_index < Matrix.length; row_index++ )
		{
			let from_row = Matrix[ row_index ];
			for ( let col_index = 0; col_index < from_row.length; col_index++ )
			{
				let value = from_row[ col_index ];
				this.SetValue( value, ToRow + row_index, ToColumn + col_index );
			}
		}

		// Return, OK.
		return;
	};


