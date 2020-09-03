"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		ROW MANIPULATION
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.RowCount =
	function RowCount()
	{
		return this.data.rows.length;
	};


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
		if ( AtRow < 0 ) { throw new Error( 'AtRow must be greater than or equal to zero.' ); }
		if ( AtRow >= this.data.rows.length ) { throw new Error( 'AtRow must be less than the number of rows.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }

		// Splice.
		let deleted_rows = this.data.rows.splice( AtRow, Count );

		// Return, OK.
		return deleted_rows;
	};


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
		if ( AtRow < 0 ) { throw new Error( 'AtRow must be greater than or equal to zero.' ); }
		if ( AtRow >= this.data.rows.length ) { throw new Error( 'AtRow must be less than the number of rows.' ); }
		if ( Count < 1 ) { throw new Error( 'Count must be greater than or equal to one.' ); }
		if ( ( AtRow + Count ) > this.data.rows.length ) { throw new Error( 'Operation would exceed available rows.' ); }

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

