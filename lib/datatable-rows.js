"use strict";


const LIB_UTILS = require( './lib-utils.js' );
exports._docs = [];


//=====================================================================
//=====================================================================
//
//		ROW MANIPULATION
//
//=====================================================================
//=====================================================================
exports._docs.push(
	{
		category: "Row Manipulation",
		type: "narrative",
		description: `
		Functions to inspect and manipulate the rows of a Datatable.
		`
	}
);


//=====================================================================
//=====================================================================
//
//		ROW COUNT
//
//=====================================================================
//=====================================================================
exports._docs.push(
	{
		category: "Row Manipulation",
		type: "function",
		name: "RowCount()",

		returns:
			[
				{ name: "Count", type: "number", desc: "The number of rows in the Datatable." },
			],

		description: `
			Gets the number of rows in the Datatable.
			This number can be zero.
			`,

		invocations:
			[
				{ code: "RowCount()", desc: "Gets the number of rows." },
			],
	} );
// //---------------------------------------------------------------------
// exports.RowCount =
// 	function RowCount()
// 	{
// 		return this.data.rows.length;
// 	};


//=====================================================================
//=====================================================================
//
//		DELETE ROWS
//
//=====================================================================
//=====================================================================
exports._docs.push(
	{
		category: "Row Manipulation",
		type: "function",
		name: "DeleteRows( Count, AtRow )",

		parameters:
			[
				{ name: "Count", type: "number", reqd: false, desc: "The number of rows to delete." },
				{ name: "AtRow", type: "number", reqd: false, desc: "The row index to delete at." },
			],

		description: `
			Deletes a number of rows starting at a specific column index.
			You can use a negative row index to delete rows from the end.
			`,

		invocations:
			[
				{ code: "DeleteRows()", desc: "Delete all rows." },
				{ code: "DeleteRows( 1 )", desc: "Delete the first row." },
				{ code: "DeleteRows( 1, 0 )", desc: "Delete the first row." },
				{ code: "DeleteRows( 3, 2 )", desc: "Delete three rows starting at row index 2." },
				{ code: "DeleteRows( 3, -1 )", desc: "Delete the last three rows." },
			],
	} );
