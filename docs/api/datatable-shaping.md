
# Datatable Shaping

Functions to manipulate a `Datatable`.


---------------------------------------------------------------------


## TransposeTable()

This function transposes the datatable by switching values from rows to columns.


### TransposeTable Invocation

This function takes no parameters, so there is only one way to call this function:

- `TransposeTable()`


### TransposeTable Return Value

This function does not return a value.


### TransposeTable Usage

```javascript
const LibDatatable = require( '@liquicode/lib-datatable' );

let table = LibDatatable.FromMatrix( [ 
		[ 1, 2, 3 ], 
		[ 4, 5, 6 ], 
		[ 7, 8, 9 ] 
	] );

// table =
// 	[
// 		[ 1, 2, 3 ],
// 		[ 4, 5, 6 ],
// 		[ 7, 8, 9 ],
// 	]

table.TransposeTable();

// table =
// 	[
// 		[ 1, 4, 7 ],
// 		[ 2, 5, 8 ],
// 		[ 3, 6, 9 ],
// 	]

```


---------------------------------------------------------------------


## AppendTable( OtherTable, ColumnIndexesOrHeadings )

This function appends rows to this `Datatable` from rows found in another `Datatable`.
Use the `ColumnIndexesOrHeadings` parameter to control which column values to include when appending rows from `OtherTable`.


### AppendTable Invocation

This function has one optional parameter and can be called in two ways:

- `AppendTable( OtherTable )`: Appends rows containing all columns from `OtherTable`.
- `AppendTable( OtherTable, ColumnIndexesOrHeadings )`: Appends rows containing only the columns in `ColumnIndexesOrHeadings`.

The `ColumnIndexesOrHeadings` parameter is optional.
When supplied it must be an array containing either column indexes, column headings, or a mix of the two.
This function calls `OtherTable.ToMatrix( ColumnIndexesOrHeadings )` to get the values that will be appended to this `Datatable`.
To get more information about how this works, see the [ToMatrix( ColumnIndexesOrHeadings )](api/datatable-table?id=tomatrix-columnindexesorheadings-) function.


### AppendTable Return Value

This function does not return a value.


### AppendTable Usage

```javascript
const LibDatatable = require( '@liquicode/lib-datatable' );

// Setup table 1.
let table1 = LibDatatable.NewDatatableFromObjects( [
	{ text: 'A', number: 1 },
	{ text: 'B', number: 2 },
	{ text: 'C', number: 3 },
] );

// Setup table 2.
let table2 = LibDatatable.NewDatatableFromObjects( [
	{ foo: 'koo', number: 4, text: 'D' },
	{ foo: 'bar', number: 5, text: 'E' },
	{ foo: 'baz', number: 6, text: 'F' },
] );

// Append table.
table1.AppendTable( table2, [ 'text', 'number' ] );

// Get the appended table data.
let objects = table1.ToObjects();
// objects =
// 	[
// 		{ text: 'A', number: 1 },
// 		{ text: 'B', number: 2 },
// 		{ text: 'C', number: 3 },
// 		{ text: 'D', number: 4 },
// 		{ text: 'E', number: 5 },
// 		{ text: 'F', number: 6 },
// 	]
```


---------------------------------------------------------------------


## JoinTable( AtColumn, JoinType, RightTable, RightColumn, RightColumnIndexesOrHeadings )

This function transposes the datatable by switching values from rows to columns.


### JoinTable Invocation

- `JoinTable( AtColumn, JoinType, RightTable, RightColumn )`
	- Performs the join. All columns in `RightTable` are joined with this `Datatable`.
- `JoinTable( AtColumn, JoinType, RightTable, RightColumn, RightColumnIndexesOrHeadings )`
	- Performs the join. Only columns listed in `RightColumnIndexesOrHeadings` are joined with this `Datatable`.

For the purposes of joining, this `Datatable` is considered the left table in the join
	and `AtColumn` identifies the left column to join from.
The right table and column are identified by the `RightTable` (a `Datatable`) and `RightColumn` (a column index or address).

The `JoinType` parameter must be supplied and can be one of the following:
- `inner`: Only rows where both the left row and right row exist.
- `left`: All rows from the left and any matching rows from the right.
- `right`: All rows from the right and any matching rows from the left.
- `full`: All rows from both the left and right, regardless of matching.

The `RightColumnIndexesOrHeadings` parameter is optional.
When supplied it must be an array containing either column indexes, column headings, or a mix of the two.
This function calls `RightTable.ToMatrix( RightColumnIndexesOrHeadings )` to get the values that represent the right rows in the join operation.
To get more information about how this works, see the [ToMatrix( ColumnIndexesOrHeadings )](api/datatable-table?id=tomatrix-columnindexesorheadings-) function.


### JoinTable Return Value

This function does not return a value.


### JoinTable Usage

```javascript
const LibDatatable = require( '@liquicode/lib-datatable' );

table_customers = LibDatatable.NewDatatableFromObjects(
	[
		{ customer_id: 1, name: 'Alice' },
		{ customer_id: 2, name: 'Bob' },
		{ customer_id: 3, name: 'Eve' },
	]
);

table_orders = LibDatatable.NewDatatableFromObjects(
	[
		{ order_id: 1, customer_id: 2, item: 'pretzels' },
		{ order_id: 2, customer_id: 1, item: 'chips' },
		{ order_id: 3, customer_id: 2, item: 'soda' },
		{ order_id: 4, customer_id: 0, item: 'cheeseburger' },
	]
);

// Clone the customers table.
let table = table_customers.Clone();

// Left join with orders table on customer_id
table.JoinTable( 0, 'left', table_orders, 1 );

// Reset the column headings.
table.ColumnHeadings( [ ...table_customers.ColumnHeadings(), ...table_orders.ColumnHeadings() ] );

// Read the joined data.
let objects = table.ToObjects();
// objects = 
// 	[
// 		{ customer_id: 1, name: 'Alice', order_id: 2, customer_id: 1, item: 'chips' },
// 		{ customer_id: 2, name: 'Bob', order_id: 1, customer_id: 2, item: 'pretzels' },
// 		{ customer_id: 2, name: 'Bob', order_id: 3, customer_id: 2, item: 'soda' },
// 		{ customer_id: 3, name: 'Eve', order_id: null, customer_id: null, item: null },
// 	]

// Join again but an inner join and include only specific columns this time.
let orders_columns = [ 'order_id', 'item' ];
let table = table_customers.Clone();
table.JoinTable( 0, 'inner', table_orders, 1, orders_columns );
table.ColumnHeadings( [ ...table_customers.ColumnHeadings(), ...orders_columns ] );
let objects = table.ToObjects();
// objects = 
// 	[
// 		{ customer_id: 1, name: 'Alice', order_id: 2, item: 'chips' },
// 		{ customer_id: 2, name: 'Bob', order_id: 1, item: 'pretzels' },
// 		{ customer_id: 2, name: 'Bob', order_id: 3, item: 'soda' },
// 	]
```

