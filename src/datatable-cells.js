"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		CELL FUNCTIONS
//
//=====================================================================
//=====================================================================


//=====================================================================
//=====================================================================
//
//		ROWCOL
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Constructs a RowCol object from two numerical indexes,
 * a string (spreadsheet like) address,
 * or another RowCol object.
 * @param {any} AtRow Must be one of: A zero based row index, a string address, or a RowCol object.
 * @param {integer} AtColumn If RowIndex is specified as a numeric index, then this parameter is also
 * 		required and must also be a column index.
 * @returns A RowCol object.
 */
exports.RowCol =
	function RowCol( AtRow, AtColumn )
	{
		let row_col =
		{
			row_num: null,
			row_addr: null,
			row_index: null,
			col_num: null,
			col_addr: null,
			col_index: null,
		};
		// if ( LIB_UTILS.value_missing( RowCol ) ) { return row_col; }

		if ( typeof AtRow === 'object' && ( AtRow !== null ) )
		{

			// Resolve the row_index.
			if ( !LIB_UTILS.value_missing( AtRow.row_index ) )
			{
				if ( AtRow.row_index >= 0 )
				{
					row_col.row_index = LIB_UTILS.resolve_index( Number.MAX_SAFE_INTEGER, AtRow.row_index );
				}
				else
				{
					row_col.row_index = LIB_UTILS.resolve_index( this.data.rows.length, AtRow.row_index );
				}
			}
			else if ( !LIB_UTILS.value_missing( AtRow.row_num ) )
			{
				if ( AtRow.row_num < 0 ) { throw new Error( `RowCol.row_num must be zero or positive.` ); }
				row_col.row_index = AtRow.row_num - 1;
			}
			else if ( !LIB_UTILS.value_missing( AtRow.row_addr ) )
			{
				row_col.row_index = LIB_UTILS.address2number( AtRow.row_addr ) - 1;
			}

			// Resolve the col_index.
			if ( !LIB_UTILS.value_missing( AtRow.col_index ) )
			{
				if ( AtRow.col_index >= 0 )
				{
					row_col.col_index = LIB_UTILS.resolve_index( Number.MAX_SAFE_INTEGER, AtRow.col_index );
				}
				else
				{
					row_col.col_index = LIB_UTILS.resolve_index( this.data.column_headings.length, AtRow.col_index );
				}
			}
			else if ( !LIB_UTILS.value_missing( AtRow.col_num ) )
			{
				if ( AtRow.col_num < 0 ) { throw new Error( `RowCol.col_num must be zero or positive.` ); }
				row_col.col_index = AtRow.col_num - 1;
			}
			else if ( !LIB_UTILS.value_missing( AtRow.col_addr ) )
			{
				row_col.col_index = LIB_UTILS.address2number( AtRow.col_addr ) - 1;
			}

		}
		else if ( typeof AtRow === 'string' )
		{
			// Split Column and Row parts (column address, row number).
			for ( let index = 0; index < AtRow.length; index++ )
			{
				let ch = AtRow.substr( index, 1 );
				if ( !isNaN( parseInt( ch ) ) )
				{
					row_col.col_addr = AtRow.substr( 0, index );
					row_col.row_num = parseInt( AtRow.substr( index ) );
					break;
				}
			}
			if ( ( row_col.col_addr === null ) || ( row_col.row_num === null ) )
			{
				throw new Error( `Invalid address [${AtRow}].` );
			}
			row_col.row_index = row_col.row_num - 1;
			row_col.col_index = LIB_UTILS.address2number( row_col.col_addr ) - 1;
		}
		else 
		{
			if ( !LIB_UTILS.value_missing( AtRow ) )
			{
				if ( typeof AtRow === 'number' )
				{
					if ( AtRow >= 0 )
					{
						row_col.row_index = LIB_UTILS.resolve_index( Number.MAX_SAFE_INTEGER, AtRow );
					}
					else
					{
						row_col.row_index = LIB_UTILS.resolve_index( this.data.rows.length, AtRow );
					}
				}
			}

			if ( !LIB_UTILS.value_missing( AtColumn ) )
			{
				if ( typeof AtColumn === 'string' )
				{
					AtColumn = LIB_UTILS.address2number( AtColumn ) - 1;
				}
				if ( AtColumn >= 0 )
				{
					row_col.col_index = LIB_UTILS.resolve_index( Number.MAX_SAFE_INTEGER, AtColumn );
				}
				else
				{
					row_col.col_index = LIB_UTILS.resolve_index( this.data.column_headings.length, AtColumn );
				}
			}
		}

		// else
		// {
		// 	throw new Error( `Invalid parameters. Must be called with one of: ( RowCol ), ( Address ), or ( RowIndex, ColIndex )` );
		// 	return row_col; // Return the uninitialized RowCol object.
		// }

		// Calculate alternate row addresses.
		if ( row_col.row_index !== null )
		{
			row_col.row_num = row_col.row_index + 1;
			row_col.row_addr = LIB_UTILS.number2address( row_col.row_num );
		}

		// Calculate alternate row addresses.
		if ( row_col.col_index !== null )
		{
			row_col.col_num = row_col.col_index + 1;
			row_col.col_addr = LIB_UTILS.number2address( row_col.col_num );
		}

		// Return the address object.
		return row_col;
	};


