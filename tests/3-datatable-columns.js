"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `Datatable Columns Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `DeleteColumns()				- Delete all columns.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteColumns();
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 0, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `DeleteColumns( 1 )				- Delete the first column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteColumns( 1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize - 1, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 1, 'mismatched value at (0, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `DeleteColumns( 1, 0 )			- Delete the first column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteColumns( 1, 0 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize - 1, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 1, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `DeleteColumns( 3, 2 )			- Delete three columns starting at column index 2.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteColumns( 3, 2 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize - 3, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 2 ), 5, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `DeleteColumns( 3, -1 )			- Delete the last three columns.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.DeleteColumns( 3, -1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize - 3, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.TestMatrixSize - 4 ), 28, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearColumns()					- Clears all columns.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearColumns();
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.TestMatrixSize - 1, LIB_TEST.TestMatrixSize - 1 ), datatable.options.blank_value, 'mismatched value at (-1, -1)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearColumns( 1 )				- Clears the first column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearColumns( 1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.TestMatrixSize - 1, 0 ), datatable.options.blank_value, 'mismatched value at (-1, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearColumns( 1, 0 )			- Clears the first column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearColumns( 1, 0 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( LIB_TEST.TestMatrixSize - 1, 0 ), datatable.options.blank_value, 'mismatched value at (-1, 0)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearColumns( 3, 2 )			- Clears three columns starting at column index 2.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearColumns( 3, 2 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 2 ), datatable.options.blank_value, 'mismatched value at (0, 2)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 4 ), datatable.options.blank_value, 'mismatched value at (0, 4)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 5 ), 5, 'mismatched value at (0, 5)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `ClearColumns( 3, -1 )			- Clears the last three columns.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'sanity check' );
				datatable.ClearColumns( 3, -1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.TestMatrixSize - 1 ), datatable.options.blank_value, 'mismatched value at (0, -1)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.TestMatrixSize - 2 ), datatable.options.blank_value, 'mismatched value at (0, -2)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.TestMatrixSize - 3 ), datatable.options.blank_value, 'mismatched value at (0, -3)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankColumns()			- Insert a single blank column to the beginning.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankColumns();
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize + 1, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.TestMatrixSize ), LIB_TEST.TestMatrixSize - 1, 'mismatched value at (0, -1)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankColumns( 3 )		- Insert three blank columns to the beginning.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankColumns( 3 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize + 3, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 2 ), datatable.options.blank_value, 'mismatched value at (0, 2)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.TestMatrixSize + 2 ), LIB_TEST.TestMatrixSize - 1, 'mismatched value at (0, -1)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankColumns( 3, 0 )		- Insert three blank columns to the beginning.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankColumns( 3, 0 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize + 3, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), datatable.options.blank_value, 'mismatched value at (0, 0)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 2 ), datatable.options.blank_value, 'mismatched value at (0, 2)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.TestMatrixSize + 2 ), LIB_TEST.TestMatrixSize - 1, 'mismatched value at (0, -1)' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `InsertBlankColumns( 3, 5 )		- Insert three blank columns at column index 5.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.InsertBlankColumns( 3, 5 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.TestMatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.TestMatrixSize + 3, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 5 ), datatable.options.blank_value, 'mismatched value at (0, 5)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 7 ), datatable.options.blank_value, 'mismatched value at (0, 7)' );
				LIB_ASSERT.equal( datatable.GetValue( 0, LIB_TEST.TestMatrixSize + 2 ), LIB_TEST.TestMatrixSize - 1, 'mismatched value at (0, -1)' );
				return;
			} );


	} );
