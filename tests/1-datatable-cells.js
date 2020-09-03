"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `Datatable Cells Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		it( `should get a nonexistent cell`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				let value = datatable.GetValue( 9, 9 );
				LIB_ASSERT.equal( value, datatable.blank_value, 'mismatched value' );
				LIB_ASSERT.equal( datatable.RowCount(), 0, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 0, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should set a value`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( 'Hello, World!', 9, 9 );
				LIB_ASSERT.equal( datatable.GetValue( 9, 9 ), 'Hello, World!', 'mismatched value' );
				LIB_ASSERT.equal( datatable.RowCount(), 10, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 10, 'mismatched column count' );
				return;
			} );


		//---------------------------------------------------------------------
		it( `should set several values`,
			async function ()
			{
				let datatable = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.notEqual( datatable, null );
				datatable.SetValue( 'two', 5, 5 );
				datatable.SetValue( 'three', 3, 4 );
				datatable.SetValue( 'one', 9, 9 );
				LIB_ASSERT.equal( datatable.GetValue( 9, 9 ), 'one', 'mismatched value' );
				LIB_ASSERT.equal( datatable.GetValue( 5, 5 ), 'two', 'mismatched value' );
				LIB_ASSERT.equal( datatable.GetValue( 3, 4 ), 'three', 'mismatched value' );
				LIB_ASSERT.equal( datatable.RowCount(), 10, 'mismatched row count' );
				LIB_ASSERT.equal( datatable.ColumnCount(), 10, 'mismatched column count' );
				return;
			} );


	} );
