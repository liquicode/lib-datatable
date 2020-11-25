"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `12) Datatable Cells Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		let Datatable = null;


		//---------------------------------------------------------------------
		beforeEach(
			function ()
			{
				Datatable = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
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
		describe( `GetValue( RowIndex, ColIndex )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: GetValue()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.GetValue(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single numeric parameter: GetValue( 0 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.GetValue( 0 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when addressing a cell that does not exist: GetValue( 99, 99 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.GetValue( 99, 99 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with two numeric parameters: GetValue( 0, 0 )`,
					async function ()
					{
						let value = Datatable.GetValue( 0, 0 );
						LIB_ASSERT.strictEqual( value, 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with two numeric parameters: GetValue( 1, 1 )`,
					async function ()
					{
						let value = Datatable.GetValue( 1, 1 );
						LIB_ASSERT.strictEqual( value, 1 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with negative index values: GetValue( -1, -1 )`,
					async function ()
					{
						let value = Datatable.GetValue( -1, -1 );
						LIB_ASSERT.strictEqual( value, ( ( LIB_TEST.MatrixSize - 1 ) * ( LIB_TEST.MatrixSize - 1 ) ) );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with negative index values: GetValue( -2, -2 )`,
					async function ()
					{
						let value = Datatable.GetValue( -2, -2 );
						LIB_ASSERT.strictEqual( value, ( ( LIB_TEST.MatrixSize - 2 ) * ( LIB_TEST.MatrixSize - 2 ) ) );
						return;
					} );

			} );


		//---------------------------------------------------------------------
		describe( `SetValue( Value, RowIndex, ColIndex )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: SetValue( 'test' )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.SetValue( 'test' ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single numeric parameter: SetValue( 'test', 0 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.SetValue( 'test', 0 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when addressing a cell that does not exist: SetValue( 'test', 99, 99 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.SetValue( 'test', 99, 99 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with two numeric parameters: SetValue( 'test', 0, 0 )`,
					async function ()
					{
						Datatable.SetValue( 'test', 0, 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 'test' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with two numeric parameters: SetValue( 'test', 1, 1 )`,
					async function ()
					{
						Datatable.SetValue( 'test', 1, 1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 1, 1 ), 'test' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with negative index values: SetValue( 'test', -1, -1 )`,
					async function ()
					{
						Datatable.SetValue( 'test', -1, -1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, -1 ), 'test' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with negative index values: SetValue( 'test', -2, -2 )`,
					async function ()
					{
						Datatable.SetValue( 'test', -2, -2 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -2, -2 ), 'test' );
						return;
					} );

			} );


		return;
	} );
