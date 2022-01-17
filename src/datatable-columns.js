"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		COLUMN FUNCTIONS
//
//=====================================================================
//=====================================================================


//=====================================================================
//=====================================================================
//
//		DELETE COLUMNS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Deletes a number of columns starting at a specific column index.
 * @param {integer} Count The number of columns to delete.
 * @param {any} AtColumn Must be one of: A zero based column index, a string address, or a RowCol object.
 */
exports.DeleteColumns =
	function DeleteColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( Count ) ) { throw new Error( `Count is required.` ); }
		if ( LIB_UTILS.value_missing( AtColumn ) ) { throw new Error( `AtColumn is required.` ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.ColumnCount() ) { throw new Error( 'Count must be less than or equal to the number of columns.' ); }

		// Convert index to a RowCol
		if ( typeof AtColumn === 'number' )
		{ AtColumn = { col_index: AtColumn }; }
		else if ( typeof AtColumn === 'string' )
		{ AtColumn = { col_addr: AtColumn }; }
		let rowcol = this.RowCol( AtColumn );
		if ( ( rowcol.col_index + Count ) > this.ColumnCount() ) { throw new Error( 'Count plus the starting index must be less than or equal to the number of columns.' ); }

		// Splice columns.
		this.data.columns.splice( rowcol.col_index, Count );
		// this.data.column_headings.splice( rowcol.col_index, Count );
		// this.data.column_infos.splice( rowcol.col_index, Count );

		// Splice rows.
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			let row = this.data.rows[ row_index ];
			if ( rowcol.col_index >= row.length ) { continue; }
			row.splice( rowcol.col_index, Count );
		}

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		CLEAR COLUMNS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Clears all cell values in a number of columns starting at a specific column index.
 * @param {integer} Count The number of columns to clear.
 * @param {any} AtColumn Must be one of: A zero based column index, a string address, or a RowCol object.
 */
exports.ClearColumns =
	function ClearColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( Count ) ) { throw new Error( `Count is required.` ); }
		if ( LIB_UTILS.value_missing( AtColumn ) ) { throw new Error( `AtColumn is required.` ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.ColumnCount() ) { throw new Error( 'Count must be less than or equal to the number of columns.' ); }

		// Convert index to a RowCol
		if ( typeof AtColumn === 'number' )
		{ AtColumn = { col_index: AtColumn }; }
		else if ( typeof AtColumn === 'string' )
		{ AtColumn = { col_addr: AtColumn }; }
		let rowcol = this.RowCol( AtColumn );
		if ( ( rowcol.col_index + Count ) > this.ColumnCount() ) { throw new Error( 'Count plus the starting index must be less than or equal to the number of columns.' ); }

		// Clear columns.
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			for ( let col_index = 0; col_index < Count; col_index++ )
			{
				this.SetValue( LIB_UTILS.clone( this.options.blank_value ), row_index, rowcol.col_index + col_index );
			}
		}

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		INSERT BLANK COLUMNS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Inserts a number of blank columns starting at a specific column index.
 * @param {integer} Count The number of columns to insert.
 * @param {any} AtColumn Must be one of: A zero based column index, a string address, or a RowCol object.
 */
exports.InsertBlankColumns =
	function InsertBlankColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( Count ) ) { throw new Error( `Count is required.` ); }
		if ( LIB_UTILS.value_missing( AtColumn ) ) { throw new Error( `AtColumn is required.` ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }

		// Convert index to a RowCol
		let insert_after = false;
		if ( typeof AtColumn === 'number' )
		{
			if ( AtColumn < 0 ) { insert_after = true; }
			AtColumn = { col_index: AtColumn };
		}
		else if ( typeof AtColumn === 'string' )
		{ AtColumn = { col_addr: AtColumn }; }
		let rowcol = this.RowCol( AtColumn );

		// Splice columns.
		let blank_columns = [];
		// let blank_column_headings = [];
		// let blank_column_infos = [];
		for ( let index = 0; index < Count; index++ ) 
		{
			blank_columns.push( LIB_UTILS.new_column() );
			// blank_column_headings.push( '' );
			// blank_column_infos.push( {} );
		}
		this.data.columns.splice( rowcol.col_index, 0, ...blank_columns );
		// this.data.column_headings.splice( rowcol.col_index, 0, ...blank_column_headings );
		// this.data.column_infos.splice( rowcol.col_index, 0, ...blank_column_infos );

		// Splice rows.
		let blank_values = [];
		for ( let index = 0; index < Count; index++ ) { blank_values.push( this.options.blank_value ); }
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			let row = this.data.rows[ row_index ];
			if ( insert_after )
			{
				row.splice( rowcol.col_index + 1, 0, ...LIB_UTILS.clone( blank_values ) );
			}
			else
			{
				row.splice( rowcol.col_index, 0, ...LIB_UTILS.clone( blank_values ) );
			}
		}

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		FIND COLUMN INDEX
//
//=====================================================================
//=====================================================================


