"use strict";


const LIB_UTILS = require( './lib-utils.js' );


//=====================================================================
//=====================================================================
//
//		CALCULATED COLUMNS
//
//=====================================================================
//=====================================================================


//=====================================================================
//=====================================================================
//
//		COLUMN CALCULATION
//
//=====================================================================
//=====================================================================


//---------------------------------------------------------------------
/**
 * Set the auto recalculation mode for the Datatable.
 * @param {boolean} Value `true` or `false`.
 * @return {array} The auto calculated mode.
 */
exports.AutoCalculate =
	function AutoCalculate( Value = null )
	{
		if ( !LIB_UTILS.value_missing( Value ) )
		{
			if ( Value ) { this.options.auto_calculate = true; }
			else { this.options.auto_calculate = false; }
		}

		// Return the auto_calculate value.
		return this.options.auto_calculate;
	};


//---------------------------------------------------------------------
/**
 * Sets or gets the calculation for a column.
 * @param {array} Calculation A string formula or expression.
 * 		Omit this parameter to get the column calculation.
 * @return {array} The calculation object.
 */
exports.ColumnCalculation =
	function ColumnCalculation( AtColumn, Calculation )
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
			// Set the column calculation.
			this.data.columns[ rowcol.col_index ].calculation = Calculation;
		}

		// Return the column calculation.
		return LIB_UTILS.clone( this.data.columns[ rowcol.col_index ].calculation );
	};


//---------------------------------------------------------------------
/**
 * Inavlidate a cell.
 */
exports.Invalidate =
	function Invalidate( AtRow, AtColumn )
	{
		let rowcol = this.RowCol( AtRow, AtColumn );
		if ( !this.columns[ rowcol.col_index ].calculation ) { throw new Error( 'Only calculated columns can be invalidated.' ); }
		this.SetValue( this.INVALID_VALUE, rowcol );
		return;
	};


//---------------------------------------------------------------------
/**
 * Forces recalculation of a column.
 * @param {any} AtColumn A column address.
 * @return {array} The calculated values.
 */
exports.CalculateColumn =
	function CalculateColumn( AtColumn )
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

		// Return the column calculation.
		// return this.options.auto_calculate;
	};


//---------------------------------------------------------------------
/**
 * Forces recalculation of a column.
 * @param {any} AtColumn A column address.
 * @return {array} The calculated values.
 */
exports.CalculateTable =
	function CalculateTable()
	{
		return;
	};


