"use strict";


const LIB_UTILS = require( './lib-utils.js' );
const LIB_DATATABLE_CELLS = require( './datatable-cells.js' );
const LIB_DATATABLE_ROWS = require( './datatable-rows.js' );
const LIB_DATATABLE_COLUMNS = require( './datatable-columns.js' );
const LIB_DATATABLE_TABLE = require( './datatable-table.js' );


exports.NewDatatable = NewDatatable;
exports.BlankTable = BlankTable;
exports.FromMatrix = FromMatrix;


//=====================================================================
//=====================================================================
//
//		NewDatatable
//
//=====================================================================
//=====================================================================


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
			column_headings: [],
			rows: [],
		},

		
		//=====================================================================
		//=====================================================================
		//
		//		CELL VALUE
		//
		//=====================================================================
		//=====================================================================

		GetValue: LIB_DATATABLE_CELLS.GetValue,
		SetValue: LIB_DATATABLE_CELLS.SetValue,


		//=====================================================================
		//=====================================================================
		//
		//		ROW MANIPULATION
		//
		//=====================================================================
		//=====================================================================

		RowCount: LIB_DATATABLE_ROWS.RowCount,
		InsertBlankRows: LIB_DATATABLE_ROWS.InsertBlankRows,
		InsertRows: LIB_DATATABLE_ROWS.InsertRows,
		DeleteRows: LIB_DATATABLE_ROWS.DeleteRows,
		ClearRows: LIB_DATATABLE_ROWS.ClearRows,


		//=====================================================================
		//=====================================================================
		//
		//		COLUMN MANIPULATION
		//
		//=====================================================================
		//=====================================================================

		ColumnCount: LIB_DATATABLE_COLUMNS.ColumnCount,
		InsertBlankColumns: LIB_DATATABLE_COLUMNS.InsertBlankColumns,
		InsertColumns: LIB_DATATABLE_COLUMNS.InsertColumns,
		DeleteColumns: LIB_DATATABLE_COLUMNS.DeleteColumns,
		ClearColumns: LIB_DATATABLE_COLUMNS.ClearColumns,


		//=====================================================================
		//=====================================================================
		//
		//		TABLE MANIPULATION
		//
		//=====================================================================
		//=====================================================================

		TransposeTable: LIB_DATATABLE_TABLE.TransposeTable,
		// UnionTable: LIB_DATATABLE_TABLE.UnionTable,
		// IntersectTable: LIB_DATATABLE_TABLE.IntersectTable,
		// SortTable: LIB_DATATABLE_TABLE.SortTable,
		// FilterTable: LIB_DATATABLE_TABLE.FilterTable,
		GetMatrix: LIB_DATATABLE_TABLE.GetMatrix,
		SetMatrix: LIB_DATATABLE_TABLE.SetMatrix,


		//=====================================================================
		//=====================================================================
		//
		//		STRICT INTERFACE
		//
		//=====================================================================
		//=====================================================================

		// CELL VALUE
		_get_value: function _get_value( AtRow, AtColumn ) { return this.GetValue( AtRow, AtColumn ); },
		_set_value: function _set_value( AtRow, AtColumn, Value ) { return this.SetValue( Value, AtRow, AtColumn ); },

		// ROW MANIPULATION
		_row_count: function _row_count() { return this.RowCount(); },
		_insert_blank_rows: function _insert_blank_rows( AtRow, Count ) { return this.InsertBlankRows( AtRow, Count ); },
		_insert_rows: function _insert_rows( AtRow, Matrix ) { return this.InsertRows( Matrix, AtRow ); },
		_delete_rows: function _delete_rows( AtRow, Count ) { return this.DeleteRows( Count, AtRow ); },
		_clear_rows: function _clear_rows( AtRow, Count ) { return this.ClearRows( Count, AtRow ); },

		// COLUMN MANIPULATION
		_column_count: function _column_count() { return this.RowCount(); },
		_insert_blank_columns: function _insert_blank_columns( AtColumn, Count ) { return this.InsertBlankRows( Count, AtColumn ); },
		_insert_columns: function _insert_columns( AtColumn, Matrix ) { return this.InsertRows( Matrix, AtColumn ); },
		_delete_columns: function _delete_columns( AtColumn, Count ) { return this.DeleteRows( Count, AtColumn ); },
		_clear_columns: function _clear_columns( AtColumn, Count ) { return this.ClearRows( Count, AtColumn ); },

	};


	// Return the DataTable Object.
	return datatable;
};


//=====================================================================
//=====================================================================
//
//		BlankTable
//
//=====================================================================
//=====================================================================


function BlankTable( RowCount, ColumnCount )
{
	let table = NewDatatable();
	table.SetValue( table.blank_value, RowCount - 1, ColumnCount - 1 );
	return table;
};


//=====================================================================
//=====================================================================
//
//		FromMatrix
//
//=====================================================================
//=====================================================================


function FromMatrix( Matrix )
{
	let table = NewDatatable();
	table.SetMatrix( Matrix, 0, 0 );
	return table;
};
