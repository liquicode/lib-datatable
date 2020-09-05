"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `Datatable Cells Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `GetValue()					- Gets the value at the first row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				let value = datatable.GetValue();
				LIB_ASSERT.equal( value, 0, 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetValue( 0 )				- Gets the value at the first row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				let value = datatable.GetValue( 0 );
				LIB_ASSERT.equal( value, 0, 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetValue( 0, 0 )			- Gets the value at the first row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				let value = datatable.GetValue( 0, 0 );
				LIB_ASSERT.equal( value, 0, 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetValue( 1, 1 )			- Gets the value at the second row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				let value = datatable.GetValue( 1, 1 );
				LIB_ASSERT.equal( value, 1, 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetValue( -1, -1 )			- Gets the value at the last row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				let value = datatable.GetValue( -1, -1 );
				LIB_ASSERT.equal( value, ( ( LIB_TEST.MatrixSize - 1 ) * ( LIB_TEST.MatrixSize - 1 ) ), 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetValue( -2, -2 )			- Gets the value at the second to last row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				let value = datatable.GetValue( -2, -2 );
				LIB_ASSERT.equal( value, ( ( LIB_TEST.MatrixSize - 2 ) * ( LIB_TEST.MatrixSize - 2 ) ), 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `GetValue( 99, 99 )			- Getting the value of a nonexistent cell returns options.blank_value.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				let value = datatable.GetValue( 99, 99 );
				LIB_ASSERT.equal( value, datatable.blank_value, 'mismatched value' );
				LIB_ASSERT.equal( datatable.RowCount(), 0, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 0, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `SetValue()					- Sets a blank value at the first row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue();
				LIB_ASSERT.equal( datatable.RowCount(), 1, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 1, 'mismatched column count' );
				let value = datatable.GetValue();
				LIB_ASSERT.equal( value, datatable.options.blank_value, 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `SetValue( 'Hello' )		- Sets the value at the first row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( 'Hello' );
				LIB_ASSERT.equal( datatable.RowCount(), 1, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 1, 'mismatched column count' );
				let value = datatable.GetValue();
				LIB_ASSERT.equal( value, 'Hello', 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `SetValue( 'Hello', 0 )		- Sets the value at the first row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( 'Hello', 0 );
				LIB_ASSERT.equal( datatable.RowCount(), 1, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 1, 'mismatched column count' );
				let value = datatable.GetValue( 0 );
				LIB_ASSERT.equal( value, 'Hello', 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `SetValue( 'Hello', 0, 0 )	- Sets the value at the first row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( 'Hello', 0, 0 );
				LIB_ASSERT.equal( datatable.RowCount(), 1, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 1, 'mismatched column count' );
				let value = datatable.GetValue( 0, 0 );
				LIB_ASSERT.equal( value, 'Hello', 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `SetValue( 'Hello', 1, 1 )	- Sets the value at the second row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( 'Hello', 1, 1 );
				LIB_ASSERT.equal( datatable.RowCount(), 2, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 2, 'mismatched column count' );
				let value = datatable.GetValue( 1, 1 );
				LIB_ASSERT.equal( value, 'Hello', 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `SetValue( 'Hello', -1, -1 )	- Sets the value at the last row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( 'Hello', -1, -1 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				let value = datatable.GetValue( -1, -1 );
				LIB_ASSERT.equal( value, 'Hello', 'mismatched value' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `SetValue( 'Hello', -2, -2 )	- Sets the value at the second to last row and column.`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( 'Hello', -2, -2 );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				let value = datatable.GetValue( -2, -2 );
				LIB_ASSERT.equal( value, 'Hello', 'mismatched value' );
				return;
			} );


	} );
