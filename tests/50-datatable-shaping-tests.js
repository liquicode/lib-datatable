"use strict";


const LibDatatable = require( '../src/lib-datatable.js' );
const LIB_TEST = require( './test-data/test-matrices.js' );
const LIB_ASSERT = require( 'assert' );


//---------------------------------------------------------------------
describe( `50) Datatable Shaping Tests`,
	function ()
	{


		//---------------------------------------------------------------------
		describe( `TransposeTable Function`,
			async function ()
			{

				//---------------------------------------------------------------------
				it( `should transpose a table`,
					async function ()
					{
						let datatable = LibDatatable.NewDatatableFromMatrix( LIB_TEST.CountMatrix );
						LIB_ASSERT.notStrictEqual( datatable, null );
						datatable.TransposeTable();
						LIB_ASSERT.strictEqual( datatable.RowCount(), LIB_TEST.MatrixSize, 'mismatched row count' );
						LIB_ASSERT.strictEqual( datatable.ColumnCount(), LIB_TEST.MatrixSize, 'mismatched column count' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 0, 0 ), 0, 'mismatched value at ( 0, 0 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 1, 1 ), 33, 'mismatched value at ( 1, 1 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 1, 2 ), 65, 'mismatched value at ( 1, 2 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 2, 1 ), 34, 'mismatched value at ( 2, 1 )' );
						LIB_ASSERT.strictEqual( datatable.GetValue( 2, 2 ), 66, 'mismatched value at ( 2, 2 )' );
						return;
					} );

				return;
			} );


		//---------------------------------------------------------------------
		describe( `AppendTable Function`,
			async function ()
			{


				//---------------------------------------------------------------------
				it( `should append single column tables`,
					async function ()
					{
						let table1 = LibDatatable.NewDatatableFromMatrix( [ [ 1 ], [ 2 ], [ 3 ], ] );
						let table2 = LibDatatable.NewDatatableFromMatrix( [ [ 4 ], [ 5 ], [ 6 ], ] );
						table1.AppendTable( table2 );
						LIB_ASSERT.strictEqual( table1.ColumnCount(), 1, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table1.RowCount(), 6, 'mismatched row count' );
						let matrix = table1.ToMatrix();
						LIB_ASSERT.deepStrictEqual( matrix, [ [ 1 ], [ 2 ], [ 3 ], [ 4 ], [ 5 ], [ 6 ], ] );
						return;
					} );


				//---------------------------------------------------------------------
				it( `should append multi column tables`,
					async function ()
					{
						// Setup table 1.
						let table1 = LibDatatable.NewDatatableFromObjects( [
							{ text: 'A', number: 1 },
							{ text: 'B', number: 2 },
							{ text: 'C', number: 3 },
						] );

						// Setup table 2.
						let table2 = LibDatatable.NewDatatableFromObjects( [
							{ text: 'D', number: 4 },
							{ text: 'E', number: 5 },
							{ text: 'F', number: 6 },
						] );

						// Append table.
						table1.AppendTable( table2 );

						// Test.
						LIB_ASSERT.strictEqual( table1.ColumnCount(), 2, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table1.RowCount(), 6, 'mismatched row count' );
						let objects = table1.ToObjects();
						LIB_ASSERT.deepStrictEqual( objects, [
							{ text: 'A', number: 1 },
							{ text: 'B', number: 2 },
							{ text: 'C', number: 3 },
							{ text: 'D', number: 4 },
							{ text: 'E', number: 5 },
							{ text: 'F', number: 6 },
						] );

						return;
					} );


				//---------------------------------------------------------------------
				it( `should append mapped columns`,
					async function ()
					{
						// Setup table 1.
						let table1 = LibDatatable.NewDatatableFromObjects( [
							{ text: 'A', number: 1 },
							{ text: 'B', number: 2 },
							{ text: 'C', number: 3 },
						] );
						let column_headings = table1.ColumnTitles();

						// Setup table 2.
						let table2 = LibDatatable.NewDatatableFromObjects( [
							{ foo: 'koo', number: 4, text: 'D' },
							{ foo: 'bar', number: 5, text: 'E' },
							{ foo: 'baz', number: 6, text: 'F' },
						] );

						// Append table.
						table1.AppendTable( table2, column_headings );

						// Test.
						LIB_ASSERT.strictEqual( table1.ColumnCount(), 2, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table1.RowCount(), 6, 'mismatched row count' );
						let objects = table1.ToObjects();
						LIB_ASSERT.deepStrictEqual( objects, [
							{ text: 'A', number: 1 },
							{ text: 'B', number: 2 },
							{ text: 'C', number: 3 },
							{ text: 'D', number: 4 },
							{ text: 'E', number: 5 },
							{ text: 'F', number: 6 },
						] );

						return;
					} );


				//---------------------------------------------------------------------
				it( `should add missing columns`,
					async function ()
					{
						// Setup table 1.
						let table1 = LibDatatable.NewDatatableFromObjects( [
							{ text: 'A', number: 1 },
							{ text: 'B', number: 2 },
							{ text: 'C', number: 3 },
						] );
						let column_headings = table1.ColumnTitles();

						// Setup table 2.
						let table2 = LibDatatable.NewDatatableFromObjects( [
							{ foo: 'koo', number: 4, text: 'D', boolean: true },
							{ foo: 'bar', number: 5, text: 'E', boolean: false },
							{ foo: 'baz', number: 6, text: 'F', boolean: true },
						] );

						// Append table.
						column_headings.push( 'boolean' );
						table1.AppendTable( table2, column_headings );

						// Test.
						LIB_ASSERT.strictEqual( table1.ColumnCount(), 3, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table1.RowCount(), 6, 'mismatched row count' );
						let matrix = table1.ToMatrix();
						LIB_ASSERT.deepStrictEqual( matrix, [
							[ 'A', 1, null ],
							[ 'B', 2, null ],
							[ 'C', 3, null ],
							[ 'D', 4, true ],
							[ 'E', 5, false ],
							[ 'F', 6, true ],
						] );

						return;
					} );


				return;
			} );


		//---------------------------------------------------------------------
		describe( `JoinTable Function`,
			async function ()
			{


				//---------------------------------------------------------------------
				let table_customers = null;
				let table_orders = null;
				before(
					function ()
					{
						// Setup table 1.
						table_customers = LibDatatable.NewDatatableFromObjects(
							[
								{ customer_id: 1, name: 'Alice' },
								{ customer_id: 2, name: 'Bob' },
								{ customer_id: 3, name: 'Eve' },
							]
						);

						// Setup table 2.
						table_orders = LibDatatable.NewDatatableFromObjects(
							[
								{ order_id: 1, customer_id: 2, item: 'pretzels' },
								{ order_id: 2, customer_id: 1, item: 'chips' },
								{ order_id: 3, customer_id: 2, item: 'soda' },
								{ order_id: 4, customer_id: 0, item: 'cheeseburger' },
							]
						);

						return;
					} );


				//---------------------------------------------------------------------
				it( `should inner join tables`,
					async function ()
					{
						let table = table_customers.Clone();
						table.JoinTable( 0, 'inner', table_orders, 1 );
						table.ColumnTitles( [ ...table_customers.ColumnTitles(), ...table_orders.ColumnTitles() ] );
						// Test.
						LIB_ASSERT.strictEqual( table.ColumnCount(), 5, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table.RowCount(), 3, 'mismatched row count' );
						let objects = table.ToObjects();
						LIB_ASSERT.deepStrictEqual( objects,
							[
								{ customer_id: 1, name: 'Alice', order_id: 2, customer_id: 1, item: 'chips' },
								{ customer_id: 2, name: 'Bob', order_id: 1, customer_id: 2, item: 'pretzels' },
								{ customer_id: 2, name: 'Bob', order_id: 3, customer_id: 2, item: 'soda' },
							]
						);
						return;
					} );

				//---------------------------------------------------------------------
				it( `should left join tables`,
					async function ()
					{
						let table = table_customers.Clone();
						table.JoinTable( 0, 'left', table_orders, 1 );
						table.ColumnTitles( [ ...table_customers.ColumnTitles(), ...table_orders.ColumnTitles() ] );
						// Test.
						LIB_ASSERT.strictEqual( table.ColumnCount(), 5, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table.RowCount(), 4, 'mismatched row count' );
						let objects = table.ToObjects();
						LIB_ASSERT.deepStrictEqual( objects,
							[
								{ customer_id: 1, name: 'Alice', order_id: 2, customer_id: 1, item: 'chips' },
								{ customer_id: 2, name: 'Bob', order_id: 1, customer_id: 2, item: 'pretzels' },
								{ customer_id: 2, name: 'Bob', order_id: 3, customer_id: 2, item: 'soda' },
								{ customer_id: 3, name: 'Eve', order_id: null, customer_id: null, item: null },
							]
						);
						return;
					} );

				//---------------------------------------------------------------------
				it( `should right join tables`,
					async function ()
					{
						let table = table_customers.Clone();
						table.JoinTable( 0, 'right', table_orders, 1 );
						table.ColumnTitles( [ ...table_customers.ColumnTitles(), ...table_orders.ColumnTitles() ] );
						// Test.
						LIB_ASSERT.strictEqual( table.ColumnCount(), 5, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table.RowCount(), 4, 'mismatched row count' );
						let objects = table.ToObjects();
						LIB_ASSERT.deepStrictEqual( objects,
							[
								{ customer_id: 2, name: 'Bob', order_id: 1, customer_id: 2, item: 'pretzels' },
								{ customer_id: 1, name: 'Alice', order_id: 2, customer_id: 1, item: 'chips' },
								{ customer_id: 2, name: 'Bob', order_id: 3, customer_id: 2, item: 'soda' },
								{ customer_id: null, name: null, order_id: 4, customer_id: 0, item: 'cheeseburger' },
							]
						);
						return;
					} );

				//---------------------------------------------------------------------
				it( `should full join tables`,
					async function ()
					{
						let table = table_customers.Clone();
						table.JoinTable( 0, 'full', table_orders, 1 );
						table.ColumnTitles( [ ...table_customers.ColumnTitles(), ...table_orders.ColumnTitles() ] );
						// Test.
						LIB_ASSERT.strictEqual( table.ColumnCount(), 5, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table.RowCount(), 5, 'mismatched row count' );
						let objects = table.ToObjects();
						LIB_ASSERT.deepStrictEqual( objects,
							[
								{ customer_id: 1, name: 'Alice', order_id: 2, customer_id: 1, item: 'chips' },
								{ customer_id: 2, name: 'Bob', order_id: 1, customer_id: 2, item: 'pretzels' },
								{ customer_id: 2, name: 'Bob', order_id: 3, customer_id: 2, item: 'soda' },
								{ customer_id: 3, name: 'Eve', order_id: null, customer_id: null, item: null },
								{ customer_id: null, name: null, order_id: 4, customer_id: 0, item: 'cheeseburger' },
							]
						);
						return;
					} );


				//---------------------------------------------------------------------
				it( `should join tables with columns projection`,
					async function ()
					{
						let table = table_customers.Clone();
						table.JoinTable( 0, 'inner', table_orders, 1, [ 'order_id', 'item' ] );
						table.ColumnTitles( [ ...table_customers.ColumnTitles(), ...[ 'order_id', 'item' ] ] );
						// Test.
						LIB_ASSERT.strictEqual( table.ColumnCount(), 4, 'mismatched column count' );
						LIB_ASSERT.strictEqual( table.RowCount(), 3, 'mismatched row count' );
						let objects = table.ToObjects();
						LIB_ASSERT.deepStrictEqual( objects,
							[
								{ customer_id: 1, name: 'Alice', order_id: 2, item: 'chips' },
								{ customer_id: 2, name: 'Bob', order_id: 1, item: 'pretzels' },
								{ customer_id: 2, name: 'Bob', order_id: 3, item: 'soda' },
							]
						);
						return;
					} );


				return;
			} );


		return;
	} );
