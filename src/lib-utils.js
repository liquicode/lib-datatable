"use strict";


//---------------------------------------------------------------------
/**
 * Return TRUE if the given Value is undefined or null.
 * @param {any} Value 
 * @return {boolean} `true` if undefined or null. Otherwise, `false`.
 */
function value_missing( Value )
{
	if ( typeof Value === 'undefined' ) { return true; }
	if ( Value === null ) { return true; }
	return false;
};


//---------------------------------------------------------------------
/**
 * Clones an object using JSON parse-stringify.
 * @param {any} Value 
 * @return {any} The cloned object.
 */
function clone( Value )
{
	return JSON.parse( JSON.stringify( Value ) );
};


//---------------------------------------------------------------------
/**
 * Finds the zero-based index into a set given a set Count and Index.
 * The given Index can be negative to start counting from the last item in the set.
 * @param {number} Count Number of items within the set.
 * @param {number} Index Zero-based index into the set. Can be negative to count from the end.
 * @return {int} The (zero-based) index.
 */
function resolve_index( Count, Index )
{
	if ( value_missing( Count ) ) { throw new Error( `Count is required.` ); }
	if ( value_missing( Index ) ) { throw new Error( `Index is required.` ); }
	if ( Index < 0 ) { Index = ( Count + Index ); }
	if ( Index < 0 ) { Index = null; }
	if ( Index >= Count ) { Index = null; }
	return Index;
};


//---------------------------------------------------------------------
/**
 * Converts a string Address (AB) to a numerical one-based column number.
 * @param {string} Address A string address. This address functions the same to a spreadhseet column address.
 * @return {int} The (one-based) column number.
 */
function address2number( Address )
{
	if ( value_missing( Address ) ) { throw new Error( `Address is required.` ); }
	Address = Address.toUpperCase();
	let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let ich = Address.length;
	let number = 0;
	for ( let index = 0; index < Address.length; index++ )
	{
		ich--;
		let ch = Address.substr( ich, 1 );
		let chval = alphabet.indexOf( ch ) + 1;
		if ( chval <= 0 ) { throw new Error( `Invalid address string [${Address}].` ); }
		chval = chval * ( alphabet.length ** index );
		number += chval;
	}
	return number;
}


//---------------------------------------------------------------------
/**
 * Converts a one-based column number to a string address.
 * This address functions the same to a spreadhseet column address.
 * @param {number} Number A one-based column number.
 * @return {string} The spreadsheet address.
 */
function number2address( Number )
{
	if ( value_missing( Number ) ) { throw new Error( `Number is required.` ); }

	// FROM: https://cwestblog.com/2013/09/05/javascript-snippet-convert-number-to-column-name/
	for ( var address = '', a = 1, b = 26; ( Number -= a ) >= 0; a = b, b *= 26 ) 
	{
		address = String.fromCharCode( parseInt( ( Number % b ) / a ) + 65 ) + address;
	}
	return address;
}


//---------------------------------------------------------------------
/**
 * Tests if an array is composed of unique values.
 * @param {array} array An array of values.
 * @return {boolean} `true` if the array contains unique values. Otherwise, `false`.
 */
function is_unique_array( array )
{
	for ( let index = 0; index < array.length; index++ )
	{
		if ( array.indexOf( array[ index ], index + 1 ) >= 0 ) { return false; }
	}
	return true;
}


//---------------------------------------------------------------------
/**
 * Generate a simplistic unique id.
 * @return {string} A unique id.
 */
function unique_id()
{
	//FROM: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
	var d = new Date().getTime(); // Timestamp
	var d2 = ( ( typeof performance !== 'undefined' ) && performance.now && ( performance.now() * 1000 ) ) || 0; // Time in microseconds since page-load or 0 if unsupported
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c )
	{
		var r = Math.random() * 16;//random number between 0 and 16
		if ( d > 0 )
		{//Use timestamp until depleted
			r = ( d + r ) % 16 | 0;
			d = Math.floor( d / 16 );
		} else
		{//Use microseconds since page-load if supported
			r = ( d2 + r ) % 16 | 0;
			d2 = Math.floor( d2 / 16 );
		}
		return ( c === 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );
	} );
}


//---------------------------------------------------------------------
/**
 * Create a new column object.
 * @return {object} The new column object.
 */
function new_column( Title )
{
	return {
		title: Title || '',
		id: unique_id(),
		calculation: null,
		info: null,
	};
}


//---------------------------------------------------------------------
/**
 * Create a new calculation object.
 * `inputs` is an array of column references which are inputs to the script.
 * The column inputs are used to construct the calculation dependency chain.
 * `script` is a javascript expression to evaluate.
 * 
 * input = {
 * 		at_column: '[Expenses]',	// Source Column
 * 		row_count: -1,				// Rows used in calculation (-1 = All)
 * }
 * 
 * @return {object} The new calculation object.
 */
function new_calculation()
{
	return {
		inputs: [],
		rows_needed: -1,
		script: '',
	};
}


//---------------------------------------------------------------------
exports.value_missing = value_missing;
exports.clone = clone;
exports.resolve_index = resolve_index;
exports.address2number = address2number;
exports.number2address = number2address;
exports.is_unique_array = is_unique_array;
exports.unique_id = unique_id;
exports.new_column = new_column;
