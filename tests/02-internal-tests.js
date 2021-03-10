"use strict";


const LibDatatable = require( '../src/lib-datatable.js' );
const LIB_UTILS = require( '../src/lib-utils.js' );
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
				let table = LibDatatable.NewDatatable();
				LIB_ASSERT.ok( table );
				LIB_ASSERT.strictEqual( table.data.rows.length, 0 );
				LIB_ASSERT.strictEqual( table.data.column_headings.length, 0 );
				return;
			} );

		//---------------------------------------------------------------------
		it( `creates a datatable from a matrix`,
			async function ()
			{
				let table = LibDatatable.NewDatatableFromMatrix( LIB_TEST.ProductMatrix );
				LIB_ASSERT.ok( table );
				LIB_ASSERT.strictEqual( table.data.rows.length, LIB_TEST.MatrixSize );
				LIB_ASSERT.strictEqual( table.data.column_headings.length, LIB_TEST.MatrixSize );
				return;
			} );


		return;
	} );