//---------------------------------------------------------------------
exports.DeleteRows =
	function DeleteRows( Count, AtRow )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtRow ) && LIB_UTILS.value_missing( Count ) )
		{
			AtRow = 0;
			Count = this.data.rows.length;
		}
		else
		{
			if ( LIB_UTILS.value_missing( AtRow ) ) { AtRow = 0; }
			if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }
		}
		if ( AtRow < -1 ) { throw new Error( 'AtRow must be either -1 or greater than or equal to zero.' ); }
		if ( AtRow >= this.data.rows.length ) { throw new Error( 'AtRow must be less than the number of rows.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.data.rows.length ) { throw new Error( 'Count must be less than or equal to the number of rows.' ); }
		if ( AtRow === -1 ) { AtRow = ( this.data.rows.length - Count ); }

		// Splice.
		this.data.rows.splice( AtRow, Count );

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
exports._docs.push(
	{
		category: "Row Manipulation",
		type: "function",
		name: "ClearRows( Count, AtRow )",

		parameters:
			[
				{ name: "Count", type: "number", reqd: false, desc: "The number of rows to clear." },
				{ name: "AtRow", type: "number", reqd: false, desc: "The row index to clear at." },
			],

		description: `
			Clears a number of rows starting at a specific row index.
			You can use a negative row index to clear rows from the end.
			`,

		invocations:
			[
				{ code: "ClearRows()", desc: "Clear all rows." },
				{ code: "ClearRows( 1 )", desc: "Clear the first row." },
				{ code: "ClearRows( 1, 0 )", desc: "Clear the first row." },
				{ code: "ClearRows( 3, 2 )", desc: "Clear three rows starting at row index 2." },
				{ code: "ClearRows( 3, -1 )", desc: "Clear the last three rows." },
			],
	} );
//---------------------------------------------------------------------
exports.ClearRows =
	function ClearRows( Count, AtRow )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtRow ) && LIB_UTILS.value_missing( Count ) )
		{
			AtRow = 0;
			Count = this.data.rows.length;
		}
		else
		{
			if ( LIB_UTILS.value_missing( AtRow ) ) { AtRow = 0; }
			if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }
		}
		if ( AtRow < -1 ) { throw new Error( 'AtRow must be either -1 or greater than or equal to zero.' ); }
		if ( AtRow >= this.data.rows.length ) { throw new Error( 'AtRow must be less than the number of rows.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( Count > this.data.rows.length ) { throw new Error( 'Count must be less than or equal to the number of rows.' ); }
		if ( AtRow === -1 ) { AtRow = ( this.data.rows.length - Count ); }
		// if ( ( AtRow + Count ) > this.data.rows.length ) { throw new Error( 'Operation would exceed available rows.' ); }

		// Clear the rows.
		for ( let index = AtRow; index < ( AtRow + Count ); index++ )
		{
			if ( index < this.data.rows.length )
			{
				this.data.rows[ index ] = LIB_UTILS.clone( this.options.blank_row );
			}
			else
			{
				this.data.rows.push( LIB_UTILS.clone( this.options.blank_row ) );
			}
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
exports._docs.push(
	{
		category: "Row Manipulation",
		type: "function",
		name: "InsertBlankRows( Count, AtRow )",

		parameters:
			[
				{ name: "Count", type: "number", reqd: false, desc: "The number of rows to insert." },
				{ name: "AtRow", type: "number", reqd: false, desc: "The row index to insert at." },
			],

		description: `
			Inserts a number of blank rows starting at a specific row index.
			You can use a negative row index to insert rows from the end.
			`,

		invocations:
			[
				{ code: "InsertBlankRows()", desc: "Insert a single blank row at the beginning." },
				{ code: "InsertBlankRows( 3 )", desc: "Insert three rows at the beginning." },
				{ code: "InsertBlankRows( 3, 0 )", desc: "Insert three rows at the beginning." },
				{ code: "InsertBlankRows( 3, 5 )", desc: "Insert three rows at row index 5." },
				{ code: "InsertBlankRows( 3, -1 )", desc: "Insert three rows at the end." },
			],
	} );
//---------------------------------------------------------------------
exports.InsertBlankRows =
	function InsertBlankRows( Count, AtRow )
	{
		// Validate arguments.
		if ( LIB_UTILS.value_missing( AtRow ) ) { AtRow = 0; }
		if ( LIB_UTILS.value_missing( Count ) ) { Count = 1; }

		// Add blank rows to reach AtRow.
		while ( AtRow > this.data.rows.length )
		{
			this.data.rows.push( LIB_UTILS.clone( this.options.blank_row ) );
		}

		// Get blank rows.
		let new_rows = [];
		for ( let index = 0; index < Count; index++ )
		{ new_rows.push( LIB_UTILS.clone( this.options.blank_row ) ); }

		// Insert rows.
		if ( AtRow === this.data.rows.length )
		{
			// Append Rows
			this.data.rows.push( ...new_rows );
		}
		else
		{
			// Insert Rows
			this.data.rows.splice( AtRow, 0, ...new_rows );
		}

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
exports._docs.push(
	{
		category: "Row Manipulation",
		type: "function",
		name: "InsertRows( Matrix, AtRow )",

		parameters:
			[
				{ name: "Matrix", type: "number", reqd: true, desc: "The matrix of rows to insert." },
				{ name: "AtRow", type: "number", reqd: false, desc: "The row index to insert at." },
			],

		description: `
			Inserts a number of rows from the given matrix starting at a specific row index.
			You can use a negative row index to insert rows from the end.
			`,

		invocations:
			[
				{ code: "InsertRows( matrix )", desc: "Insert rows from matrix at the beginning." },
				{ code: "InsertRows( matrix, 0 )", desc: "Insert rows from matrix at the beginning." },
				{ code: "InsertRows( matrix, 5 )", desc: "Insert rows from matrix at row index 5." },
				{ code: "InsertRows( matrix, -1 )", desc: "Insert rows from matrix at the end." },
				{ code: "InsertRows( matrix, -3 )", desc: "Insert rows from matrix at three rows before the end." },
			],
	} );
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


