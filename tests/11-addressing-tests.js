"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );

var LOG = false;

//---------------------------------------------------------------------
describe( `11) Addressing Tests`,
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
		describe( `RowCol( RowIndex, ColIndex )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: RowCol()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.RowCol(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single numeric parameter: RowCol( 1 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.RowCol( 1 ), Error );
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


		return;
	} );
