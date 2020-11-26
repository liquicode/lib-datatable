"use strict";


const LIB_DATATABLE = require( '../lib/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `15) Datatable Table Tests`,
	function ()
	{


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
