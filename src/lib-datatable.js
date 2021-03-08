"use strict";


// const LIB_UTILS = require( './lib-utils.js' );
const LIB_DATATABLE_TABLE = require( './datatable-table.js' );
const LIB_DATATABLE_SHAPING = require( './datatable-shaping.js' );
const LIB_DATATABLE_CELLS = require( './datatable-cells.js' );
const LIB_DATATABLE_COLUMNS = require( './datatable-columns.js' );
const LIB_DATATABLE_ROWS = require( './datatable-rows.js' );


//=====================================================================
//=====================================================================
//
//		LIBRARY CONSTRUCTOR FUNCTIONS
//
//=====================================================================
//=====================================================================


//=====================================================================
//=====================================================================
//
//		NEW DATATABLE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
function NewDatatable()
{

	//---------------------------------------------------------------------
	// Create a new DataTable Object.
	let datatable =
	{

		//---------------------------------------------------------------------
		options:
		{
			blank_value: null,
			blank_row: [],
		},


		//---------------------------------------------------------------------
		data:
		{
			row_base: 0,
			col_base: 0,
			rows: [],
			column_headings: [],
			column_infos: [],
		},


		//=====================================================================
		//=====================================================================
		//
		//		ADDRESSING
		//
		//=====================================================================
		//=====================================================================

		// RowBase: LIB_DATATABLE_ADDRESSING.RowBase,
		// ColBase: LIB_DATATABLE_ADDRESSING.ColBase,


		//=====================================================================
		//=====================================================================
		//
		//		TABLE FUNCTIONS
		//
		//=====================================================================
		//=====================================================================

		RowCount: LIB_DATATABLE_TABLE.RowCount,
		ColumnCount: LIB_DATATABLE_TABLE.ColumnCount,
		SetSize: LIB_DATATABLE_TABLE.SetSize,

		ToMatrix: LIB_DATATABLE_TABLE.ToMatrix,
		GetMatrix: LIB_DATATABLE_TABLE.GetMatrix,
		SetMatrix: LIB_DATATABLE_TABLE.SetMatrix,

		ToObjects: LIB_DATATABLE_TABLE.ToObjects,
		FromObjects: LIB_DATATABLE_TABLE.FromObjects,


		//=====================================================================
		//=====================================================================
		//
		//		SHAPING FUNCTIONS
		//
		//=====================================================================
		//=====================================================================

		TransposeTable: LIB_DATATABLE_SHAPING.TransposeTable,
		// UnionTable: LIB_DATATABLE_TABLE.UnionTable,
		// IntersectTable: LIB_DATATABLE_TABLE.IntersectTable,
		// SortTable: LIB_DATATABLE_TABLE.SortTable,
		// FilterTable: LIB_DATATABLE_TABLE.FilterTable,


		//=====================================================================
		//=====================================================================
		//
		//		CELL FUNCTIONS
		//
		//=====================================================================
		//=====================================================================

		RowCol: LIB_DATATABLE_CELLS.RowCol,
		GetValue: LIB_DATATABLE_CELLS.GetValue,
		SetValue: LIB_DATATABLE_CELLS.SetValue,


		//=====================================================================
		//=====================================================================
		//
		//		COLUMN FUNCTIONS
		//
		//=====================================================================
		//=====================================================================

		DeleteColumns: LIB_DATATABLE_COLUMNS.DeleteColumns,
		ClearColumns: LIB_DATATABLE_COLUMNS.ClearColumns,
		InsertBlankColumns: LIB_DATATABLE_COLUMNS.InsertBlankColumns,
		ColumnHeading: LIB_DATATABLE_COLUMNS.ColumnHeading,
		ColumnInfo: LIB_DATATABLE_COLUMNS.ColumnInfo,


		//=====================================================================
		//=====================================================================
		//
		//		ROW FUNCTIONS
		//
		//=====================================================================
		//=====================================================================

		ToObject: LIB_DATATABLE_ROWS.ToObject,
		DeleteRows: LIB_DATATABLE_ROWS.DeleteRows,
		ClearRows: LIB_DATATABLE_ROWS.ClearRows,
		InsertBlankRows: LIB_DATATABLE_ROWS.InsertBlankRows,
		InsertRows: LIB_DATATABLE_ROWS.InsertRows,


	};


	// Return the DataTable Object.
	return datatable;
};
exports.NewDatatable = NewDatatable;


//=====================================================================
//=====================================================================
//
//		NEW BLANK DATATABLE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.NewBlankDatatable =
	function NewBlankDatatable( RowCount, ColumnCount )
	{
		let table = NewDatatable();
		table.SetValue( table.blank_value, RowCount - 1, ColumnCount - 1 );
		return table;
	};


//=====================================================================
//=====================================================================
//
//		FROM MATRIX
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.FromMatrix =
	function FromMatrix( Matrix )
	{
		let table = NewDatatable();
		table.SetMatrix( Matrix, 0, 0 );
		return table;
	};


//=====================================================================
//=====================================================================
//
//		FROM OBJECTS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.FromObjects =
	function FromObjects( Objects )
	{
		let table = NewDatatable();
		table.FromObjects( Objects );
		return table;
	};


//=====================================================================
//=====================================================================
//
//		Library Integration
//
//=====================================================================
//=====================================================================


if ( typeof define === 'function' && define.amd )
{
	// AMD Loader
	define( function ()
	{
		'use strict';
		return exports;
	} );

} else if ( typeof module !== 'undefined' && module.exports )
{
	// CommonJS/nodeJS Loader
	module.exports = exports;

} else if ( typeof window !== 'undefined' )
{
	// CommonJS/nodeJS Loader
	window.LibDatatable = exports;

} else
{
	// Regular Browser loader
	root.LibDatatable = exports;
}
