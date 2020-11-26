"use strict";


//---------------------------------------------------------------------
/**
 * Return TRUE if the given Value is undefined or null.
 * @param {any} Value 
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
exports.value_missing = value_missing;
exports.clone = clone;
exports.resolve_index = resolve_index;
exports.address2number = address2number;
exports.number2address = number2address;
