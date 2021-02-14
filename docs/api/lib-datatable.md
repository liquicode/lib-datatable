
# lib-datatable

Constructor functions to create instances of a `Datatable`.


---------------------------------------------------------------------


## NewDatatable()

Creates an empty `Datatable` with no rows or columns.


### Examples

```javascript
// Get a blank 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();
table.SetSize( 5, 5 );
// table.RowCount() === 5
// table.ColumnCount() === 5
```


---------------------------------------------------------------------


## NewBlankDatatable( RowCount, ColumnCount )

Creates an empty `Datatable` with the requested rows and columns.


### Examples

```javascript
// Get a blank 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewBlankDatatable( 5, 5 );
// table.RowCount() === 5
// table.ColumnCount() === 5
```


---------------------------------------------------------------------


## FromMatrix( Matrix )

Creates a `Datatable` and populates with values from the given Matrix.
The `Datatable` will have the same number of rows and columns as the Matrix.


### Examples

```javascript
// A test matrix:
let matrix =
[
	[ 1,  2,  3,  4,  5 ],
	[ 2,  4,  6,  8, 10 ],
	[ 3,  6,  9, 12, 15 ],
	[ 4,  8, 12, 16, 20 ],
	[ 5, 10, 15, 20, 25 ],
]
// Get a test 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.FromMatrix( matrix );
// table.RowCount() === 5
// table.ColumnCount() === 5
// table.GetValue( 'C3' ) === 9
```


---------------------------------------------------------------------


## FromObjects( Objects )

Creates a `Datatable` and populates with values from the given array of objects.
The field names found in `Objects` will be used as column headings.
The `Datatable` will have the same number of rows as array of objects.


### Examples

```javascript
// A test array:
let objects =
[
	{ name: 'Alice', age: 23 },
	{ name: 'Bob', age: 25 },
	{ name: 'Eve', age: 24 },
]
// Get a test 5x5 table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.FromObjects( objects );
// table.RowCount() === 3
// table.ColumnCount() === 2
// table.ColumnHeading( 'A" ) === 'name'
// table.ColumnHeading( 'B" ) === 'age'
```

