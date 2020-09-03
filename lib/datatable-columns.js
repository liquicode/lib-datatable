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
exports.InsertBlankColumns =
	function InsertBlankColumns( Count, AtColumn )
	{
		throw new Error( 'Not Implemented' );
	};


//---------------------------------------------------------------------
exports.InsertColumns =
	function InsertColumns( Matrix, AtColumn )
	{
		throw new Error( 'Not Implemented' );
	};


//---------------------------------------------------------------------
exports.DeleteColumns =
	function DeleteColumns( Count, AtColumn )
	{
		throw new Error( 'Not Implemented' );
	};


//---------------------------------------------------------------------
exports.ClearColumns =
	function ClearColumns( Count, AtColumn )
	{
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			for ( let col_index = 0; col_index < Count; col_index++ )
			{
				this.SetValue( LIB_UTILS.clone( this.options.blank_value ), row_index, AtColumn + col_index );
			}
		}
		return;
	};

