"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		ROW FUNCTIONS
//
//=====================================================================
//=====================================================================


//=====================================================================
//=====================================================================
//
//		TO OBJECT
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Converts a row to an object.
 * @param {any} AtRow Must be one of: A zero based row index, a string address, or a RowCol object.
 */
exports.ToObject =
	function ToObject( AtRow )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtRow ) ) { throw new Error( `AtRow is required.` ); }

		// Convert index to a RowCol
		if ( typeof AtRow === 'number' )
		{ AtRow = { row_index: AtRow }; }
		else if ( typeof AtRow === 'string' )
		{ AtRow = { row_addr: AtRow }; }
		let rowcol = this.RowCol( AtRow );

		// Get Object.
		let obj = {};
		for ( let col_index = 0; col_index < this.data.column_headings.length; col_index++ )
		{
			let heading = this.data.column_headings[ col_index ];
			if ( !heading || !heading.length ) { heading = `column${col_index}`; }
			obj[ heading ] = this.GetValue( rowcol.row_index, col_index );
		}

		// Return, OK.
		return obj;
	};


//=====================================================================
//=====================================================================
//
//		DELETE ROWS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Deletes a number of rows starting at a specific row index.
 * @param {integer} Count The number of rows to delete.
 * @param {any} AtRow Must be one of: A zero based row index, a string address, or a RowCol object.
 */
exports.DeleteRows =
	function DeleteRows( Count, AtRow )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( Count ) ) { throw new Error( `Count is required.` ); }
		if ( LIB_UTILS.value_missing( AtRow ) ) { throw new Error( `AtRow is required.` ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.RowCount() ) { throw new Error( 'Count must be less than or equal to the number of rows.' ); }

		// Convert index to a RowCol
		if ( typeof AtRow === 'number' )
		{ AtRow = { row_index: AtRow }; }
		else if ( typeof AtRow === 'string' )
		{ AtRow = { row_addr: AtRow }; }
		let rowcol = this.RowCol( AtRow );
		if ( ( rowcol.row_index + Count ) > this.RowCount() ) { throw new Error( 'Count plus the starting index must be less than or equal to the number of rows.' ); }

		// Splice.
		this.data.rows.splice( rowcol.row_index, Count );

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		CLEAR ROWS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.ClearRows =
	function ClearRows( Count, AtRow )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( Count ) ) { throw new Error( `Count is required.` ); }
		if ( LIB_UTILS.value_missing( AtRow ) ) { throw new Error( `AtRow is required.` ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.RowCount() ) { throw new Error( 'Count must be less than or equal to the number of rows.' ); }

		// Convert index to a RowCol
		if ( typeof AtRow === 'number' )
		{ AtRow = { row_index: AtRow }; }
		else if ( typeof AtRow === 'string' )
		{ AtRow = { row_addr: AtRow }; }
		let rowcol = this.RowCol( AtRow );
		if ( ( rowcol.row_index + Count ) > this.RowCount() ) { throw new Error( 'Count plus the starting index must be less than or equal to the number of rows.' ); }

		// Clear the rows.
		for ( let index = rowcol.row_index; index < ( rowcol.row_index + Count ); index++ )
		{
			// if ( index < this.data.rows.length )
			// {
			// 	this.data.rows[ index ] = LIB_UTILS.clone( this.options.blank_row );
			// }
			// else
			// {
			// 	this.data.rows.push( LIB_UTILS.clone( this.options.blank_row ) );
			// }
			this.data.rows[ index ] = LIB_UTILS.clone( this.options.blank_row );
		}

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		INSERT BLANK ROWS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.InsertBlankRows =
	function InsertBlankRows( Count, AtRow )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( Count ) ) { throw new Error( `Count is required.` ); }
		if ( LIB_UTILS.value_missing( AtRow ) ) { throw new Error( `AtRow is required.` ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.RowCount() ) { throw new Error( 'Count must be less than or equal to the number of rows.' ); }

		// Convert index to a RowCol
		let insert_after = false;
		if ( typeof AtRow === 'number' )
		{
			if ( AtRow < 0 ) { insert_after = true; }
			AtRow = { row_index: AtRow };
		}
		else if ( typeof AtRow === 'string' )
		{ AtRow = { row_addr: AtRow }; }
		let rowcol = this.RowCol( AtRow );
		if ( rowcol.row_index >= this.RowCount() ) { throw new Error( 'Starting index must be less than the number of rows.' ); }

		// // Add blank rows to reach AtRow.
		// while ( AtRow.row_index > this.data.rows.length )
		// {
		// 	this.data.rows.push( LIB_UTILS.clone( this.options.blank_row ) );
		// }

		// Get blank rows.
		let new_rows = [];
		for ( let index = 0; index < Count; index++ )
		{ new_rows.push( LIB_UTILS.clone( this.options.blank_row ) ); }

		// Insert rows.
		if ( insert_after )
		{
			this.data.rows.splice( rowcol.row_index + 1, 0, ...new_rows );
		}
		else
		{
			this.data.rows.splice( rowcol.row_index, 0, ...new_rows );
		}

		// if ( AtRow.row_index === this.data.rows.length )
		// {
		// 	// Append Rows
		// 	this.data.rows.push( ...new_rows );
		// }
		// else
		// {
		// 	// Insert Rows
		// 	this.data.rows.splice( AtRow.row_index, 0, ...new_rows );
		// }

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		INSERT ROWS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.InsertRows =
	function InsertRows( Matrix, AtRow )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtRow ) ) { AtRow = 0; }
		if ( LIB_UTILS.value_missing( Matrix ) ) 
		{
			Matrix = [ LIB_UTILS.clone( this.options.blank_row ) ];
		}

		// Add blank rows to reach AtRow.
		while ( AtRow > this.data.rows.length )
		{
			this.data.rows.push( LIB_UTILS.clone( this.options.blank_row ) );
		}

		// Check to extend the column headings.
		{
			let col_count = 0;
			Matrix.forEach(
				row =>
				{
					if ( col_count < row.length )
					{ col_count = row.length; }
				} );
			while ( col_count > this.data.column_headings.length )
			{
				this.data.column_headings.push( '' );
				this.data.column_infos.push( {} );
			}
		}

		// Insert rows.
		if ( AtRow === this.data.rows.length )
		{
			// Append Rows
			this.data.rows.push( ...Matrix );
		}
		else
		{
			// Insert Rows
			this.data.rows.splice( AtRow, 0, ...Matrix );
		}

		// Return, OK.
		return;
	};


