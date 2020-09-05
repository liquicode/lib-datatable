"use strict";


const LIB_UTILS = require( './lib-utils.js' );
exports._docs = [];


//=====================================================================
//=====================================================================
//
//		COLUMN MANIPULATION
//
//=====================================================================
//=====================================================================
exports._docs.push(
	{
		category: "Column Manipulation",
		type: "narrative",
		description: `
		Functions to inspect and manipulate the columns of a Datatable.
		`
	}
);


//=====================================================================
//=====================================================================
//
//		COLUMN COUNT
//
//=====================================================================
//=====================================================================
exports._docs.push(
	{
		category: "Column Manipulation",
		type: "function",
		name: "ColumnCount()",

		returns:
			[
				{ name: "Count", type: "number", desc: "The number of columns in the Datatable." },
			],

		description: `
			Gets the number of columns in the Datatable.
			This number can be zero.
			`,

		invocations:
			[
				{ code: "ColumnCount()", desc: "Gets the number of columns." },
			],
	} );
//---------------------------------------------------------------------
exports.ColumnCount =
	function ColumnCount()
	{
		return this.data.column_headings.length;
	};


//=====================================================================
//=====================================================================
//
//		DELETE COLUMNS
//
//=====================================================================
//=====================================================================
exports._docs.push(
	{
		category: "Column Manipulation",
		type: "function",
		name: "DeleteColumns( Count, AtColumn )",

		parameters:
			[
				{ name: "Count", type: "number", reqd: false, desc: "The number of columns to delete." },
				{ name: "AtColumn", type: "number", reqd: false, desc: "The column index to delete at." },
			],

		description: `
			Deletes a number of columns starting at a specific column index.
			You can use a negative column index to delete columns from the end.
			`,

		invocations:
			[
				{ code: "DeleteColumns()", desc: "Delete all columns." },
				{ code: "DeleteColumns( 1 )", desc: "Delete the first column." },
				{ code: "DeleteColumns( 1, 0 )", desc: "Delete the first column." },
				{ code: "DeleteColumns( 3, 2 )", desc: "Delete three columns starting at column index 2." },
				{ code: "DeleteColumns( 3, -1 )", desc: "Delete the last three columns." },
			],
	} );
//---------------------------------------------------------------------
exports.DeleteColumns =
	function DeleteColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) && LIB_UTILS.value_missing( Count ) )
		{
			AtColumn = 0;
			Count = this.data.column_headings.length;
		}
		else
		{
			if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
			if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }
		}
		if ( AtColumn < -1 ) { throw new Error( 'AtColumn must be either -1 or greater than or equal to zero.' ); }
		if ( AtColumn >= this.data.column_headings.length ) { throw new Error( 'AtColumn must be less than the number of columns.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.data.column_headings.length ) { throw new Error( 'Count must be less than or equal to the number of columns.' ); }
		if ( AtColumn === -1 ) { AtColumn = ( this.data.column_headings.length - Count ); }

		// Splice column_headings.
		this.data.column_headings.splice( AtColumn, Count );

		// Splice rows.
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			let row = this.data.rows[ row_index ];
			if ( AtColumn >= row.length ) { continue; }
			row.splice( AtColumn, Count );
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
exports._docs.push(
	{
		category: "Column Manipulation",
		type: "function",
		name: "ClearColumns( Count, AtColumn )",

		parameters:
			[
				{ name: "Count", type: "number", reqd: false, desc: "The number of columns to clear." },
				{ name: "AtColumn", type: "number", reqd: false, desc: "The column index to clear at." },
			],

		description: `
				Clears a number of columns starting at a specific column index.
				You can use a negative column index to clear columns from the end.
				`,

		invocations:
			[
				{ code: "ClearColumns()", desc: "Clear all columns." },
				{ code: "ClearColumns( 1 )", desc: "Clear the first column." },
				{ code: "ClearColumns( 1, 0 )", desc: "Clear the first column." },
				{ code: "ClearColumns( 3, 2 )", desc: "Clear three columns starting at column index 2." },
				{ code: "ClearColumns( 3, -1 )", desc: "Clear the last three columns." },
			],
	} );
//---------------------------------------------------------------------
exports.ClearColumns =
	function ClearColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) && LIB_UTILS.value_missing( Count ) )
		{
			AtColumn = 0;
			Count = this.data.column_headings.length;
		}
		else
		{
			if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
			if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }
		}
		if ( AtColumn < -1 ) { throw new Error( 'AtColumn must be either -1 or greater than or equal to zero.' ); }
		if ( AtColumn >= this.data.column_headings.length ) { throw new Error( 'AtColumn must be less than the number of columns.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.data.column_headings.length ) { throw new Error( 'Count must be less than or equal to the number of columns.' ); }
		if ( AtColumn === -1 ) { AtColumn = ( this.data.column_headings.length - Count ); }

		// Clear columns.
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			for ( let col_index = 0; col_index < Count; col_index++ )
			{
				this.SetValue( LIB_UTILS.clone( this.options.blank_value ), row_index, AtColumn + col_index );
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
exports._docs.push(
	{
		category: "Column Manipulation",
		type: "function",
		name: "InsertBlankColumns( Count, AtColumn )",

		parameters:
			[
				{ name: "Count", type: "number", reqd: false, desc: "The number of columns to insert." },
				{ name: "AtColumn", type: "number", reqd: false, desc: "The column index to insert at." },
			],

		description: `
				Inserts a number of columns starting at a specific column index.
				You can use a negative column index to insert columns to the end.
				`,

		invocations:
			[
				{ code: "InsertBlankColumns()", desc: "Insert a single blank column at the beginning." },
				{ code: "InsertBlankColumns( 3 )", desc: "Insert three blank columns at the beginning." },
				{ code: "InsertBlankColumns( 3, 0 )", desc: "Insert three blank columns at the beginning." },
				{ code: "InsertBlankColumns( 3, 5 )", desc: "Insert three blank columns at column index 5." },
				{ code: "InsertBlankColumns( 3, -1 )", desc: "Insert three blank columns at the end." },
			],
	} );
//---------------------------------------------------------------------
exports.InsertBlankColumns =
	function InsertBlankColumns( Count, AtColumn )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtColumn ) && LIB_UTILS.value_missing( Count ) )
		{
			AtColumn = 0;
			Count = 1;
		}
		else
		{
			if ( LIB_UTILS.value_missing( AtColumn ) ) { AtColumn = 0; }
			if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }
		}
		if ( AtColumn < -1 ) { throw new Error( 'AtColumn must be either -1 or greater than or equal to zero.' ); }
		if ( AtColumn >= this.data.column_headings.length ) { throw new Error( 'AtColumn must be less than the number of columns.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.data.column_headings.length ) { throw new Error( 'Count must be less than or equal to the number of columns.' ); }
		if ( AtColumn === -1 ) { AtColumn = ( this.data.column_headings.length - Count ); }

		// Splice column_headings.
		let blank_columns = [];
		for ( let index = 0; index < Count; index++ ) { blank_columns.push( '' ); }
		this.data.column_headings.splice( AtColumn, 0, ...blank_columns );

		// Splice rows.
		blank_columns = [];
		for ( let index = 0; index < Count; index++ ) { blank_columns.push( this.options.blank_value ); }
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			let row = this.data.rows[ row_index ];
			row.splice( AtColumn, 0, ...LIB_UTILS.clone( blank_columns ) );
		}

		// Return, OK.
		return;
	};

