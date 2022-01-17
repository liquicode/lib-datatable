"use strict";


// const LIB_UTILS = require( './lib-utils.js' );
const LIB_DATATABLE_TABLE = require( './datatable-table.js' );
const LIB_DATATABLE_SHAPING = require( './datatable-shaping.js' );
const LIB_DATATABLE_CELLS = require( './datatable-cells.js' );
const LIB_DATATABLE_COLUMNS = require( './datatable-columns.js' );
const LIB_DATATABLE_ROWS = require( './datatable-rows.js' );
const LIB_DATATABLE_CALCULATED = require( './datatable-calculated.js' );


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
		INVALID_VALUE: { invalid: true },


		//---------------------------------------------------------------------
		options:
		{
			blank_value: null,
			blank_row: [],
			auto_calculate: false,
		},


		//---------------------------------------------------------------------
		data:
		{
			row_base: 0,
			col_base: 0,
			rows: [],
			columns: [],
			// column_headings: [],
			// column_infos: [],
		},


		//---------------------------------------------------------------------
		IsDatatable: true,


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
		//		CONSTRUCTOR FUNCTIONS
		//
		//=====================================================================
		//=====================================================================

		NewDatatable: NewDatatable,
		NewBlankDatatable: NewBlankDatatable,
		NewDatatableFromMatrix: NewDatatableFromMatrix,
		NewDatatableFromObjects: NewDatatableFromObjects,


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

		Clone: LIB_DATATABLE_TABLE.Clone,


		//=====================================================================
		//=====================================================================
		//
		//		SHAPING FUNCTIONS
		//
		//=====================================================================
		//=====================================================================

		TransposeTable: LIB_DATATABLE_SHAPING.TransposeTable,
		AppendTable: LIB_DATATABLE_SHAPING.AppendTable,
		JoinTable: LIB_DATATABLE_SHAPING.JoinTable,
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
		ColumnID: LIB_DATATABLE_COLUMNS.ColumnID,
		ColumnTitle: LIB_DATATABLE_COLUMNS.ColumnTitle,
		ColumnTitles: LIB_DATATABLE_COLUMNS.ColumnTitles,
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


		//=====================================================================
		//=====================================================================
		//
		//		CALCULATED COLUMNS
		//
		//=====================================================================
		//=====================================================================

		// AutoCalculate: LIB_DATATABLE_CALCULATED.AutoCalculate,
		// ColumnCalculation: LIB_DATATABLE_CALCULATED.ColumnCalculation,
		// Invalidate: LIB_DATATABLE_CALCULATED.Invalidate,
		// CalculateColumn: LIB_DATATABLE_CALCULATED.CalculateColumn,
		// CalculateTable: LIB_DATATABLE_CALCULATED.CalculateTable,


	};


	// Return the DataTable Object.
	return datatable;
};


//=====================================================================
//=====================================================================
//
//		NEW BLANK DATATABLE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
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
function NewDatatableFromMatrix( Matrix )
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
function NewDatatableFromObjects( Objects )
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

exports.NewDatatable = NewDatatable;
exports.NewBlankDatatable = NewBlankDatatable;
exports.NewDatatableFromMatrix = NewDatatableFromMatrix;
exports.NewDatatableFromObjects = NewDatatableFromObjects;

// For backward compatibility.
exports.FromMatrix = NewDatatableFromMatrix;
exports.FromObjects = NewDatatableFromObjects;


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
