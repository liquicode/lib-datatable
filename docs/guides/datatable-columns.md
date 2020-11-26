
# Datatable Columns

## Overview

A `Datatable` exposes several functions to inspect and manipulate the columns of a table.


---------------------------------------------------------------------


## Function DeleteColumns( Count, AtColumn )

Deletes a number of columns starting at a specific column index.

These columns are removed from the `Datatable` and the column count for the table will be updated.


### DeleteColumns Invocation

- `DeleteColumns( Count, ColIndex )`
	- `Count` is the number of columns to clear.
	- `ColIndex` is a numerical zero based column index (e.g. `3`),
		or a negative offset from the end of the table.
- `DeleteColumns( Count, Address )`
	- `Count` is the number of columns to clear.
	- `Address` is a spreadsheet style column address (e.g. `'C'`)
- `DeleteColumns( Count, RowCol )`
	- `Count` is the number of columns to clear.
	- `RowCol` is a `RowCol` object with one of the column fields supplied
		(e.g. `{col_num: 4}`).

Whenever a column index is specified as a negative integer,
either through `ColIndex` or `RowCol.col_index`,
the delete operation will affect the column at that index and any columns to the right of it.


### DeleteColumns Return Value

This function does not return a value.


### DeleteColumns Usage

```javascript
// Get a blank table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Create some columns.
table.ColumnCount( 10 );

// Delete some columns.
table.DeleteColumns( 5, 3 );

// Get the number of columns.
let n = table.ColumnCount();  /* n = 5 */
```


---------------------------------------------------------------------


## Function ClearColumns( Count, AtColumn )

Clears all cell values in a number of columns starting at a specific column index.

This function only affects the values of existing cells and does not add or remove columns.


### DeleteColumns Invocation

- `ClearColumns( Count, ColIndex )`:
	- `Count` is the number of columns to clear.
	- `ColIndex` is a numerical zero based column index (e.g. `3`),
		or a negative offset from the end of the table.
- `ClearColumns( Count, Address )`
	- `Count` is the number of columns to clear.
	- `Address` is a spreadsheet style column address (e.g. `'C'`)
- `ClearColumns( Count, RowCol )`
	- `Count` is the number of columns to clear.
	- `RowCol` is a `RowCol` object with one of the column fields supplied
		(e.g. `{col_num: 4}`).

Whenever a column index is specified as a negative integer,
either through `ColIndex` or `RowCol.col_index`,
the clear operation will affect the column at that index and any columns to the right of it.


### ClearColumns Return Value

This function does not return a value.


### ClearColumns Usage

```javascript
// Get a blank table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Create some columns.
table.ColumnCount( 10 );

// Clear values in column 3.
table.ClearColumns( 1, 'C' );

// Get the number of columns.
let n = table.ColumnCount();  /* n = 10 */
```


---------------------------------------------------------------------


## Function InsertBlankColumns( Count, AtColumn )

Inserts a number of blank columns starting at a specific column index.

These columns are added to the `Datatable` and the column count for the table will be updated.


### InsertBlankColumns Invocation

- `InsertBlankColumns( Count, ColIndex )`
	- `Count` is the number of columns to insert.
	- `ColIndex` is a numerical zero based column index (e.g. `3`),
		or a negative offset from the end of the table.
- `InsertBlankColumns( Count, Address )`
	- `Count` is the number of columns to insert.
	- `Address` is a spreadsheet style column address (e.g. `'C'`)
- `InsertBlankColumns( Count, RowCol )`
	- `Count` is the number of columns to insert.
	- `RowCol` is a `RowCol` object with one of the column fields supplied
		(e.g. `{col_num: 4}`).

Whenever a column index is specified as a zero based positive integer,
either through `ColIndex` or `RowCol.col_index`,
the insert operation will affect the column at that index by insert before it,
moving that column and all other columns to the right.
When the column index is negative, the insert operation will instead take place after the column at that index.


### InsertBlankColumns Return Value

This function does not return a value.


### InsertBlankColumns Usage

```javascript
// Get a blank 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();
table.SetSize( 5, 5 );

// Add a blank column to the beginning.
table.InsertBlankColumns( 1, 0 );

// Add a blank column to the end.
table.InsertBlankColumns( 1, -1 );

// Add two columns, starting at the third column.
table.InsertBlankColumns( 2, 'C' );

// Get the number of columns.
let n = table.ColumnCount();  /* n = 9 */
```

