
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


## GetMatrix( FromRow, FromColumn, ToRow, ToColumn )

### GetMatrix Invocation

### GetMatrix Return Value

### GetMatrix Usage


---------------------------------------------------------------------


## SetMatrix( Matrix, ToRow, ToColumn )

### SetMatrix Invocation

### SetMatrix Return Value

### SetMatrix Usage


---------------------------------------------------------------------


## FromObjects( Objects )

### FromObjects Invocation

### FromObjects Return Value

### FromObjects Usage



---------------------------------------------------------------------


## ToObjects()

### ToObjects Invocation

### ToObjects Return Value

### ToObjects Usage


---------------------------------------------------------------------


## TransposeTable()

### TransposeTable Invocation

### TransposeTable Return Value

### TransposeTable Usage


