"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		TABLE FUNCTIONS
//
//=====================================================================
//=====================================================================


//=====================================================================
//=====================================================================
//
//		ROW COUNT
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Used to get and set the number of rows in a `Datatable`.
 * @param {integer} Count (optional) When supplied, changes the number of rows.
 * @returns The number of rows in the `Datatable`
 */
exports.RowCount =
	function RowCount( Count )
	{
		// If Count is supplied, then adjust the row count.
		if ( !LIB_UTILS.value_missing( Count ) )
		{
			if ( Count < 0 ) { throw new Error( `Count must be zero or positive.` ); }

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


//=====================================================================
//=====================================================================
//
//		COLUMN COUNT
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Used to get and set the number of columns in a `Datatable`.
 * @param {integer} Count (optional) When supplied, changes the number of columns.
 * @returns The number of columns in the `Datatable`
 */
exports.ColumnCount =
	function ColumnCount( Count )
	{
		// If Count is supplied, then adjust the column count.
		if ( !LIB_UTILS.value_missing( Count ) )
		{
			if ( Count < 0 ) { throw new Error( `Count must be zero or positive.` ); }

			// Add column headers.
			while ( Count > this.data.column_headings.length )
			{
				this.data.column_headings.push( '' );
				this.data.column_infos.push( {} );
			}
			// Remove column headers.
			this.data.column_headings.splice( Count );
			this.data.column_infos.splice( Count );
		}

		// Return the column count.
		return this.data.column_headings.length;
	};


//=====================================================================
//=====================================================================
//
//		SET SIZE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Used to set the number of rows and/or columns in a `Datatable`.
 * @param {integer} RowCount When supplied, changes the number of rows.
 * @param {integer} ColumnCount When supplied, changes the number of columns.
 * @returns nothing
 */
exports.SetSize =
	function SetSize( RowCount, ColumnCount )
	{
		// Validate the prameters.
		if ( LIB_UTILS.value_missing( RowCount ) ) { throw new Error( `RowCount is required.` ); }
		if ( LIB_UTILS.value_missing( ColumnCount ) ) { throw new Error( `ColCount is required.` ); }

		// Set the counts.
		this.RowCount( RowCount );
		this.ColumnCount( ColumnCount );

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		TO MATRIX
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.ToMatrix =
	function ToMatrix()
	{
		let row_count = this.RowCount();
		let column_count = this.ColumnCount();
		return this.GetMatrix( 0, 0, row_count - 1, column_count - 1 );
	};


//=====================================================================
//=====================================================================
//
//		GET MATRIX
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.GetMatrix =
	function GetMatrix( FromRowIndex, FromColumnIndex, ToRowIndex, ToColumnIndex )
	{
		// Validate the prameters.
		if ( LIB_UTILS.value_missing( FromRowIndex ) ) { throw new Error( `FromRowIndex is required.` ); }
		if ( LIB_UTILS.value_missing( FromColumnIndex ) ) { throw new Error( `FromColumnIndex is required.` ); }
		if ( LIB_UTILS.value_missing( ToRowIndex ) ) { throw new Error( `ToRowIndex is required.` ); }
		if ( LIB_UTILS.value_missing( ToColumnIndex ) ) { throw new Error( `ToColumnIndex is required.` ); }

		// Copy values.
		let sub_rows = [];
		for ( let row_index = FromRowIndex; row_index <= ToRowIndex; row_index++ )
		{
			let new_row = [];
			for ( let col_index = FromColumnIndex; col_index <= ToColumnIndex; col_index++ )
			{
				let value = this.GetValue( row_index, col_index );
				new_row.push( value );
			}
			sub_rows.push( new_row );
		}

		// Return, OK.
		return sub_rows;
	};


//=====================================================================
//=====================================================================
//
//		SET MATRIX
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.SetMatrix =
	function SetMatrix( Matrix, ToRow, ToColumn )
	{
		// Get the location.
		let rowcol = this.RowCol( ToRow, ToColumn );
		if ( rowcol.row_index === null ) { throw new Error( `Invalid RowIndex [${rowcol.row_index}].` ); }
		if ( rowcol.col_index === null ) { throw new Error( `Invalid ColIndex [${rowcol.col_index}].` ); }

		// Grow the table if needed.
		let end_row_number = ToRow + Matrix.length;
		if ( end_row_number > this.RowCount() )
		{
			this.RowCount( end_row_number );
		}

		// Copy values.
		for ( let row_index = 0; row_index < Matrix.length; row_index++ )
		{
			let from_row = Matrix[ row_index ];
			for ( let col_index = 0; col_index < from_row.length; col_index++ )
			{
				let value = from_row[ col_index ];
				let end_col_number = ToColumn + from_row.length;
				if ( end_col_number > this.ColumnCount() )
				{
					this.ColumnCount( end_col_number );
				}
				this.SetValue( value, ToRow + row_index, ToColumn + col_index );
			}
		}

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		FROM OBJECTS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.FromObjects =
	function FromObjects( Objects )
	{
		// Validate the prameters.
		if ( LIB_UTILS.value_missing( Objects ) ) { throw new Error( `Objects is required.` ); }
		if ( !Array.isArray( Objects ) ) { throw new Error( `Objects must be an array of objects.` ); }

		this.SetSize( Objects.length, 0 );
		for ( let row_index = 0; row_index < Objects.length; row_index++ )
		{
			let obj = Objects[ row_index ];
			let keys = Object.keys( obj );
			for ( let key_index = 0; key_index < keys.length; key_index++ )
			{
				let col_index = this.data.column_headings.indexOf( keys[ key_index ] );
				if ( col_index < 0 )
				{
					this.data.column_headings.push( keys[ key_index ] );
					this.data.column_infos.push( {} );
					col_index = this.data.column_headings.length - 1;
				}
				let value = obj[ keys[ key_index ] ];
				this.SetValue( value, row_index, col_index );
			}
		}
		return;
	};


//=====================================================================
//=====================================================================
//
//		TO OBJECTS
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.ToObjects =
	function ToObjects()
	{
		let objects = [];
		for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
		{
			let obj = {};
			for ( let col_index = 0; col_index < this.data.column_headings.length; col_index++ )
			{
				let heading = this.data.column_headings[ col_index ];
				if ( !heading || !heading.length ) { heading = `column${col_index}`; }
				obj[ heading ] = this.GetValue( row_index, col_index );
			}
			objects.push( obj );
		}
		return objects;
	};


//=====================================================================
//=====================================================================
//
//		TRANSPOSE TABLE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.TransposeTable =
	function TransposeTable()
	{
		// Create the new column_headings.
		let new_column_headings = [];
		let new_column_infos = [];
		for ( let index = 0; index < this.data.rows.length; index++ )
		{
			new_column_headings.push( '' );
			new_column_infos.push( {} );
		}

		// Create the new rows.
		let new_rows = [];
		for ( let col_index = 0; col_index < this.data.column_headings.length; col_index++ )
		{
			let new_row = [];
			for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
			{
				new_row.push( this.GetValue( row_index, col_index ) );
			}
			new_rows.push( new_row );
		}

		// Set the new table.
		this.data.column_headings = new_column_headings;
		this.data.column_infos = new_column_infos;
		this.data.rows = new_rows;

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		TODO
//
//=====================================================================
//=====================================================================


// //---------------------------------------------------------------------
// exports.JoinTable =
// 	function JoinTable( OtherTable, SourceKeyColumn, OtherKeyColumn, JoinBehavior )
// 	{
// 		JoinContext = left | right | both
// 		JoinFunction = inner | outer | both
//
// 		throw new Error( 'Not Implemented' );
// 	};


// //---------------------------------------------------------------------
// exports.IntersectTable =
// 	function IntersectTable( OtherTable )
// 	{
// 		throw new Error( 'Not Implemented' );
// 	};


// //---------------------------------------------------------------------
// exports.SortTable =
// 	function SortTable( AtColumn, SortDirection, ComparisonFunction )
// 	{
// 		throw new Error( 'Not Implemented' );
// 	};


// //---------------------------------------------------------------------
// exports.ScanTable =
// 	function ScanTable( ScanFunction )
// 	{
// 		throw new Error( 'Not Implemented' );
// 	};


