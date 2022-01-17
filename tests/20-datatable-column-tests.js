"use strict";


const LibDatatable = require( '../src/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `20) Datatable Columns Tests`,
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
		describe( `DeleteColumns( Count, AtColumn )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: DeleteColumns()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.DeleteColumns(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single parameter: DeleteColumns( 1 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.DeleteColumns( 1 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can delete a single column: DeleteColumns( 1, 0 )`,
					async function ()
					{
						Datatable.DeleteColumns( 1, 0 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize - 1 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can delete multiple columns: DeleteColumns( 3, 2 )`,
					async function ()
					{
						Datatable.DeleteColumns( 3, 2 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize - 3 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 2 ), 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can delete columns from the end: DeleteColumns( 3, -3 )`,
					async function ()
					{
						Datatable.DeleteColumns( 3, -3 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize - 3 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, -1 ), 28 );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `ClearColumns( Count, AtColumn )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: ClearColumns()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.ClearColumns(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single parameter: ClearColumns( 1 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.DeleteColumns( 1 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can clear a single column: ClearColumns( 1, 0 )`,
					async function ()
					{
						Datatable.ClearColumns( 1, 0 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 1 ), 1 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can clear multiple columns: ClearColumns( 3, 2 )`,
					async function ()
					{
						Datatable.ClearColumns( 3, 2 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 2 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, 2 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 3 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, 3 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 4 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, 4 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 5 ), 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can clear columns from the end: ClearColumns( 3, -3 )`,
					async function ()
					{
						Datatable.ClearColumns( 3, -3 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, -1 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, -1 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, -2 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, -2 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, -3 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, -3 ), Datatable.options.blank_value );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `InsertBlankColumns( Count, AtColumn )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: InsertBlankColumns()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.InsertBlankColumns(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `throws an error when called with a single parameter: InsertBlankColumns( 1 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.InsertBlankColumns( 1 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can insert a single column: InsertBlankColumns( 1, 0 )`,
					async function ()
					{
						Datatable.InsertBlankColumns( 1, 0 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize + 1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( -1, 0 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 1 ), 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can insert multiple columns: InsertBlankColumns( 3, 2 )`,
					async function ()
					{
						Datatable.InsertBlankColumns( 3, 2 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize + 3 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 0 ), 0 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 1 ), 1 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 2 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 3 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 4 ), Datatable.options.blank_value );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, 5 ), 2 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can insert columns at the end: InsertBlankColumns( 3, -1 )`,
					async function ()
					{
						Datatable.InsertBlankColumns( 3, -1 );
						LIB_ASSERT.strictEqual( Datatable.ColumnCount(), LIB_TEST.MatrixSize + 3 );
						LIB_ASSERT.strictEqual( Datatable.GetValue( 0, -1 ), Datatable.options.blank_value );
						return;
					} );

				return;
			} );

		//---------------------------------------------------------------------
		describe( `ColumnID( AtColumn )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: ColumnID()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.ColumnID(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can get the id of a column: ColumnID( 0 )`,
					async function ()
					{
						let id = Datatable.ColumnID( 0 );
						LIB_ASSERT.ok( id );
						return;
					} );

				//---------------------------------------------------------------------
				it( `all columns have ids`,
					async function ()
					{
						for ( let index = 0; index < Datatable.ColumnCount(); index++ )
						{
							let id = Datatable.ColumnID( index );
							LIB_ASSERT.ok( id );
						}
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `ColumnTitle( AtColumn, Title )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called without parameters: ColumnTitle()`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.ColumnTitle(), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can set and get the title of a column: ColumnTitle( 0, 'first' )`,
					async function ()
					{
						Datatable.ColumnTitle( 0, 'first' );
						LIB_ASSERT.strictEqual( Datatable.ColumnTitle( 0 ), 'first' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can set and get the title of multiple columns: ColumnTitle( 0, 'first' )`,
					async function ()
					{
						Datatable.ColumnTitle( 0, 'first' );
						Datatable.ColumnTitle( 1, 'second' );
						Datatable.ColumnTitle( 2, 'third' );
						LIB_ASSERT.strictEqual( Datatable.ColumnTitle( 0 ), 'first' );
						LIB_ASSERT.strictEqual( Datatable.ColumnTitle( 1 ), 'second' );
						LIB_ASSERT.strictEqual( Datatable.ColumnTitle( 2 ), 'third' );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `ColumnTitles( Titles )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `throws an error when called with and invalid parameter: ColumnTitles( 42 )`,
					async function ()
					{
						LIB_ASSERT.throws( () => Datatable.ColumnTitles( 42 ), Error );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can set and get all column titles at once: ColumnTitles( Titles )`,
					async function ()
					{
						let titles = Datatable.ColumnTitles();
						titles[ 0 ] = 'first';
						titles[ 1 ] = 'second';
						titles[ 2 ] = 'third';
						Datatable.ColumnTitles( titles );
						LIB_ASSERT.deepStrictEqual( Datatable.ColumnTitles(), titles );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can set all column titles at once and retrieve them individually`,
					async function ()
					{
						Datatable.ColumnTitles( [ 'first', 'second', 'third' ] );
						LIB_ASSERT.strictEqual( Datatable.ColumnTitle( 0 ), 'first' );
						LIB_ASSERT.strictEqual( Datatable.ColumnTitle( 1 ), 'second' );
						LIB_ASSERT.strictEqual( Datatable.ColumnTitle( 2 ), 'third' );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		return;
	} );
