
# Datatable Columns

A `Datatable` exposes several functions to inspect and manipulate the columns of a table.


---------------------------------------------------------------------


## DeleteColumns( Count, AtColumn )

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


## ClearColumns( Count, AtColumn )

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


## InsertBlankColumns( Count, AtColumn )

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


---------------------------------------------------------------------


## ColumnHeading( AtColumn, Heading )

Sets or gets the heading for a specific column.


### ColumnHeading Invocation

- `ColumnHeading( ColIndex, Heading )`:
	- `ColIndex` is a numerical zero based column index (e.g. `3`),
		or a negative offset from the end of the table.
	- `Heading` is the new column heading string.
- `ColumnHeading( Address, Heading )`
	- `Address` is a spreadsheet style column address (e.g. `'C'`)
	- `Heading` is the new column heading string.
- `ColumnHeading( RowCol, Heading )`
	- `RowCol` is a `RowCol` object with one of the column fields supplied
		(e.g. `{col_num: 4}`).
	- `Heading` is the new column heading string.

Whenever a column index is specified as a negative integer,
either through `ColIndex` or `RowCol.col_index`,
this operation will affect the column at that index and any columns to the right of it.

Omit the `Heading` parameter or pass `null` to only get the column heading.


### ColumnHeading Return Value

This function returns the `Heading` associated with the specified column.


### ColumnHeading Usage

```javascript
// Get a blank 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();
table.SetSize( 5, 5 );

// Set the heading of the first column.
table.ColumnHeading( 0, 'first' );

// Get the heading of the first column.
heading = table.ColumnHeading( 'A' );
// heading = 'first'

// Set the heading of the second column.
table.ColumnHeading( { col_num: 2 }, 'second' );

// Set the heading of the last column.
table.ColumnHeading( -1, 'last' );

// Get the heading of the last column.
heading = table.ColumnHeading( 'E' );
// heading = 'last'
```


---------------------------------------------------------------------


## ColumnHeadings( Headings )

Sets or gets all of the column headings.


### ColumnHeading Invocation

- `ColumnHeadings()`:
- `ColumnHeadings( Headings )`:
	- `Headings` an array of strings containing the new column headings.

Omit the `Headings` parameter or pass `null` to get the column headings.


### ColumnHeadings Return Value

This function always returns the array of column headings for this datatable.


### ColumnHeadings Usage

```javascript
// Get a blank 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();
table.ColumnHeadings( [ 'A', 'B', 'C' ] );
let headings = table.ColumnHeadings();
// headings = [ 'A', 'B', 'C' ]
```


---------------------------------------------------------------------


## ColumnInfo( AtColumn, Info )

Sets or gets the heading for a specific column.


### ColumnInfo Invocation

- `ColumnInfo( ColIndex, Info )`:
	- `ColIndex` is a numerical zero based column index (e.g. `3`),
		or a negative offset from the end of the table.
	- `Info` is the new column heading string.
- `ColumnInfo( Address, Info )`
	- `Address` is a spreadsheet style column address (e.g. `'C'`)
	- `Info` is the new column heading string.
- `ColumnInfo( RowCol, Info )`
	- `RowCol` is a `RowCol` object with one of the column fields supplied
		(e.g. `{col_num: 4}`).
	- `Info` is the new column heading string.

Whenever a column index is specified as a negative integer,
either through `ColIndex` or `RowCol.col_index`,
this operation will affect the column at that index and any columns to the right of it.

Omit the `Info` parameter or pass `null` to only get the column heading.


### ColumnInfo Return Value

This function returns the `Info` associated with the specified column.


### ColumnInfo Usage

```javascript
// Get a blank 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();
table.SetSize( 5, 5 );

// Set the info of the first column.
table.ColumnInfo( 0, { is_first: true } );

// Get the info of the first column.
info = table.ColumnInfo( 0 );
// info = { is_first: true }

// Set the info of the last column.
table.ColumnInfo( -1, { is_last: true } );

// Get the info of the last column.
info = table.ColumnInfo( 'E' );
// info = { is_last: true }
```
