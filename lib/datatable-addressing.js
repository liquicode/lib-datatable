"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		ADDRESSING
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.RowCount =
	function RowCount( Count )
	{
		if ( Count < 0 ) { throw new Error( `Count must be zero or positive.` ); }

		// If Count is supplied, then adjust the row count.
		if ( !LIB_UTILS.value_missing( Count ) )
		{
			// Add rows.
			while ( Count > this.data.rows.length )
			{
				this.data.rows.push( [] );
			}
			// Remove rows.
			this.data.rows.splice( Count );
		}

		// Return the row count.
		return this.data.rows.length;
	};


//---------------------------------------------------------------------
exports.ColumnCount =
	function ColumnCount( Count )
	{
		if ( Count < 0 ) { throw new Error( `Count must be zero or positive.` ); }

		// If Count is supplied, then adjust the column count.
		if ( !LIB_UTILS.value_missing( Count ) )
		{
			// Add column headers.
			while ( Count > this.data.column_headings.length )
			{
				this.data.column_headings.push( {} );
			}
			// Remove column headers.
			this.data.column_headings.splice( Count );
		}

		// Return the column count.
		return this.data.column_headings.length;
	};


//---------------------------------------------------------------------
exports.SetSize =
	function SetSize( RowCount, ColCount )
	{
		// Validate the prameters.
		if ( LIB_UTILS.value_missing( RowCount ) ) { throw new Error( `RowCount is required.` ); }
		if ( LIB_UTILS.value_missing( ColCount ) ) { throw new Error( `ColCount is required.` ); }

		// Set the counts.
		this.RowCount( RowCount );
		this.ColumnCount( ColCount );

		// Return, OK.
		return;
	};


//---------------------------------------------------------------------
/**
 * Constructs a RowCol object from two numerical indexes,
 * a string (spreadsheet like) address,
 * or another RowCol object.
 * @param {any} RowIndex A zero-based row index, a string address, or a RowCol object.
 * @param {number} ColIndex A zero-based column index.
 * @returns A RowCol object.
 */
exports.RowCol =
	function RowCol( RowIndex, ColIndex )
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

		if ( typeof RowIndex === 'object' )
		{

			// Resolve the row_index.
			if ( !LIB_UTILS.value_missing( RowIndex.row_index ) )
			{
				if ( RowIndex.row_index >= 0 )
				{
					row_col.row_index = LIB_UTILS.resolve_index( Number.MAX_SAFE_INTEGER, RowIndex.row_index );
				}
				else
				{
					row_col.row_index = LIB_UTILS.resolve_index( this.data.rows.length, RowIndex.row_index );
				}
			}
			else if ( !LIB_UTILS.value_missing( RowIndex.row_num ) )
			{
				if ( RowIndex.row_num < 0 ) { throw new Error( `RowCol.row_num must be zero or positive.` ); }
				row_col.row_index = RowIndex.row_num - 1;
			}
			else if ( !LIB_UTILS.value_missing( RowIndex.row_addr ) )
			{
				row_col.row_index = LIB_UTILS.address2number( RowIndex.row_addr ) - 1;
			}

			// Resolve the col_index.
			if ( !LIB_UTILS.value_missing( RowIndex.col_index ) )
			{
				if ( RowIndex.col_index >= 0 )
				{
					row_col.col_index = LIB_UTILS.resolve_index( Number.MAX_SAFE_INTEGER, RowIndex.col_index );
				}
				else
				{
					row_col.col_index = LIB_UTILS.resolve_index( this.data.column_headings.length, RowIndex.col_index );
				}
			}
			else if ( !LIB_UTILS.value_missing( RowIndex.col_num ) )
			{
				if ( RowIndex.col_num < 0 ) { throw new Error( `RowCol.col_num must be zero or positive.` ); }
				row_col.col_index = RowIndex.col_num - 1;
			}
			else if ( !LIB_UTILS.value_missing( RowIndex.col_addr ) )
			{
				row_col.col_index = LIB_UTILS.address2number( RowIndex.col_addr ) - 1;
			}

		}
		else if ( typeof RowIndex === 'string' )
		{
			// Split Column and Row parts (column address, row number).
			for ( let index = 0; index < RowIndex.length; index++ )
			{
				let ch = RowIndex.substr( index, 1 );
				if ( !isNaN( parseInt( ch ) ) )
				{
					row_col.col_addr = RowIndex.substr( 0, index );
					row_col.row_num = parseInt( RowIndex.substr( index ) );
					break;
				}
			}
			if ( ( row_col.col_addr === null ) || ( row_col.row_num === null ) )
			{
				throw new Error( `Invalid address [${RowIndex}].` );
			}
			row_col.row_index = row_col.row_num - 1;
			row_col.col_index = LIB_UTILS.address2number( row_col.col_addr ) - 1;
		}
		else if ( typeof RowIndex === 'number'
			&& typeof ColIndex === 'number' )
		{
			if ( RowIndex >= 0 )
			{
				row_col.row_index = LIB_UTILS.resolve_index( Number.MAX_SAFE_INTEGER, RowIndex );
			}
			else
			{
				row_col.row_index = LIB_UTILS.resolve_index( this.data.rows.length, RowIndex );
			}
			if ( ColIndex >= 0 )
			{
				row_col.col_index = LIB_UTILS.resolve_index( Number.MAX_SAFE_INTEGER, ColIndex );
			}
			else
			{
				row_col.col_index = LIB_UTILS.resolve_index( this.data.column_headings.length, ColIndex );
			}
		}
		else
		{
			throw new Error( `Invalid parameters. Must be called with one of: ( RowCol ), ( Address ), or ( RowIndex, ColIndex )` );
			return row_col; // Return the uninitialized RowCol object.
		}

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