// //---------------------------------------------------------------------
// /**
//  * Finds the column referred to bt `AtColumn`.
//  * @param {any} AtColumn Must be one of: A zero based column index, a string address, or a RowCol object.
//  * @return {int} The found column index.
//  */
// exports.FindColumnIndex =
// 	function FindColumnIndex( AtColumn )
// 	{
// 		// Validate arguments.
// 		if ( LIB_UTILS.value_missing( AtColumn ) ) { throw new Error( `AtColumn is required.` ); }

// 		// Convert index to a RowCol
// 		if ( typeof AtColumn === 'number' )
// 		{
// 			AtColumn = { col_index: AtColumn };
// 		}
// 		else if ( typeof AtColumn === 'string' )
// 		{ AtColumn = { col_addr: AtColumn }; }
// 		let rowcol = this.RowCol( AtColumn );

// 		// Return the column heading.
// 		return rowcol.col_index;
// 	};


//=====================================================================
//=====================================================================
//
//		COLUMN ID
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Gets the id for a specific column.
 * @param {any} AtColumn Must be one of: A zero based column index, a string address, or a RowCol object.
 * @return {string} The id of the specified column.
 */
exports.ColumnID =
	function ColumnID( AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) ) { throw new Error( `AtColumn is required.` ); }

		// Convert index to a RowCol
		if ( typeof AtColumn === 'number' )
		{
			AtColumn = { col_index: AtColumn };
		}
		else if ( typeof AtColumn === 'string' )
		{ AtColumn = { col_addr: AtColumn }; }
		let rowcol = this.RowCol( AtColumn );

		// Return the column id.
		return this.data.columns[ rowcol.col_index ].id;
	};


//=====================================================================
//=====================================================================
//
//		COLUMN HEADING
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Sets or gets the heading for a specific column.
 * @param {any} AtColumn Must be one of: A zero based column index, a string address, or a RowCol object.
 * @param {string} Title The heading to set for the column.
 * 		Omit this parameter or pass `null` to only get the column heading.
 * @return {string} The heading at the specified column.
 */
exports.ColumnTitle =
	function ColumnTitle( AtColumn, Title = null )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) ) { throw new Error( `AtColumn is required.` ); }

		// Convert index to a RowCol
		if ( typeof AtColumn === 'number' )
		{
			AtColumn = { col_index: AtColumn };
		}
		else if ( typeof AtColumn === 'string' )
		{ AtColumn = { col_addr: AtColumn }; }
		let rowcol = this.RowCol( AtColumn );

		if ( !LIB_UTILS.value_missing( Title ) )
		{
			// Set the column heading.
			this.data.columns[ rowcol.col_index ].title = Title;
			// this.data.column_headings[ rowcol.col_index ] = Heading;
		}

		// Return the column heading.
		return this.data.columns[ rowcol.col_index ].title;
	};


//=====================================================================
//=====================================================================
//
//		COLUMN HEADINGS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Sets or gets the all column headings.
 * @param {array} Titles Array of column headings.
 * 		Omit this parameter or pass `null` to get the column headings.
 * @return {array} Array of column headings.
 */
exports.ColumnTitles =
	function ColumnTitles( Titles = null )
	{
		if ( !LIB_UTILS.value_missing( Titles ) )
		{
			if ( !Array.isArray( Titles ) ) { throw new Error( `The parameter [Headings] must be an array.` ); }
			if ( Titles.length > this.ColumnCount() )
			{
				this.InsertBlankColumns( ( Titles.length - this.ColumnCount() ), this.ColumnCount() );
			}
			for ( let index = 0; index < Titles.length; index++ )
			{
				this.data.columns[ index ].title = Titles[ index ];
				// this.data.column_headings[ index ] = Headings[ index ];
			}
		}

		// Return the column heading.
		let headings = this.data.columns.map( item => item.title );
		return headings;
	};


//=====================================================================
//=====================================================================
//
//		COLUMN INFO
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Sets or gets the info for a specific column.
 * @param {any} AtColumn Must be one of: A zero based column index, a string address, or a RowCol object.
 * @param {string} Info The info to set for the column.
 * 		Omit this parameter to get the column info.
 * @return {string} The column info.
 */
exports.ColumnInfo =
	function ColumnInfo( AtColumn, Info )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) ) { throw new Error( `AtColumn is required.` ); }

		// Convert index to a RowCol
		if ( typeof AtColumn === 'number' )
		{
			AtColumn = { col_index: AtColumn };
		}
		else if ( typeof AtColumn === 'string' )
		{ AtColumn = { col_addr: AtColumn }; }
		let rowcol = this.RowCol( AtColumn );

		if ( !LIB_UTILS.value_missing( Info ) )
		{
			// Set the column info.
			this.data.columns[ rowcol.col_index ].info = LIB_UTILS.clone( Info );
		}

		// Return the column info.
		return LIB_UTILS.clone( this.data.columns[ rowcol.col_index ].info );
	};

