"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `15) Datatable Table Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `should create table from matrix`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'mismatched value at ( 0, 0 )' );
				LIB_ASSERT.equal( datatable.GetValue( 1, 1 ), 1, 'mismatched value at ( 1, 1 )' );
				LIB_ASSERT.equal( datatable.GetValue( 1, 2 ), 2, 'mismatched value at ( 1, 2 )' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 1 ), 2, 'mismatched value at ( 2, 1 )' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 2 ), 4, 'mismatched value at ( 2, 2 )' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should create table from a partial matrix`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.PartialCountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'mismatched value at ( 0, 0 )' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 1 ), datatable.blank_value, 'mismatched value at ( 0, 1 )' );
				LIB_ASSERT.equal( datatable.GetValue( 1, 0 ), 1, 'mismatched value at ( 1, 0 )' );
				LIB_ASSERT.equal( datatable.GetValue( 1, 1 ), 2, 'mismatched value at ( 1, 1 )' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should transpose a table`,
			async function ()
			{
				let datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.notEqual( datatable, null );
				datatable.TransposeTable();
				LIB_ASSERT.equal( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
				LIB_ASSERT.equal( datatable.GetValue( 0, 0 ), 0, 'mismatched value at ( 0, 0 )' );
				LIB_ASSERT.equal( datatable.GetValue( 1, 1 ), 33, 'mismatched value at ( 1, 1 )' );
				LIB_ASSERT.equal( datatable.GetValue( 1, 2 ), 65, 'mismatched value at ( 1, 2 )' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 1 ), 34, 'mismatched value at ( 2, 1 )' );
				LIB_ASSERT.equal( datatable.GetValue( 2, 2 ), 66, 'mismatched value at ( 2, 2 )' );
				return;
			} );


	} );
