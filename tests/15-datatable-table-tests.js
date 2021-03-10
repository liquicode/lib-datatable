"use strict";


const LibDatatable = require( '../src/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `15) Datatable Table Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		describe( `Constructor Functions`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `should create table from matrix`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.ProductMatrix );
						LIB_ASSERT.notStrictEqual( datatable, null );
						LIB_ASSERT.strictEqual( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
						LIB_ASSERT.strictEqual( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 0, 0 ), 0, 'mismatched value at ( 0, 0 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 1, 1 ), 1, 'mismatched value at ( 1, 1 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 1, 2 ), 2, 'mismatched value at ( 1, 2 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 2, 1 ), 2, 'mismatched value at ( 2, 1 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 2, 2 ), 4, 'mismatched value at ( 2, 2 )' );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should create table from a partial matrix`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.PartialCountMatrix );
						LIB_ASSERT.notStrictEqual( datatable, null );
						LIB_ASSERT.strictEqual( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
						LIB_ASSERT.strictEqual( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 0, 0 ), 0, 'mismatched value at ( 0, 0 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 0, 1 ), datatable.options.blank_value, 'mismatched value at ( 0, 1 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 1, 0 ), 1, 'mismatched value at ( 1, 0 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 1, 1 ), 2, 'mismatched value at ( 1, 1 )' );
						return;
					} );

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
						let table = LibDatatable.NewDatatable();
						LIB_ASSERT.strictEqual( table.RowCount(), 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can grow the table when setting a new row count`,
					async function ()
					{
						let table = LibDatatable.NewDatatable();
						table.RowCount( 10 );
						LIB_ASSERT.strictEqual( table.data.rows.length, 10 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink the table when setting a new row count`,
					async function ()
					{
						let table = LibDatatable.NewDatatable();
						table.RowCount( 10 );
						table.RowCount( 5 );
						LIB_ASSERT.strictEqual( table.data.rows.length, 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink the table when removing all rows`,
					async function ()
					{
						let table = LibDatatable.NewDatatable();
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
						let table = LibDatatable.NewDatatable();
						LIB_ASSERT.strictEqual( table.ColumnCount(), 0 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can grow the table when setting a new column count`,
					async function ()
					{
						let table = LibDatatable.NewDatatable();
						table.ColumnCount( 10 );
						LIB_ASSERT.strictEqual( table.data.column_headings.length, 10 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink the table when setting a new column count`,
					async function ()
					{
						let table = LibDatatable.NewDatatable();
						table.ColumnCount( 10 );
						table.ColumnCount( 5 );
						LIB_ASSERT.strictEqual( table.data.column_headings.length, 5 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink the table when removing all columns`,
					async function ()
					{
						let table = LibDatatable.NewDatatable();
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
						let table = LibDatatable.NewDatatable();
						table.SetSize( 10, 10 );
						LIB_ASSERT.strictEqual( table.RowCount(), 10 );
						LIB_ASSERT.strictEqual( table.ColumnCount(), 10 );
						return;
					} );

				//---------------------------------------------------------------------
				it( `can shrink a table to resize it`,
					async function ()
					{
						let table = LibDatatable.NewDatatable();
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
						let table = LibDatatable.NewDatatable();
						table.SetSize( 10, 10 );
						table.SetSize( 0, 0 );
						LIB_ASSERT.strictEqual( table.RowCount(), 0 );
						LIB_ASSERT.strictEqual( table.ColumnCount(), 0 );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `To/From Objects`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `should create a table and column headings from an array of objects`,
					async function ()
					{
						let objects = [
							{ letter: 'A', number: 1 },
							{ letter: 'B', number: 2 },
							{ letter: 'C', number: 3 },
							{ letter: 'D', number: 4 },
							{ letter: 'E', number: 5 },
							{ letter: 'F', number: 6 },
							{ letter: 'G', number: 7 },
							{ letter: 'H', number: 8 },
							{ letter: 'I', number: 9 },
							{ letter: 'J', number: 10 },
						];
						let datatable = LibDatatable.NewDatatable();
						LIB_ASSERT.notStrictEqual( datatable, null );
						datatable.FromObjects( objects );
						LIB_ASSERT.strictEqual( datatable.RowCount(), 10, 'mismatched row count' );
						LIB_ASSERT.strictEqual( datatable.ColumnCount(), 2, 'mismatched column count' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 0, 0 ), 'A', 'mismatched value at ( 0, 0 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 0, 1 ), 1, 'mismatched value at ( 0, 1 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 9, 0 ), 'J', 'mismatched value at ( 9, 0 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 9, 1 ), 10, 'mismatched value at ( 9, 1 )' );
						return;
					} );

				//---------------------------------------------------------------------
				it( `should re-create an array of objects`,
					async function ()
					{
						let objects = [
							{ letter: 'A', number: 1 },
							{ letter: 'B', number: 2 },
							{ letter: 'C', number: 3 },
							{ letter: 'D', number: 4 },
							{ letter: 'E', number: 5 },
							{ letter: 'F', number: 6 },
							{ letter: 'G', number: 7 },
							{ letter: 'H', number: 8 },
							{ letter: 'I', number: 9 },
							{ letter: 'J', number: 10 },
						];
						let datatable = LibDatatable.NewDatatable();
						LIB_ASSERT.notStrictEqual( datatable, null );
						datatable.FromObjects( objects );
						let objects2 = datatable.ToObjects();
						LIB_ASSERT.strictEqual( JSON.stringify( objects ), JSON.stringify( objects2 ) );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `To/From Matrix`,
			async function ()
			{


				//---------------------------------------------------------------------
				it( `should create a matrix`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.CountMatrix );
						LIB_ASSERT.ok( datatable );
						let matrix = datatable.ToMatrix();
						LIB_ASSERT.ok( matrix );
						LIB_ASSERT.ok( matrix.length );
						// Test dimensions.
						LIB_ASSERT.strictEqual( matrix.length, LIB_TEST.MatrixSize, 'mismatched row count' );
						LIB_ASSERT.strictEqual( matrix[ 0 ].length, LIB_TEST.MatrixSize, 'mismatched column count' );
						// Test values.
						LIB_ASSERT.deepStrictEqual( matrix, LIB_TEST.CountMatrix );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should create a matrix of indexed columns`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.CountMatrix );
						LIB_ASSERT.ok( datatable );
						datatable.SetSize( 5, 5 );
						let matrix = datatable.ToMatrix( [ 1, 0, 2 ] );
						LIB_ASSERT.ok( matrix );
						LIB_ASSERT.ok( matrix.length );
						// Test dimensions.
						LIB_ASSERT.strictEqual( matrix.length, 5, 'mismatched row count' );
						LIB_ASSERT.strictEqual( matrix[ 0 ].length, 3, 'mismatched column count' );
						// Test values.
						LIB_ASSERT.deepStrictEqual( matrix, [
							[ 1, 0, 2 ],
							[ 33, 32, 34 ],
							[ 65, 64, 66 ],
							[ 97, 96, 98 ],
							[ 129, 128, 130 ],
						] );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should create a matrix of named columns`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.CountMatrix );
						LIB_ASSERT.ok( datatable );
						datatable.SetSize( 5, 5 );
						datatable.ColumnHeading( 0, 'A' );
						datatable.ColumnHeading( 1, 'B' );
						datatable.ColumnHeading( 2, 'C' );
						let matrix = datatable.ToMatrix( [ 'B', 'A', 'C' ] );
						LIB_ASSERT.ok( matrix );
						LIB_ASSERT.ok( matrix.length );
						// Test dimensions.
						LIB_ASSERT.strictEqual( matrix.length, 5, 'mismatched row count' );
						LIB_ASSERT.strictEqual( matrix[ 0 ].length, 3, 'mismatched column count' );
						// Test values.
						LIB_ASSERT.deepStrictEqual( matrix, [
							[ 1, 0, 2 ],
							[ 33, 32, 34 ],
							[ 65, 64, 66 ],
							[ 97, 96, 98 ],
							[ 129, 128, 130 ],
						] );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should create a matrix of mixed columns`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.CountMatrix );
						LIB_ASSERT.ok( datatable );
						datatable.SetSize( 5, 5 );
						datatable.ColumnHeading( 0, 'A' );
						datatable.ColumnHeading( 1, 'B' );
						datatable.ColumnHeading( 2, 'C' );
						let matrix = datatable.ToMatrix( [ 'B', 'A', 2 ] );
						LIB_ASSERT.ok( matrix );
						LIB_ASSERT.ok( matrix.length );
						// Test dimensions.
						LIB_ASSERT.strictEqual( matrix.length, 5, 'mismatched row count' );
						LIB_ASSERT.strictEqual( matrix[ 0 ].length, 3, 'mismatched column count' );
						// Test values.
						LIB_ASSERT.deepStrictEqual( matrix, [
							[ 1, 0, 2 ],
							[ 33, 32, 34 ],
							[ 65, 64, 66 ],
							[ 97, 96, 98 ],
							[ 129, 128, 130 ],
						] );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should create a matrix with null columns`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.CountMatrix );
						LIB_ASSERT.ok( datatable );
						datatable.SetSize( 5, 5 );
						datatable.ColumnHeading( 0, 'A' );
						datatable.ColumnHeading( 1, 'B' );
						datatable.ColumnHeading( 2, 'C' );
						let matrix = datatable.ToMatrix( [ 1, 0, null, 2 ] );
						LIB_ASSERT.ok( matrix );
						LIB_ASSERT.ok( matrix.length );
						// Test dimensions.
						LIB_ASSERT.strictEqual( matrix.length, 5, 'mismatched row count' );
						LIB_ASSERT.strictEqual( matrix[ 0 ].length, 4, 'mismatched column count' );
						// Test values.
						LIB_ASSERT.deepStrictEqual( matrix, [
							[ 1, 0, null, 2 ],
							[ 33, 32, null, 34 ],
							[ 65, 64, null, 66 ],
							[ 97, 96, null, 98 ],
							[ 129, 128, null, 130 ],
						] );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should create a matrix with '-1' columns`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.CountMatrix );
						LIB_ASSERT.ok( datatable );
						datatable.SetSize( 5, 5 );
						datatable.ColumnHeading( 0, 'A' );
						datatable.ColumnHeading( 1, 'B' );
						datatable.ColumnHeading( 2, 'C' );
						let matrix = datatable.ToMatrix( [ 1, 0, -1, 2 ] );
						LIB_ASSERT.ok( matrix );
						LIB_ASSERT.ok( matrix.length );
						// Test dimensions.
						LIB_ASSERT.strictEqual( matrix.length, 5, 'mismatched row count' );
						LIB_ASSERT.strictEqual( matrix[ 0 ].length, 4, 'mismatched column count' );
						// Test values.
						LIB_ASSERT.deepStrictEqual( matrix, [
							[ 1, 0, null, 2 ],
							[ 33, 32, null, 34 ],
							[ 65, 64, null, 66 ],
							[ 97, 96, null, 98 ],
							[ 129, 128, null, 130 ],
						] );
						return;
					} );


				return;
			} );


		return;
	} );
