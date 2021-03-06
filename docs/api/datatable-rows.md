
# Datatable Rows

A `Datatable` exposes several functions to inspect and manipulate the rows of a table.


---------------------------------------------------------------------


## ToObject( AtRow )

Converts a row to an object.


### ToObject Invocation

- `ToObject( RowIndex )`
	- `RowIndex` is a numerical zero based row index (e.g. `3`),
		or a negative offset from the end of the table.
- `ToObject( Address )`
	- `Address` is a spreadsheet style row address (e.g. `'C'`)
- `ToObject( RowCol )`
	- `RowCol` is a `RowCol` object with one of the row fields supplied
		(e.g. `{row_num: 4}`).


### ToObject Return Value

An object with fields from datatable columns and values from a datatable row.


### ToObject Usage

```javascript
// Get a blank table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.FromObjects( [ { hello: 'world' }, { hello: 'goodbye' } ] );

// Get the first row as an object.
let row = table.ToObject( 0 );
// row.hello === 'world'

// Get another row as an object.
let row = table.ToObject( 1 );
// row.hello === 'goodbye'
```


---------------------------------------------------------------------


## DeleteRows( Count, AtRow )

Deletes a number of rows starting at a specific row index.

These rows are removed from the `Datatable` and the row count for the table will be updated.


### DeleteRows Invocation

- `DeleteRows( Count, RowIndex )`
	- `Count` is the number of rows to clear.
	- `RowIndex` is a numerical zero based row index (e.g. `3`),
		or a negative offset from the end of the table.
- `DeleteRows( Count, Address )`
	- `Count` is the number of rows to clear.
	- `Address` is a spreadsheet style row address (e.g. `'C'`)
- `DeleteRows( Count, RowCol )`
	- `Count` is the number of rows to clear.
	- `RowCol` is a `RowCol` object with one of the row fields supplied
		(e.g. `{row_num: 4}`).

Whenever a row index is specified as a negative integer,
either through `RowIndex` or `RowCol.row_index`,
the delete operation will affect the row at that index and any rows below it.


### DeleteRows Return Value

This function does not return a value.


### DeleteRows Usage

```javascript
// Get a blank table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Create some rows.
table.RowCount( 10 );

// Delete some rows.
table.DeleteRows( 5, 3 );

// Get the number of rows.
let n = table.RowCount();  /* n = 5 */
```


---------------------------------------------------------------------


## ClearRows( Count, AtRow )

Clears all cell values in a number of rows starting at a specific row index.

This function only affects the values of existing cells and does not add or remove rows.


### DeleteRows Invocation

- `ClearRows( Count, RowIndex )`:
	- `Count` is the number of rows to clear.
	- `RowIndex` is a numerical zero based row index (e.g. `3`),
		or a negative offset from the end of the table.
- `ClearRows( Count, Address )`
	- `Count` is the number of rows to clear.
	- `Address` is a spreadsheet style row address (e.g. `'C'`)
- `ClearRows( Count, RowCol )`
	- `Count` is the number of rows to clear.
	- `RowCol` is a `RowCol` object with one of the row fields supplied
		(e.g. `{row_num: 4}`).

Whenever a row index is specified as a negative integer,
either through `RowIndex` or `RowRow.row_index`,
the clear operation will affect the row at that index and any rows below it.


### ClearRows Return Value

This function does not return a value.


### ClearRows Usage

```javascript
// Get a blank table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Create some rows.
table.RowCount( 10 );

// Clear values in row 3.
table.ClearRows( 1, 3 );

// Get the number of rows.
let n = table.RowCount();  /* n = 10 */
```


---------------------------------------------------------------------


## InsertBlankRows( Count, AtRow )

Inserts a number of blank rows starting at a specific row index.

These rows are added to the `Datatable` and the row count for the table will be updated.


### InsertBlankRows Invocation

- `InsertBlankRows( Count, RowIndex )`
	- `Count` is the number of rows to insert.
	- `RowIndex` is a numerical zero based row index (e.g. `3`),
		or a negative offset from the end of the table.
- `InsertBlankRows( Count, Address )`
	- `Count` is the number of rows to insert.
	- `Address` is a spreadsheet style row address (e.g. `'C'`)
- `InsertBlankRows( Count, RowCol )`
	- `Count` is the number of rows to insert.
	- `RowCol` is a `RowCol` object with one of the row fields supplied
		(e.g. `{row_num: 4}`).

Whenever a row index is specified as a zero based positive integer,
either through `RowIndex` or `RowCol.row_index`,
the insert operation will affect the row at that index by insert before it,
moving that row and all other rows below it.
When the row index is negative, the insert operation will instead take place after the row at that index.


### InsertBlankRows Return Value

This function does not return a value.


### InsertBlankRows Usage

```javascript
// Get a blank 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();
table.SetSize( 5, 5 );

// Add a blank row to the beginning.
table.InsertBlankRows( 1, 0 );

// Add a blank row to the end.
table.InsertBlankRows( 1, -1 );

// Add two rows, starting at the third row.
table.InsertBlankRows( 2, 3 );

// Get the number of rows.
let n = table.RowCount();  /* n = 9 */
```


---------------------------------------------------------------------


## InsertRows( Matrix, AtRow )

Inserts rows from a matrix starting at a specific row index.

These rows are added to the `Datatable` and the row count for the table will be updated.


### InsertRows Invocation

- `InsertRows( Matrix, RowIndex )`
	- `Matrix` is the two-dimensional array (array of arrays) of rows to insert.
	- `RowIndex` is a numerical zero based row index (e.g. `3`),
		or a negative offset from the end of the table.
- `InsertRows( Matrix, Address )`
	- `Matrix` is the two-dimensional array (array of arrays) of rows to insert.
	- `Address` is a spreadsheet style row address (e.g. `'C'`)
- `InsertRows( Matrix, RowCol )`
	- `Matrix` is the two-dimensional array (array of arrays) of rows to insert.
	- `RowCol` is a `RowCol` object with one of the row fields supplied
		(e.g. `{row_num: 4}`).

Whenever a row index is specified as a zero based positive integer,
either through `RowIndex` or `RowCol.row_index`,
the insert operation will affect the row at that index by insert before it,
moving that row and all other rows below it.
When the row index is negative, the insert operation will instead take place after the row at that index.


### InsertRows Return Value

This function does not return a value.


### InsertRows Usage

```javascript
// Get a blank 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Add a row to the beginning.
table.InsertRows( 0, [ [ 1, 2, 3 ] ] );

// Add a row to the end.
table.InsertRows( -1, [ [ 7, 8, 9 ] ] );

// Add a row to the middle.
table.InsertRows( 'B', [ [ 4, 5, 6 ] ] );

// table = 
// 	[
// 		[ 1, 2, 3 ],
// 		[ 4, 5, 6 ],
// 		[ 7, 8, 9 ],
// 	]
```

