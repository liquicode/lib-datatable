"use strict";


const LIB_UTILS = require( '../lib/lib-utils.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `01) Utils Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		describe( `value_missing( Value )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `returns TRUE when called without parameters.`,
					async function ()
					{
						LIB_ASSERT.ok( LIB_UTILS.value_missing() );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns TRUE when called with null.`,
					async function ()
					{
						LIB_ASSERT.ok( LIB_UTILS.value_missing( null ) );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns TRUE when called with undefined.`,
					async function ()
					{
						let x;
						LIB_ASSERT.ok( LIB_UTILS.value_missing( x ) );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns FALSE when called with FALSE.`,
					async function ()
					{
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( false ) );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns FALSE when called with 0.`,
					async function ()
					{
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( 0 ) );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns FALSE when called with empty string ''.`,
					async function ()
					{
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( '' ) );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns FALSE when called with a numeric value.`,
					async function ()
					{
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( -1 ) );
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( 0 ) );
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( 1 ) );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns FALSE when called with a string value.`,
					async function ()
					{
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( '' ) );
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( 'hello' ) );
						LIB_ASSERT.ok( !LIB_UTILS.value_missing( 'world' ) );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `resolve_index( Count, Index )`,
			async function ()
			{
				let Count = 10;

				//---------------------------------------------------------------------
				it( `throws an error when called without any parameters: resolve_index()`,
					async function ()
					{
						LIB_ASSERT.throws( () => LIB_UTILS.resolve_index(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called without an Index parameter: resolve_index( Count )`,
					async function ()
					{
						LIB_ASSERT.throws( () => LIB_UTILS.resolve_index( Count ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with a positive Index parameter: (0 <= Index < Count)`,
					async function ()
					{
						for ( let index = 0; index < Count; index++ )
						{
							LIB_ASSERT.strictEqual( LIB_UTILS.resolve_index( Count, index ), index );
						}
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns null when called with an out of bounds positive Index parameter: (Index >= Count)`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.resolve_index( Count, Count ), null );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can be called with a negative Index parameter: (-Count <= Index < 0)`,
					async function ()
					{
						for ( let index = -1; index >= -Count; index-- )
						{
							LIB_ASSERT.strictEqual( LIB_UTILS.resolve_index( Count, index ), ( Count + index ) );
						}
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns null when called with an out of bounds negative Index parameter: (Index < -Count)`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.resolve_index( Count, -( Count + 1 ) ), null );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `address2number( Address )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: address2number()`,
					async function ()
					{
						LIB_ASSERT.throws( () => LIB_UTILS.address2number(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with null: address2number( null )`,
					async function ()
					{
						LIB_ASSERT.throws( () => LIB_UTILS.address2number( null ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with an invalid address: address2number( 'R2D2' )`,
					async function ()
					{
						LIB_ASSERT.throws( () => LIB_UTILS.address2number( 'R2D2' ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `returns 0 when called with an empty string: address2number( '' )`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( '' ), 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert simple addresses: A => 1`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'A' ), 1 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert simple addresses: M => 13`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'M' ), 13 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert simple addresses: Z => 26`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'Z' ), 26 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: AA => 27`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'AA' ), ( 26 * 1 ) + 1 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: AB => 28`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'AB' ), ( 26 * 1 ) + 2 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: AZ => 52`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'AZ' ), ( 26 * 1 ) + 26 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: BA => 53`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'BA' ), ( 26 * 2 ) + 1 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: CZ => 104`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'CZ' ), ( 26 * 3 ) + 26 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert rather complex addresses: ABC => 731`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'ABC' ),
							( ( 26 ** 2 ) * 1 )
							+ ( ( 26 ** 1 ) * 2 )
							+ ( ( 26 ** 0 ) * 3 )
						);
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert rather complex addresses: DEF => 2840`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'DEF' ),
							( ( 26 ** 2 ) * 4 )
							+ ( ( 26 ** 1 ) * 5 )
							+ ( ( 26 ** 0 ) * 6 )
						);
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert rather complex addresses: KJUFH => 5216856`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.address2number( 'KJUFH' ), 5216856 );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `number2address( Number )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: number2address()`,
					async function ()
					{
						LIB_ASSERT.throws( () => LIB_UTILS.number2address(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with null: number2address( null )`,
					async function ()
					{
						LIB_ASSERT.throws( () => LIB_UTILS.number2address( null ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with null: number2address( null )`,
					async function ()
					{
						LIB_ASSERT.throws( () => LIB_UTILS.number2address( null ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert simple addresses: 1 => A`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 1 ), 'A' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert simple addresses: 13 => M`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 13 ), 'M' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert simple addresses: 26 => Z`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 26 ), 'Z' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: 27 => AA`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 27 ), 'AA' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: 28 => AB`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 28 ), 'AB' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: 52 => AZ`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 52 ), 'AZ' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: 53 => BA`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 53 ), 'BA' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: 104 => CZ`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 104 ), 'CZ' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: 731 => ABC`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 731 ), 'ABC' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: 2840 => DEF`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 2840 ), 'DEF' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can convert moderately complex addresses: 5216856 => KJUFH`,
					async function ()
					{
						LIB_ASSERT.strictEqual( LIB_UTILS.number2address( 5216856 ), 'KJUFH' );
						return;
					} );

				return;
			} );


		return;
	} );
