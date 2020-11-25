"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_UTILS = require( '../lib/lib-utils.js' );
const LIB_ASSERT = require( 'assert' );

const LIB_TEST = require( './test-data/test-matrices.js' );


//---------------------------------------------------------------------
describe( `02) Internal Tests`,
	function ()
	{

		//---------------------------------------------------------------------
		it( `creates a new datatable`,
			async function ()
			{
				let table = LIB_DATATABLE.NewDatatable();
				LIB_ASSERT.ok( table );
				LIB_ASSERT.strictEqual( table.data.rows.length, 0 );
				LIB_ASSERT.strictEqual( table.data.column_headings.length, 0 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `creates a datatable from a matrix`,
			async function ()
			{
				let table = LIB_DATATABLE.FromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.ok( table );
				LIB_ASSERT.strictEqual( table.data.rows.length, LIB_TEST.MatrixSize );
				LIB_ASSERT.strictEqual( table.data.column_headings.length, LIB_TEST.MatrixSize );
				return;
			} );


		//---------------------------------------------------------------------
		describe( `RowCount( Count )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `returns the current row count when called with no parameters`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						LIB_ASSERT.strictEqual( table.RowCount(), 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can grow the table when setting a new row count`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.RowCount( 10 );
						LIB_ASSERT.strictEqual( table.data.rows.length, 10 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink the table when setting a new row count`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.RowCount( 10 );
						table.RowCount( 5 );
						LIB_ASSERT.strictEqual( table.data.rows.length, 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink the table when removing all rows`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.RowCount( 10 );
						table.RowCount( 0 );
						LIB_ASSERT.strictEqual( table.data.rows.length, 0 );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `ColumnCount( Count )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `returns the current row count when called with no parameters`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						LIB_ASSERT.strictEqual( table.ColumnCount(), 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can grow the table when setting a new column count`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.ColumnCount( 10 );
						LIB_ASSERT.strictEqual( table.data.column_headings.length, 10 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink the table when setting a new column count`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.ColumnCount( 10 );
						table.ColumnCount( 5 );
						LIB_ASSERT.strictEqual( table.data.column_headings.length, 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink the table when removing all columns`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.ColumnCount( 10 );
						table.ColumnCount( 0 );
						LIB_ASSERT.strictEqual( table.data.column_headings.length, 0 );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `SetSize( RowCount, ColCount )`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `can grow a table to resize it`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.SetSize( 10, 10 );
						LIB_ASSERT.strictEqual( table.RowCount(), 10 );
						LIB_ASSERT.strictEqual( table.ColumnCount(), 10 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink a table to resize it`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.SetSize( 10, 10 );
						table.SetSize( 5, 5 );
						LIB_ASSERT.strictEqual( table.RowCount(), 5 );
						LIB_ASSERT.strictEqual( table.ColumnCount(), 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink a table to clear it`,
					async function ()
					{
						let table = LIB_DATATABLE.NewDatatable();
						table.SetSize( 10, 10 );
						table.SetSize( 0, 0 );
						LIB_ASSERT.strictEqual( table.RowCount(), 0 );
						LIB_ASSERT.strictEqual( table.ColumnCount(), 0 );
						return;
					} );

				return;
			} );


		return;
	} );
