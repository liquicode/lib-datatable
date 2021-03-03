"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		SHAPING FUNCTIONS
//
//=====================================================================
//=====================================================================


//=====================================================================
//=====================================================================
//
//		TRANSPOSE TABLE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.TransposeTable =
	function TransposeTable()
	{
		// Create the new column_headings.
		let new_column_headings = [];
		let new_column_infos = [];
		for ( let index = 0; index < this.data.rows.length; index++ )
		{
			new_column_headings.push( '' );
			new_column_infos.push( {} );
		}

		// Create the new rows.
		let new_rows = [];
		for ( let col_index = 0; col_index < this.data.column_headings.length; col_index++ )
		{
			let new_row = [];
			for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
			{
				new_row.push( this.GetValue( row_index, col_index ) );
			}
			new_rows.push( new_row );
		}

		// Set the new table.
		this.data.column_headings = new_column_headings;
		this.data.column_infos = new_column_infos;
		this.data.rows = new_rows;

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		TODO
//
//=====================================================================
//=====================================================================


// //---------------------------------------------------------------------
// exports.JoinTable =
// 	function JoinTable( OtherTable, SourceKeyColumn, OtherKeyColumn, JoinBehavior )
// 	{
// 		JoinContext = left | right | both
// 		JoinFunction = inner | outer | both
//
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
// exports.ScanTable =
// 	function ScanTable( ScanFunction )
// 	{
// 		throw new Error( 'Not Implemented' );
// 	};