//=====================================================================
//=====================================================================
//
//		GET VALUE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Gets the value stored at a specific location within the datatable.
 * @param {any} AtRow Must be one of: A zero based row index, a string address, or a RowCol object.
 * @param {integer} AtColumn If AtRow is specified as a numeric index, then this parameter is also
 * 		required and must also be a column index.
 * @returns This function returns the value stored in the cell found at the specified location.
 */
exports.GetValue =
	function GetValue( AtRow, AtColumn )
	{
		// Get the location.
		let rowcol = this.RowCol( AtRow, AtColumn );
		if ( rowcol.row_index === null ) { throw new Error( `Invalid RowIndex [${rowcol.row_index}].` ); }
		if ( rowcol.col_index === null ) { throw new Error( `Invalid ColIndex [${rowcol.col_index}].` ); }

		// Get the row.
		if ( rowcol.row_index >= this.data.rows.length ) { throw new Error( `RowIndex [${rowcol.row_index}] does not exist.` ); }
		let row = this.data.rows[ rowcol.row_index ];

		// Get the value.
		if ( rowcol.col_index >= row.length ) { return LIB_UTILS.clone( this.options.blank_value ); }
		let value = row[ rowcol.col_index ];

		// Return, OK.
		return value;
	};


//=====================================================================
//=====================================================================
//
//		SET VALUE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Sets the value stored at a specific location within the datatable.
 * @param {any} Value The value to set at the location.
 * @param {any} AtRow Must be one of: A zero based row index, a string address, or a RowCol object.
 * @param {integer} AtColumn If RowIndex is specified as a numeric index, then this parameter is also
 * 		required and must also be a column index.
 */
exports.SetValue =
	function SetValue( Value, AtRow, AtColumn )
	{
		// Get the location.
		let rowcol = this.RowCol( AtRow, AtColumn );
		if ( rowcol.row_index === null ) { throw new Error( `Invalid RowIndex [${rowcol.row_index}].` ); }
		if ( rowcol.col_index === null ) { throw new Error( `Invalid ColIndex [${rowcol.col_index}].` ); }

		// Get the row.
		let row = this.data.rows[ rowcol.row_index ];

		// Extend the column_headings to include ColIndex.
		while ( rowcol.col_index >= this.data.column_headings.length )
		{
			this.data.column_headings.push( '' );
			this.data.column_infos.push( {} );
		}

		// Extend the row to include ColIndex.
		while ( rowcol.col_index >= row.length )
		{ row.push( LIB_UTILS.clone( this.options.blank_value ) ); }

		// Set the value.
		row[ rowcol.col_index ] = Value;

		// Return, OK.
		return;
	};

