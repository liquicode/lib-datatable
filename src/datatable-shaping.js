"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		SHAPING FUNCTIONS
//
//=====================================================================
//=====================================================================


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
		// Create the new columns.
		let new_columns = [];
		// let new_column_headings = [];
		// let new_column_infos = [];
		for ( let index = 0; index < this.data.rows.length; index++ )
		{
			new_columns.push( LIB_UTILS.new_column() );
			// new_column_headings.push( '' );
			// new_column_infos.push( {} );
		}

		// Create the new rows.
		let new_rows = [];
		for ( let col_index = 0; col_index < this.data.columns.length; col_index++ )
		{
			let new_row = [];
			for ( let row_index = 0; row_index < this.data.rows.length; row_index++ )
			{
				new_row.push( this.GetValue( row_index, col_index ) );
			}
			new_rows.push( new_row );
		}

		// Set the new table.
		this.data.columns = new_columns;
		// this.data.column_headings = new_column_headings;
		// this.data.column_infos = new_column_infos;
		this.data.rows = new_rows;

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		APPEND TABLE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.AppendTable =
	function AppendTable( OtherTable, ColumnIndexesOrHeadings )
	{
		if ( !OtherTable.IsDatatable ) { throw new Error( `The parameter [OtherTable] must be a datatable.` ); }

		// Get the matrix.
		let matrix = OtherTable.ToMatrix( ColumnIndexesOrHeadings );
		if ( !matrix.length ) { return; }

		// Add missing columns.
		let this_column_count = this.ColumnCount();
		let other_column_count = matrix[ 0 ].length;
		if ( other_column_count > this_column_count ) 
		{
			this.InsertBlankColumns( other_column_count - this_column_count, this_column_count );
		}

		// Append the rows.
		this.InsertRows( matrix, this.RowCount() );

		// Return, OK.
		return;
	};


