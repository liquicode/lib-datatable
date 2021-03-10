
# Datatable Table

Functions to manipulate a `Datatable`.


---------------------------------------------------------------------


## RowCount( Count )

Used to get and set the number of rows in a `Datatable`.


### RowCount Invocation

This function can be called in two ways:

- `RowCount()`: Called without the `Count` parameter, this function simply
	returns the number of rows in the `Datatable`.

- `RowCount( Count )`: When called with an integer parameter, this function
	adds or removes rows at the end of the `Datatable` to obtain the
	desired `Count` number of rows.


### RowCount Return Value

The count of rows currently in the `Datatable`.


### RowCount Usage

```javascript
// Get a blank table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Create some rows.
table.RowCount( 10 );

// Get the number of rows.
let n = table.RowCount();  /* n = 10 */
```


---------------------------------------------------------------------


## ColumnCount( Count )

Used to get and set the number of columns in a `Datatable`.


### ColumnCount Invocation

This function can be called in two ways:

- `ColumnCount()`: Called without the `Count` parameter, this function simply
	returns the number of columns in the `Datatable`.

- `ColumnCount( Count )`: When called with an integer parameter, this function
	adds or removes columns at the end of the `Datatable` to obtain the
	desired `Count` number of columns.


### ColumnCount Return Value

The count of columns currently in the `Datatable`.


### ColumnCount Usage

```javascript
// Get a blank table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Create some columns.
table.ColumnCount( 5 );

// Get the number of columns.
let n = table.ColumnCount();  /* n = 5 */
```


---------------------------------------------------------------------


## SetSize( RowCount, ColumnCount )

Used to set the number of rows and/or columns in a `Datatable`.
Under the hood, this function simply calls `RowCount()` and `ColumnCount()`
to make changes to the `Datatable`.


### SetSize Invocation

Both of the parameters are required so there is only one way to call this function:

- `SetSize( RowCount, ColumnCount )`: Add/remove rows and columns from the `Datatable`.


### SetSize Return Value

This function does not return a value.


### SetSize Usage

```javascript
// Get a blank table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Create some rows and columns.
table.SetSize( 10, 5 );

// Get the number of rows and columns.
let x = table.RowCount();     /* x = 10 */
let y = table.ColumnCount();  /* y = 5 */
```


---------------------------------------------------------------------


## ToMatrix( ColumnIndexesOrHeadings )

Gets a matrix (array of array of values) of values from the datatable.


### ToMatrix Invocation

This `ColumnIndexesOrHeadings` parameter is optional:

- `ToMatrix()`
	- Returns a matrix of all rows and all columns.
- `ToMatrix( ColumnIndexesOrHeadings )`
	- Returns a matrix of all rows and the columns as sepcified in `ColumnIndexesOrHeadings`.

The `ColumnIndexesOrHeadings` parameter is optional.
When supplied it must be an array containing either column indexes, column headings, or a mix of the two.
Each element of the array can be either a column heading existing in the `Datatable` or an existing column index.
The column order of the returned matrix will match the order in which they appear in `ColumnIndexesOrHeadings`.
If you need to insert blank (`null`) columns into the returned matrix, you can use `null` or `-1` instead 
	of a heading or index at that position.

Note that 'column headings' referes to the return value of the `ColumnHeading()` function for that column
	and not the spreadsheet addressing option 'A', 'B', 'C', etc used elsewhere in the api.
This is a deviation from how columns are usually referenced elsewhere.

***Other functions which use a ColumnIndexesOrHeadings parameter:***

- [AppendTable( OtherTable, ColumnIndexesOrHeadings )](api/datatable-shaping?id=appendtable-othertable-columnindexesorheadings-) :
- [JoinTable( AtColumn, JoinType, RightTable, RightColumn, RightColumnIndexesOrHeadings )](api/datatable-shaping?id=jointable-atcolumn-jointype-righttable-rightcolumn-rightcolumnindexesorheadings-) :


### ToMatrix Return Value

This function returns an array of array of values.
If the `ColumnIndexesOrHeadings` parameter is specified, the matrix columns will be present and ordered according 
	to how they appear in `ColumnIndexesOrHeadings`.


### ToMatrix Usage

