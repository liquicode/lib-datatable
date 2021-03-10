"use strict";


const LibDatatable = require( '../src/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


var LOG = false;


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
				Datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.ProductMatrix );
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
		describe( `RowCol( RowIndex, ColIndex )`,
			async function ()
			{

				//---------------------------------------------------------------------
				let Datatable = null;


				//---------------------------------------------------------------------
				beforeEach(
					function ()
					{
						Datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.ProductMatrix );
						LIB_ASSERT.ok( Datatable, `Datatable failed to create.` );
						LIB_ASSERT.ok( Datatable.GetValue( 0, 0 ) === 0, `Mismatched value at (0, 0) in ProductMatrix.` );
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
				it( `returns a null RowCol when called without parameters: RowCol()`,
					async function ()
					{
						// LIB_ASSERT.throws( () => Datatable.RowCol(), Error );
						let value = Datatable.RowCol();
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, null );
						LIB_ASSERT.strictEqual( value.row_addr, null );
						LIB_ASSERT.strictEqual( value.row_index, null );
						LIB_ASSERT.strictEqual( value.col_num, null );
						LIB_ASSERT.strictEqual( value.col_addr, null );
						LIB_ASSERT.strictEqual( value.col_index, null );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with only a row component: RowCol( 0, null )`,
					async function ()
					{
						let value = Datatable.RowCol( 0, null );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 1 );
						LIB_ASSERT.strictEqual( value.row_addr, 'A' );
						LIB_ASSERT.strictEqual( value.row_index, 0 );
						LIB_ASSERT.strictEqual( value.col_num, null );
						LIB_ASSERT.strictEqual( value.col_addr, null );
						LIB_ASSERT.strictEqual( value.col_index, null );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with only a column component: RowCol( null, 0 )`,
					async function ()
					{
						let value = Datatable.RowCol( null, 0 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, null );
						LIB_ASSERT.strictEqual( value.row_addr, null );
						LIB_ASSERT.strictEqual( value.row_index, null );
						LIB_ASSERT.strictEqual( value.col_num, 1 );
						LIB_ASSERT.strictEqual( value.col_addr, 'A' );
						LIB_ASSERT.strictEqual( value.col_index, 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with two numeric parameters: RowCol( 0, 0 )`,
					async function ()
					{
						let value = Datatable.RowCol( 0, 0 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 1 );
						LIB_ASSERT.strictEqual( value.row_addr, 'A' );
						LIB_ASSERT.strictEqual( value.row_index, 0 );
						LIB_ASSERT.strictEqual( value.col_num, 1 );
						LIB_ASSERT.strictEqual( value.col_addr, 'A' );
						LIB_ASSERT.strictEqual( value.col_index, 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with two numeric parameters: RowCol( 12, 12 )`,
					async function ()
					{
						let value = Datatable.RowCol( 12, 12 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 13 );
						LIB_ASSERT.strictEqual( value.row_addr, 'M' );
						LIB_ASSERT.strictEqual( value.row_index, 12 );
						LIB_ASSERT.strictEqual( value.col_num, 13 );
						LIB_ASSERT.strictEqual( value.col_addr, 'M' );
						LIB_ASSERT.strictEqual( value.col_index, 12 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with two numeric parameters: RowCol( 25, 25 )`,
					async function ()
					{
						let value = Datatable.RowCol( 25, 25 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 26 );
						LIB_ASSERT.strictEqual( value.row_addr, 'Z' );
						LIB_ASSERT.strictEqual( value.row_index, 25 );
						LIB_ASSERT.strictEqual( value.col_num, 26 );
						LIB_ASSERT.strictEqual( value.col_addr, 'Z' );
						LIB_ASSERT.strictEqual( value.col_index, 25 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with two out of bounds positive parameters: RowCol( 51, 51 )`,
					async function ()
					{
						let value = Datatable.RowCol( 51, 51 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 52 );
						LIB_ASSERT.strictEqual( value.row_addr, 'AZ' );
						LIB_ASSERT.strictEqual( value.row_index, 51 );
						LIB_ASSERT.strictEqual( value.col_num, 52 );
						LIB_ASSERT.strictEqual( value.col_addr, 'AZ' );
						LIB_ASSERT.strictEqual( value.col_index, 51 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with (in bounds) negative numeric parameters: RowCol( -25, -25 )`,
					async function ()
					{
						let value = Datatable.RowCol( -25, -25 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 8 );
						LIB_ASSERT.strictEqual( value.row_addr, 'H' );
						LIB_ASSERT.strictEqual( value.row_index, 7 );
						LIB_ASSERT.strictEqual( value.col_num, 8 );
						LIB_ASSERT.strictEqual( value.col_addr, 'H' );
						LIB_ASSERT.strictEqual( value.col_index, 7 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns null values when called with one out of bounds negative parameters: RowCol( 51, -51 )`,
					async function ()
					{
						let value = Datatable.RowCol( 51, -51 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 52 );
						LIB_ASSERT.strictEqual( value.row_addr, 'AZ' );
						LIB_ASSERT.strictEqual( value.row_index, 51 );
						LIB_ASSERT.strictEqual( value.col_num, null );
						LIB_ASSERT.strictEqual( value.col_addr, null );
						LIB_ASSERT.strictEqual( value.col_index, null );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns null values when called with one out of bounds negative parameters: RowCol( -51, 51 )`,
					async function ()
					{
						let value = Datatable.RowCol( -51, 51 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, null );
						LIB_ASSERT.strictEqual( value.row_addr, null );
						LIB_ASSERT.strictEqual( value.row_index, null );
						LIB_ASSERT.strictEqual( value.col_num, 52 );
						LIB_ASSERT.strictEqual( value.col_addr, 'AZ' );
						LIB_ASSERT.strictEqual( value.col_index, 51 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns null values when called with two out of bounds negative parameters: RowCol( -51, -51 )`,
					async function ()
					{
						let value = Datatable.RowCol( -51, -51 );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, null );
						LIB_ASSERT.strictEqual( value.row_addr, null );
						LIB_ASSERT.strictEqual( value.row_index, null );
						LIB_ASSERT.strictEqual( value.col_num, null );
						LIB_ASSERT.strictEqual( value.col_addr, null );
						LIB_ASSERT.strictEqual( value.col_index, null );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with a string parameter: RowCol( 'A1' )`,
					async function ()
					{
						let value = Datatable.RowCol( 'A1' );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 1 );
						LIB_ASSERT.strictEqual( value.row_addr, 'A' );
						LIB_ASSERT.strictEqual( value.row_index, 0 );
						LIB_ASSERT.strictEqual( value.col_num, 1 );
						LIB_ASSERT.strictEqual( value.col_addr, 'A' );
						LIB_ASSERT.strictEqual( value.col_index, 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with a string parameter: RowCol( 'AZ12' )`,
					async function ()
					{
						let value = Datatable.RowCol( 'AZ12' );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 12 );
						LIB_ASSERT.strictEqual( value.row_addr, 'L' );
						LIB_ASSERT.strictEqual( value.row_index, 11 );
						LIB_ASSERT.strictEqual( value.col_num, 52 );
						LIB_ASSERT.strictEqual( value.col_addr, 'AZ' );
						LIB_ASSERT.strictEqual( value.col_index, 51 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with an object parameter: RowCol( { col_addr: 'AZ', row_num: 12 } )`,
					async function ()
					{
						let value = Datatable.RowCol( { col_addr: 'AZ', row_num: 12 } );
						if ( LOG ) { console.table( value ); }
						LIB_ASSERT.ok( value );
						LIB_ASSERT.strictEqual( value.row_num, 12 );
						LIB_ASSERT.strictEqual( value.row_addr, 'L' );
						LIB_ASSERT.strictEqual( value.row_index, 11 );
						LIB_ASSERT.strictEqual( value.col_num, 52 );
						LIB_ASSERT.strictEqual( value.col_addr, 'AZ' );
						LIB_ASSERT.strictEqual( value.col_index, 51 );
						return;
					} );

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
