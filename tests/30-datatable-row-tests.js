"use strict";


const LibDatatable = require( '../src/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `30) Datatable Rows Tests`,
	function ()
	{

		//---------------------------------------------------------------------
		let Datatable = null;


		//---------------------------------------------------------------------
		beforeEach(
			function ()
			{
				Datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.CountMatrix );
				LIB_ASSERT.ok( Datatable, `Datatable failed to create.` );
				return;
			} );


		//---------------------------------------------------------------------
		afterEach(
			function ()
			{
				Datatable = null;
				return;
			} );


		//---------------------------------------------------------------------
		describe( `DeleteRows( Count, AtRow )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: DeleteRows()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.DeleteRows(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single parameter: DeleteRows( 1 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.DeleteRows( 1 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can delete a single row: DeleteRows( 1, 0 )`,
					async function ()
					{
						Datatable.DeleteRows( 1, 0 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize - 1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 32 * 1 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can delete multiple rows: DeleteRows( 3, 2 )`,
					async function ()
					{
						Datatable.DeleteRows( 3, 2 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize - 3 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 32 * 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 1, 0 ), 32 * 1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 2, 0 ), 32 * 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can delete rows from the end: DeleteRows( 3, -3 )`,
					async function ()
					{
						Datatable.DeleteRows( 3, -3 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize - 3 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, 0 ), 32 * 28 );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `ClearRows( Count, AtRow )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: ClearRows()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.ClearRows(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single parameter: ClearRows( 1 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.DeleteRows( 1 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can clear a single row: ClearRows( 1, 0 )`,
					async function ()
					{
						Datatable.ClearRows( 1, 0 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, -1 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 1, 0 ), 32 * 1 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can clear multiple rows: ClearRows( 3, 2 )`,
					async function ()
					{
						Datatable.ClearRows( 3, 2 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 32 * 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 1, 0 ), 32 * 1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 2, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 3, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 4, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 5, 0 ), 32 * 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can clear rows from the end: ClearRows( 3, -3 )`,
					async function ()
					{
						Datatable.ClearRows( 3, -3 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 32 * 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -2, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -3, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -4, 0 ), 32 * 28 );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `InsertBlankRows( Count, AtRow )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: InsertBlankRows()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.InsertBlankRows(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single parameter: InsertBlankRows( 1 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.InsertBlankRows( 1 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can insert a single row: InsertBlankRows( 1, 0 )`,
					async function ()
					{
						Datatable.InsertBlankRows( 1, 0 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize + 1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, -1 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 1, 0 ), 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can insert multiple rows: InsertBlankRows( 3, 2 )`,
					async function ()
					{
						Datatable.InsertBlankRows( 3, 2 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize + 3 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 32 * 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 1, 0 ), 32 * 1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 2, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 3, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 4, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 5, 0 ), 32 * 2 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can insert rows at the end: InsertBlankRows( 3, -1 )`,
					async function ()
					{
						Datatable.InsertBlankRows( 3, -1 );
						LIB_ASSERT.strictEqual( Datatable.RowCount(), LIB_TEST.MatrixSize + 3 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 32 * 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -2, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -3, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -4, 0 ), 32 * 31 );
						return;
					} );

				return;
			} );

		return;
	} );
