
# Datatable Cells


## Overview

`lib-datatable` supports several different types of addressing schemes.
At its core, the library natively uses zero-based indexes.
So `row[0]` is the first row and `row[rowcount-1]` is the last row.


## Cell Addressing

***Spreadsheet Style Cell Addressing***

Spreadsheet programs utilize an alternate way of addressing cells by
specifying a combination of column name and row number, as in 'A1'.
`lib-datatable` also supports this popular style of addressing.

***RowIndex vs RowNumber and ColIndex vs ColNumber***

When referring to addressing style and anddress components, we make a distinction
between an `Index` and a `Number`.
An `Index` is always zero-based and a `Number` is always one-based.
So `RowIndex=0` and `RowNumber=1` both refer to the same row (i.e. the first row).
The same is true for any `ColumnIndex` and `ColumnNumber` references.
These two terms are used frequently throughout this documentation and it
is important to understand the distinction.

***Negative Index Values In Addressing***

When specifying `RowIndex` and `ColIndex` parameters for `lib-datatable`
functions, be aware that you are able to specify negative index values
to refer to items in reverse order.
A `RowIndex=-1` would refer to the last row and `RowIndex=-RowCount` would
refer to the first row.


---------------------------------------------------------------------


## The RowCol Object

This object can be used to represent all three types of addressing that `lib-datatable` supports.
The `RowCol()` function will convert any style of addressing into a `RowCol` object.

```javascript
{
	row_num,        // A row number (offset by row_base 1)
	row_addr,       // A row letter corresponding to row_num
	row_index,      // A zero based row index within rows
	col_num,        // A col number (offset by col_base 1)
	col_addr,       // A col letter corresponding to col_num
	col_index,      // A zero based col index within cols
}

```


---------------------------------------------------------------------


## Function RowCol( AtRow, AtColumn )

Constructs a `RowCol` object from either two numerical indexes, a spreadsheet like string address, or another RowCol object.


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

Let's start out with a basic datatable called `table`:
```javascript
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.FromMatrix( 
	[
		[ 1, 2, 3 ],
		[ 4, 5, 6 ],
		[ 7, 8, 9 ]
	]
);
```

***Index Style Addressing***

Supply numerical index values for both `RowIndex` and `ColIndex` parameters:

```javascript
// Get the first row and the second column.
let rowcol = table.RowCol( 0, 1 );
/* rowcol =
	row_num: 1,     col_num: 2,
	row_addr: 'A',  col_addr: 'B',
	row_index: 0,   col_index: 1,
*/

// Get the last row and the last column.
let rowcol = table.RowCol( -1, -1 );
/* rowcol =
	row_num: 3,     col_num: 3,
	row_addr: 'C',  col_addr: 'C',
	row_index: 2,   col_index: 2,
*/
```

***Spreadsheet Style Addressing***

You can address a table location using a spreadsheet like address string
which contains the `col_addr` component followed by the `row_num` component.
(e.g. 'A1' or 'BD12')

```javascript
// Get the first row and the first column.
let rowcol = table.RowCol( 'A1' );
/* rowcol =
	row_num: 1,     col_num: 1,
	row_addr: 'A',  col_addr: 'A',
	row_index: 0,   col_index: 0,
*/
```

***Mixed Style Addressing***

```javascript
// Get the last row and the second column.
let rowcol = table.RowCol( { col_addr: 'B', row_index: -1 } );
/* rowcol =
	row_num: 3,     col_num: 2,
	row_addr: 'C',  col_addr: 'B',
	row_index: 2,   col_index: 1,
*/
```


---------------------------------------------------------------------


## Function GetValue( AtRow, AtColumn )

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


---------------------------------------------------------------------


## Function SetValue( AtRow, AtColumn )

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


