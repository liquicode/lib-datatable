
# Datatable Cells

`lib-datatable` supports several different types of addressing schemes.
At its core, the library natively uses zero-based indexes.
So `row[0]` is the first row and `row[rowcount-1]` is the last row.


---------------------------------------------------------------------


## RowCol( AtRow, AtColumn )

Constructs a `RowCol` object from either two numerical indexes, a spreadsheet like string address, or another `RowCol` object.


### The RowCol Object

This object can be used to represent all three types of addressing that `lib-datatable` supports.
The `RowCol()` function will convert any style of addressing into a `RowCol` object.

```javascript
{
	row_num,        // A row number (offset by row_base of 1)
	row_addr,       // A row letter corresponding to row_num
	row_index,      // A zero based row index within rows
	col_num,        // A col number (offset by col_base of 1)
	col_addr,       // A col letter corresponding to col_num
	col_index,      // A zero based col index within cols
}
```

Read more about the `RowCol` object [here](api/datatable-structures?id=the-rowcol-object).


### RowCol Invocation

This function can be called in three different ways:

- `RowCol( RowIndex, ColIndex )`: Constructs a `RowCol` object from two zero based numerical indexes.
	- Indexes can be positive in the range of `0..(N-1)` where `N` is the respective row count or column count.
	- Indexes can also be negative in the range of `-1..-N` to address objects in reverse order where `-1`
		indicates the last item and `-N` indicates the first item.
	- Rather than specifying `ColIndex` as a zero based column index, you are able to specify just the column component
		of a spreadsheet style address (e.g. `'C'`) indicating the column.

- `RowCol( Address )`: Constructs a `RowCol` object from a spreadsheet like string address.
	- `Address` must be a full address, containg both the column and row components (e.g. `'AB12'`).

- `RowCol( RowCol )`: Constructs a `RowCol` object from another `RowCol` object.
	- The `RowCol` object can be partially filled out to provide any combination of addressing schemes
		(e.g. `{ row_index: 9, col_num: 3 }` or `{ row_num: 10, col_addr: 'C' }`).


### RowCol Return Value

This function returns a `RowCol` object.


### RowCol Usage


```javascript
// Get the first row and first column.
let rowcol = table.RowCol( 0, 0 );
// rowcol =
// 		row_num: 1, row_addr: 'A', row_index: 0,
// 		col_num: 1, col_addr: 'A', col_index: 0,

// Get the first row and first column.
let rowcol = table.RowCol( 'A', 0 );
// rowcol =
// 		row_num: 1, row_addr: 'A', row_index: 0,
// 		col_num: 1, col_addr: 'A', col_index: 0,

// Get the first row and first column.
let rowcol = table.RowCol( 'A1' );
// rowcol =
// 		row_num: 1, row_addr: 'A', row_index: 0,
// 		col_num: 1, col_addr: 'A', col_index: 0,

// Get the first row and first column.
let rowcol = table.RowCol( { row_num: 1, col_num: 1 } );
// rowcol =
// 		row_num: 1, row_addr: 'A', row_index: 0,
// 		col_num: 1, col_addr: 'A', col_index: 0,

// Get the second row and first column.
let rowcol = table.RowCol( 1, 0 );
// rowcol =
// 		row_num: 2, row_addr: 'B', row_index: 1,
// 		col_num: 1, col_addr: 'A', col_index: 0,

```


---------------------------------------------------------------------


## GetValue( AtRow, AtColumn )

Gets the value stored at a specific location within the datatable.

This function passes both `AtRow` and `AtColumn` to the `RowCol()` function to resolve the actual cell location.
You can call this function with any of the addressing schemes allowed by the `RowCol()` function.

A `Datatable` cell value can be of any nativa data type (e.g. number, string, object).


### GetValue Invocation

This function can be called in three different ways:

- `GetValue( RowIndex, ColIndex )`: Get the value using two zero based numerical indexes.

- `GetValue( Address )`: Get the value using a spreadsheet style address.

- `GetValue( RowColObject )`: Get the value using any combination of addressing styles.


### GetValue Return Value

This function returns the value stored in the cell found at the specified location.


### GetValue Usage

```javascript
// Create a 3x3 test table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.FromMatrix( [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ] );

// First row, first column
let value = table.GetValue( 0, 0 );      // value === 1
let value = table.GetValue( 'A', 'A' );  // value === 1
let value = table.GetValue( 'A1' );      // value === 1

// First row, last column
let value = table.GetValue( 0, -1 );     // value === 3
let value = table.GetValue( 'A', 'C' );  // value === 3
let value = table.GetValue( 'C1' );      // value === 3

// Last row, first column
let value = table.GetValue( -1, 0 );     // value === 7
let value = table.GetValue( -1, 'A' );   // value === 7
let value = table.GetValue( 'A3' );      // value === 7

// Last row, last column
let value = table.GetValue( -1, -1 );    // value === 9
let value = table.GetValue( 'C', 'C' );  // value === 9
let value = table.GetValue( 'C3' );      // value === 9
```


---------------------------------------------------------------------


## SetValue( Value, AtRow, AtColumn )

Sets the value stored at a specific location within the datatable.

This function passes both `AtRow` and `AtColumn` to the `RowCol()` function to resolve the actual cell location.
You can call this function with any of the addressing schemes allowed by the `RowCol()` function.

A `Datatable` cell value can be of any nativa data type (e.g. number, string) or even a complex object.


### SetValue Invocation

This function can be called in three different ways:

- `SetValue( Value, RowIndex, ColIndex )`: Sets the value using two zero based numerical indexes.

- `SetValue( Value, Address )`: Sets the value using a spreadsheet style address.

- `SetValue( Value, RowColObject )`: Sets the value using any combination of addressing styles.


### SetValue Return Value

This function does not return a value.


### SetValue Usage

```javascript
// Create a 3x3 test table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewBlankDatatable( 3, 3 );

// First row, first column, value = 1
table.SetValue( 1, 0, 0 );
table.SetValue( 1, 'A', 'A' );
table.SetValue( 1, 'A1' );

// First row, last column, value = 3
table.SetValue( 3, 0, -1 );
table.SetValue( 3, 'A', 'C' );
table.SetValue( 3, 'C1' );

// Last row, first column, value = 7
table.SetValue( 7, -1, 0 );
table.SetValue( 7, 'C', 'A' );
table.SetValue( 7, 'A3' );

// Last row, last column, value = 9
table.SetValue( 9, -1, -1 );
table.SetValue( 9, 'C', 'C' );
table.SetValue( 9, 'C3' );

// table = 
// 	[
// 		[  1, '',  3 ],
// 		[ '', '', '' ],
// 		[  7, '',  9 ],
// 	]
```

