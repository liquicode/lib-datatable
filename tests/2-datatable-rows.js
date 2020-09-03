"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `Datatable Rows Tests`,
	function ()
	{


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