//=====================================================================
//=====================================================================
//
//		JOIN TABLE
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
exports.JoinTable =
	function JoinTable( AtColumn, JoinType, RightTable, RightColumn, RightColumnIndexesOrHeadings )
	{
		if ( LIB_UTILS.value_missing( AtColumn ) ) { throw new Error( `The required parameter [AtColumn] is missing.` ); }
		if ( LIB_UTILS.value_missing( JoinType ) ) { throw new Error( `The required parameter [JoinType] is missing.` ); }
		if ( LIB_UTILS.value_missing( RightTable ) ) { throw new Error( `The required parameter [RightTable] is missing.` ); }
		if ( LIB_UTILS.value_missing( RightColumn ) ) { throw new Error( `The required parameter [RightColumn] is missing.` ); }
		if ( !RightTable.IsDatatable ) { throw new Error( `The parameter [RightTable] must be a datatable.` ); }

		// Get the left and right column counts.
		let left_column_count = this.ColumnCount();

		// Get the left join column.
		let left_join_column = this.GetMatrix( 0, AtColumn, this.RowCount() - 1, AtColumn );
		left_join_column = left_join_column.map( value => value[ 0 ] );

		// Get the right join column.
		let right_join_column = RightTable.GetMatrix( 0, RightColumn, RightTable.RowCount() - 1, RightColumn );
		right_join_column = right_join_column.map( value => value[ 0 ] );

		// Get the left values.
		let left_values = this.ToMatrix();

		// Get the right values.
		let right_values = RightTable.ToMatrix( RightColumnIndexesOrHeadings );
		if ( !right_values.length ) { return; }
		if ( !right_values[ 0 ].length ) { return; }
		let right_column_count = right_values[ 0 ].length;

		// Reset this table.
		this.DeleteRows( this.RowCount(), 0 );
		this.InsertBlankColumns( right_column_count, left_column_count );

		// Build the join map.
		let join_map = [];
		JoinType = JoinType.toLowerCase();
		if ( JoinType === 'inner' )
		{
			left_join_column.forEach(
				( left_join_value, left_join_index ) =>
				{
					right_join_column.forEach(
						( right_join_value, right_join_index ) =>
						{
							if ( right_join_value === left_join_value )
							{
								join_map.push( { left: left_join_index, right: right_join_index } );
							}
						} );
				} );
		}
		else if ( JoinType === 'left' )
		{
			left_join_column.forEach(
				( left_join_value, left_join_index ) =>
				{
					let join_count = 0;
					right_join_column.forEach(
						( right_join_value, right_join_index ) =>
						{
							if ( right_join_value === left_join_value )
							{
								join_map.push( { left: left_join_index, right: right_join_index } );
								join_count++;
							}
						} );
					if ( !join_count ) { join_map.push( { left: left_join_index, right: null } ); }
				} );
		}
		else if ( JoinType === 'right' )
		{
			right_join_column.forEach(
				( right_join_value, right_join_index ) =>
				{
					let join_count = 0;
					left_join_column.forEach(
						( left_join_value, left_join_index ) =>
						{
							if ( right_join_value === left_join_value )
							{
								join_map.push( { left: left_join_index, right: right_join_index } );
								join_count++;
							}
						} );
					if ( !join_count ) { join_map.push( { left: null, right: right_join_index } ); }
				} );
		}
		else if ( JoinType === 'full' )
		{
			left_join_column.forEach(
				( left_join_value, left_join_index ) =>
				{
					let join_count = 0;
					right_join_column.forEach(
						( right_join_value, right_join_index ) =>
						{
							if ( right_join_value === left_join_value )
							{
								join_map.push( { left: left_join_index, right: right_join_index } );
								join_count++;
							}
						} );
					if ( !join_count ) { join_map.push( { left: left_join_index, right: null } ); }
				} );
			right_join_column.forEach(
				( right_join_value, right_join_index ) =>
				{
					let join_count = 0;
					left_join_column.forEach(
						( left_join_value, left_join_index ) =>
						{
							if ( right_join_value === left_join_value )
							{
								join_count++;
							}
						} );
					if ( !join_count ) { join_map.push( { left: null, right: right_join_index } ); }
				} );
		}
		else
		{
			throw new Error( `Unknown value for [JoinType] [${JoinType}].` );
		}

		// Join the data.
		join_map.forEach(
			join =>
			{
				let row_index = this.RowCount();
				if ( join.left !== null )
				{
					this.SetMatrix( [ left_values[ join.left ] ], row_index, 0 );
				}
				if ( join.right !== null )
				{
					this.SetMatrix( [ right_values[ join.right ] ], row_index, left_column_count );
				}
			}
		);

		// - Simple join using only unique columns:
		// if ( !LIB_UTILS.is_unique_array( left_join_column ) ) { throw new Error( `The column [AtColumn] must refer to a column of unique values.` ); }
		// if ( !LIB_UTILS.is_unique_array( right_join_column ) ) { throw new Error( `The column [JoinColumn] must refer to a column of unique values.` ); }
		// join_column.forEach(
		// 	join_value =>
		// 	{
		// 		// Find the join indexes.
		// 		let left_join_index = left_join_column.indexOf( join_value );
		// 		let right_join_index = right_join_column.indexOf( join_value );
		// 		// Validate with the join type.
		// 		if ( JoinType === 'inner' )
		// 		{
		// 			if ( left_join_index < 0 ) { return; }
		// 			if ( right_join_index < 0 ) { return; }
		// 		}
		// 		else if ( JoinType === 'left' )
		// 		{
		// 			if ( left_join_index < 0 ) { return; }
		// 		}
		// 		else if ( JoinType === 'right' )
		// 		{
		// 			if ( right_join_index < 0 ) { return; }
		// 		}
		// 		else if ( JoinType === 'full' )
		// 		{
		// 			// Includes everything.
		// 		}
		// 		// Copy the data.
		// 		let row_index = this.RowCount();
		// 		// this.InsertBlankRows( 1, row_index );
		// 		if ( left_join_index >= 0 )
		// 		{
		// 			this.SetMatrix( [ left_values[ left_join_index ] ], row_index, 0 );
		// 		}
		// 		if ( right_join_index >= 0 )
		// 		{
		// 			this.SetMatrix( [ right_values[ right_join_index ] ], row_index, left_column_count );
		// 		}
		// 	} );

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