```javascript
// Create a 3x3 test table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatableFromMatrix( [
		[ 1, 2, 3 ],
		[ 4, 5, 6 ], 
		[ 7, 8, 9 ] 
	] );
table.ColumnHeadings( 'A', 'B', 'C' );

// Get all columns.
let matrix = table.ToMatrix();
// matrix = 
// 	[
// 		[ 1, 2, 3 ],
// 		[ 4, 5, 6 ],
// 		[ 7, 8, 9 ],
// 	]

// Get some of the columns by column index.
matrix = table.ToMatrix( [ 1, 2 ] );
// matrix = 
// 	[
// 		[ 2, 3 ],
// 		[ 5, 6 ],
// 		[ 8, 9 ],
// 	]

// Get some of the columns by column heading.
matrix = table.ToMatrix( [ 'A', 'B' ] );
// matrix = 
// 	[
// 		[ 1, 2 ],
// 		[ 4, 5 ],
// 		[ 7, 8 ],
// 	]

// Get columns in a different order.
matrix = table.ToMatrix( [ 'B', 'A' ] );
// matrix = 
// 	[
// 		[ 2, 1 ],
// 		[ 5, 4 ],
// 		[ 8, 7 ],
// 	]

// Include a blank column.
matrix = table.ToMatrix( [ 0, null, 1 ] );
// matrix = 
// 	[
// 		[ 1, null, 2 ],
// 		[ 4, null, 5 ],
// 		[ 7, null, 8 ],
// 	]

```




---------------------------------------------------------------------


## GetMatrix( FromRowIndex, FromColumnIndex, ToRowIndex, ToColumnIndex )

Gets a matrix (array of array of values) specified by the given indexes.


### GetMatrix Invocation

This function departs from the rest of the library as only zero-based index values are allowed to specify the affected cells.

- `GetMatrix( FromRowIndex, FromColumnIndex, ToRowIndex, ToColumnIndex )`


### GetMatrix Return Value

This function returns an array of array of values found at the specified location.


### GetMatrix Usage

```javascript
// Create a 3x3 test table.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.FromMatrix( [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ] );

// Get a subset of the cells.
let matrix = table.GetMatrix( 1, 1, 2, 2 );
// matrix = 
// 	[
// 		[ 5, 6 ],
// 		[ 8, 9 ],
// 	]
```


---------------------------------------------------------------------


## SetMatrix( Matrix, ToRow, ToColumn )

Given an array of array of values, copy those values into the datatable starting at the specified location.


### SetMatrix Invocation

This function can be called in three different ways:

- `SetMatrix( Matrix, RowIndex, ColIndex )`: Sets the value using two zero based numerical indexes.

- `SetMatrix( Matrix, Address )`: Sets the value using a spreadsheet style address.

- `SetMatrix( Matrix, RowCol )`: Sets the value using any combination of addressing styles.


### SetMatrix Return Value

This function does not return a value.


### SetMatrix Usage

```javascript
// Create a blank datatable.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Create a 3x3 test matrix.
let matrix = [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ];

// Set the datatable from a values in the matrix.
table.SetMatrix( matrix, 0, 0 );
```


---------------------------------------------------------------------


## FromObjects( Objects )

Replaces the content of the datatable with columns and values found in the given objects.
Note that this function replaces all data contained in the datatable.


### FromObjects Invocation

The `Objects` parameter is required, so there is only one way to call this:

- `FromObjects( Objects )`:
	- `Objects` is an array of objects.


### FromObjects Return Value

This object does not return a value.


### FromObjects Usage

```javascript
// Create a blank datatable.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

```


---------------------------------------------------------------------


## ToObjects()

Converts the datatable values into an array of JSON objects.
Column headings will be used for JSON field names if available.


### ToObjects Invocation

This function takes no parameters, so there is only one way to call this function:

- `ToObjects()`


### ToObjects Return Value

This function returns an array of JSON objects.


### ToObjects Usage

```javascript
// Create a blank datatable.
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatatable();

// Will return an empty object of no data exists.
json = table.ToObjects();
// json = {}

// Add some test data.
let test_matrix = 
[
	[ 'Alice', 23 ],
	[ 'Bob', 25 ],
	[ 'Eve', 24 ],
]
table.InsertRows( test_matrix, 0 );

// Convert table to an array of json objects.
json = table.ToObjects();
// json = 
// 	{
// 		{ column0: 'Alice', column1: 23 },
// 		{ column0: 'Bob',   column1: 25 },
// 		{ column0: 'Eve',   column1: 24 },
// 	}

// Add some columns.
table.ColumnHeading( 0, 'Name' );
table.ColumnHeading( 1, 'Age' );

// Convert table to an array of json objects.
json = table.ToObjects();
// json = 
// 	{
// 		{ Name: 'Alice', Age: 23 },
// 		{ Name: 'Bob',   Age: 25 },
// 		{ Name: 'Eve',   Age: 24 },
// 	}
```

