"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `14) Datatable Rows Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `DeleteRows()				- Delete all rows.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteRows();
				LIB_ASSERT.equal( datatable.RowCount(), 0, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `DeleteRows( 1 )				- Delete the first row.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteRows( 1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize - 1, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), LIB_TEST.MatrixSize, 'mismatched value at (0, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `DeleteRows( 1, 0 )			- Delete the first row.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteRows( 1, 0 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize - 1, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), LIB_TEST.MatrixSize, 'mismatched value at (0, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `DeleteRows( 3, 2 )			- Delete three rows starting at row index 2.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteRows( 3, 2 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize - 3, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 0 ), ( LIB_TEST.MatrixSize * 5 ), 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `DeleteRows( 3, -1 )			- Delete the last three rows.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteRows( 3, -1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize - 3, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize - 4, 0 ), 896, 'mismatched value (-3, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearRows()					- Clears all rows.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearRows();
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize - 1, LIB_TEST.MatrixSize - 1 ), datatable.options.blank_value, 'mismatched value at (-1, -1)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearRows( 1 )				- Clears the first row.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearRows( 1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.MatrixSize - 1 ), datatable.options.blank_value, 'mismatched value at (-1, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearRows( 1, 0 )			- Clears the first row.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearRows( 1, 0 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.MatrixSize - 1 ), datatable.options.blank_value, 'mismatched value at (-1, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearRows( 3, 2 )			- Clears three rows starting at row index 2.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearRows( 3, 2 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 0 ), datatable.options.blank_value, 'mismatched value at (2, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 4, 0 ), datatable.options.blank_value, 'mismatched value at (4, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 5, 0 ), 160, 'mismatched value at (5, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearRows( 3, -1 )			- Clears the last three rows.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearRows( 3, -1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize - 1, 0 ), datatable.options.blank_value, 'mismatched value at (-1, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize - 2, 0 ), datatable.options.blank_value, 'mismatched value at (-2, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize - 3, 0 ), datatable.options.blank_value, 'mismatched value at (-3, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankRows()			- Insert a single blank row to the beginning.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankRows();
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize + 1, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize, 0 ), 992, 'mismatched value at (0, -1)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankRows( 3 )		- Insert three blank rows to the beginning.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankRows( 3 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize + 3, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 0 ), datatable.options.blank_value, 'mismatched value at (2, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize + 2, 0 ), 992, 'mismatched value at (-1, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankRows( 3, 0 )		- Insert three blank rows to the beginning.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankRows( 3, 0 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize + 3, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 0 ), datatable.options.blank_value, 'mismatched value at (2, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize + 2, 0 ), 992, 'mismatched value at (-1, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankRows( 3, 5 )		- Insert three blank rows at row index 5.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankRows( 3, 5 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize + 3, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 5, 0 ), datatable.options.blank_value, 'mismatched value at (5, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 7, 0 ), datatable.options.blank_value, 'mismatched value at (7, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize + 2, 0 ), 992, 'mismatched value at (-1, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankRows( 3, -1 )		- Insert three blank rows at the end.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankRows( 3, -1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize + 3, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize, 0 ), datatable.options.blank_value, 'mismatched value at (-3, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize + 1, 0 ), datatable.options.blank_value, 'mismatched value at (-2, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize + 2, 0 ), datatable.options.blank_value, 'mismatched value at (-1, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.MatrixSize + 2, LIB_TEST.MatrixSize - 1 ), datatable.options.blank_value, 'mismatched value at (-1, -1)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should insert blank rows`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankRows( 10 );
				LIB_ASSERT.equal( datatable.RowCount(), 10, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 0, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should insert data rows`,
			async function ()
			{
				let test_rows =
					[
						[ 1, 2, 3 ],
						[ 4, 5, 6 ],
						[ 7, 8, 9 ],
					];
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertRows( test_rows );
				LIB_ASSERT.equal( datatable.RowCount(), 3, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 3, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 2 ), 9, 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should insert data rows and columns when setting a value`,
			async function ()
			{
				let test_value = '9';
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( test_value, 2, 2 );
				LIB_ASSERT.equal( datatable.RowCount(), 3, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 3, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 2 ), test_value, 'mismatched value' );
				return;
			} );


	} );
