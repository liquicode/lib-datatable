"use strict";


const LIB_UTILS = require( './lib-utils.js' );
const LIB_DATATABLE_CELLS = require( './datatable-cells.js' );
const LIB_DATATABLE_ROWS = require( './datatable-rows.js' );
const LIB_DATATABLE_COLUMNS = require( './datatable-columns.js' );
const LIB_DATATABLE_TABLE = require( './datatable-table.js' );


exports._docs = [];
exports.NewDatatable = NewDatatable;
exports.NewBlankDatatable = NewBlankDatatable;
exports.FromMatrix = FromMatrix;


//---------------------------------------------------------------------
exports._docs.push(
	{
		category: "Datatable Creation",
		type: "narrative",
		description: `
		Functions to create instances of a Datatable.
		`
	}
);


//=====================================================================
//=====================================================================
//
//		NEW DATATABLE
//
//=====================================================================
//=====================================================================
exports._docs.push(
	{
		category: "Datatable Creation",
		type: "function",
		name: "NewDatatable()",

		returns:
			[
				{ name: "Datatable", type: "object", desc: "A new Datatable." },
			],

		description: `
			Creates an empty Datatable with zero rows and zero columns.
			`,

		invocations:
			[
				{ code: "NewDatatable()", desc: "Returns a new Datatable." },
			],
	} );
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
		DeleteRows: LIB_DATATABLE_ROWS.DeleteRows,
		ClearRows: LIB_DATATABLE_ROWS.ClearRows,
		InsertBlankRows: LIB_DATATABLE_ROWS.InsertBlankRows,
		InsertRows: LIB_DATATABLE_ROWS.InsertRows,


		//=====================================================================
		//=====================================================================
		//
		//		COLUMN MANIPULATION
		//
		//=====================================================================
		//=====================================================================

		ColumnCount: LIB_DATATABLE_COLUMNS.ColumnCount,
		DeleteColumns: LIB_DATATABLE_COLUMNS.DeleteColumns,
		ClearColumns: LIB_DATATABLE_COLUMNS.ClearColumns,
		InsertBlankColumns: LIB_DATATABLE_COLUMNS.InsertBlankColumns,


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


		/*
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
		_insert_blank_rows: function _insert_blank_rows( AtRow, Count ) { return this.InsertBlankRows( Count, AtRow ); },
		_insert_rows: function _insert_rows( AtRow, Matrix ) { return this.InsertRows( Matrix, AtRow ); },
		_delete_rows: function _delete_rows( AtRow, Count ) { return this.DeleteRows( Count, AtRow ); },
		_clear_rows: function _clear_rows( AtRow, Count ) { return this.ClearRows( Count, AtRow ); },
	
		// COLUMN MANIPULATION
		_column_count: function _column_count() { return this.RowCount(); },
		_insert_blank_columns: function _insert_blank_columns( AtColumn, Count ) { return this.InsertBlankColumns( Count, AtColumn ); },
		_insert_columns: function _insert_columns( AtColumn, Matrix ) { return this.InsertRows( Matrix, AtColumn ); },
		_delete_columns: function _delete_columns( AtColumn, Count ) { return this.DeleteRows( Count, AtColumn ); },
		_clear_columns: function _clear_columns( AtColumn, Count ) { return this.ClearRows( Count, AtColumn ); },
		*/

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
exports._docs.push(
	{
		category: "Datatable Creation",
		type: "function",
		name: "NewBlankDatatable( RowCount, ColumnCount )",

		parameters:
			[
				{ name: "RowCount", type: "number", reqd: true, desc: "The number of rows for the new Datatable." },
				{ name: "ColumnCount", type: "number", reqd: true, desc: "The number of columns for the new Datatable." },
			],

		returns:
			[
				{ name: "Datatable", type: "object", desc: "A new Datatable." },
			],

		description: `
			Creates an empty Datatable with the requested rows and columns.
			`,

		invocations:
			[
				{ code: "NewBlankDatatable( 10, 10 )", desc: "Returns a new Datatable with 10 rows and 10 columns." },
			],
	} );
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
exports._docs.push(
	{
		category: "Datatable Creation",
		type: "function",
		name: "FromMatrix( Matrix )",

		parameters:
			[
				{ name: "Matrix", type: "number", reqd: true, desc: "The matrix of values for the new Datatable." },
			],

		returns:
			[
				{ name: "Datatable", type: "object", desc: "A new Datatable." },
			],

		description: `
			Creates a Datatable populates with values from the given Matrix.
			The Datatable will have the same number of rows and columns as Matrix.
			`,

		invocations:
			[
				{ code: "FromMatrix( Matrix )", desc: "Returns a new Datatable with data from Matrix." },
			],
	} );
//---------------------------------------------------------------------
function FromMatrix( Matrix )
{
	let table = NewDatatable();
	table.SetMatrix( Matrix, 0, 0 );
	return table;
};


/*
if ( typeof define === 'function' && define.amd )
{
	// AMD Loader
	define( function ()
	{
		'use strict';
		return showdown;
	} );

} else if ( typeof module !== 'undefined' && module.exports )
{
	// CommonJS/nodeJS Loader
	module.exports = showdown;

} else
{
	// Regular Browser loader
	root.showdown = showdown;
}
*/
