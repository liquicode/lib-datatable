
# Datatable Structures

This library has common concepts and data structures that are used throughout the API.


---------------------------------------------------------------------


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

The `RowCol` object is used internally and is accepted as an addressing parameter for many other functions.

The structure of `RowCol` contains row information and column information and all the values needed to support all addressing modes.

```js
let RowCol =
{
	row_num: null,      // A 1-based row number (e.g. 1)
	row_addr: null,     // A spreadsheet style row reference (e.g. 'A')
	row_index: null,    // A 0-based row index (e.g. 0)
	col_num: null,      // A 1-based column number (e.g. 1)
	col_addr: null,     // A spreadsheet style column reference (e.g. 'A')
	col_index: null,    // A 0-based column index (e.g. 0)
};
```

The `row_num` and `col_num` fields of the `RowCol` object are affected by the `row_base` setting.


Use the `datatable.RowCol()` function to create a `RowCol` object from a row address and a column address.

```js
let rowcol = datatable.RowCol( 0, 'C' );
// rowcol =
// 	row_num: 1, row_addr: 'A', row_index: 0,
// 	col_num: 3, col_addr: 'C', col_index: 2,
```

When accepted as parameter to a `datatable` function, any combination of these values can be provided.
Also, A `RowCol` object can refer to a single row, a single column, or a single cell.

```js
// These all refer to the same cell:
value = datatable.GetValue( 0, 'C' );
value = datatable.GetValue( 0, { col_addr: 'C' } );
value = datatable.GetValue( { row_index: 0, col_addr: 'C' } );
value = datatable.GetValue( { row_num: 1, col_num: 3 } );
```

Both `row_index` and `col_index` can be specified as negative numbers.
In these cases, the index value will be counted as an offset from the end of the data.
For example `row_index = -1` refers to the last row in the `datatable`, `row_index = -2` refers to the second to the last, and so on.

```js
// Get a value from the last row:
value = datatable.GetValue( -1, 'C' );
// Get the value from the last row and last column:
value = datatable.GetValue( -1, -1 );
```

### A Larger Example


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
// rowcol =
// 		row_num: 1, row_addr: 'A', row_index: 0,
// 		col_num: 2, col_addr: 'B', col_index: 1,

// Get the last row and the last column.
let rowcol = table.RowCol( -1, -1 );
// rowcol =
// 		row_num: 3, row_addr: 'C', row_index: 2,
// 		col_num: 3, col_addr: 'C', col_index: 2,
```

***Spreadsheet Style Addressing***

You can address a table location using a spreadsheet like address string
which contains the `col_addr` component followed by the `row_num` component.
(e.g. 'A1' or 'BD12')

```javascript
// Get the first row and the first column.
let rowcol = table.RowCol( 'A1' );
// rowcol =
// 		row_num: 1, row_addr: 'A', row_index: 0,
// 		col_num: 1, col_addr: 'A', col_index: 0,
```

***Mixed Style Addressing***

```javascript
// Get the last row and the second column.
let rowcol = table.RowCol( { col_addr: 'B', row_index: -1 } );
// rowcol =
// 		row_num: 3, row_addr: 'C', row_index: 2,
// 		col_num: 2, col_addr: 'B', col_index: 1,
```
