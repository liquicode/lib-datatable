"use strict";


const TestMatrixSize = 32;


//---------------------------------------------------------------------
var CountMatrix = [];
{
	let cell_count = 0;
	for ( let row_index = 0; row_index < TestMatrixSize; row_index++ )
	{
		let row = [];
		for ( let col_index = 0; col_index < TestMatrixSize; col_index++ )
		{
			row.push( cell_count );
			cell_count++;
		}
		CountMatrix.push( row );
	}
}

//---------------------------------------------------------------------
var PartialCountMatrix = [];
{
	let cell_count = 0;
	for ( let row_index = 0; row_index < TestMatrixSize; row_index++ )
	{
		let row = [];
		for ( let col_index = 0; col_index < TestMatrixSize; col_index++ )
		{
			if ( col_index <= row_index )
			{
				row.push( cell_count );
				cell_count++;
			}
		}
		PartialCountMatrix.push( row );
	}
}

//---------------------------------------------------------------------
var SumMatrix = [];
{
	for ( let row_index = 0; row_index < TestMatrixSize; row_index++ )
	{
		let row = [];
		for ( let col_index = 0; col_index < TestMatrixSize; col_index++ )
		{
			let value = ( row_index + col_index );
			row.push( value );
		}
		SumMatrix.push( row );
	}
}

//---------------------------------------------------------------------
var ProductMatrix = [];
{
	for ( let row_index = 0; row_index < TestMatrixSize; row_index++ )
	{
		let row = [];
		for ( let col_index = 0; col_index < TestMatrixSize; col_index++ )
		{
			let value = ( row_index * col_index );
			row.push( value );
		}
		ProductMatrix.push( row );
	}
}


exports.TestMatrixSize = TestMatrixSize;
exports.CountMatrix = CountMatrix;
exports.PartialCountMatrix = PartialCountMatrix;
exports.SumMatrix = SumMatrix;
exports.ProductMatrix = ProductMatrix;

