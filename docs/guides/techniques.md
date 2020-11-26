
# Techniques


## Include the Datatable library in your source code

```javascript
const LibDatatable = require( '@liquicode/lib-datatable' );
```

## Use library constructors to create a Datatable

```javascript
let table = LibDatatable.NewDatable();		// Create an empty table with no rows or columns.
let table = LibDatatable.FromMatrix( M );	// Create a table from an array of arrays.
let table = LibDatatable.FromObjects( O );	// Create a table from an array of objects.
```

## Creating Rows and Columns

```javascript
table.InsertBlankColumns( 5 );		// Add 5 columns to the beginning.
table.InsertBlankColumns( 5, 0 );	// Add 5 columns to the beginning.
table.InsertBlankColumns( 5, -1 );	// Add 5 columns to the end.
table.InsertBlankRows( 5 );			// Add 5 rows to the beginning.
table.InsertBlankRows( 5, 0 );		// Add 5 rows to the beginning.
table.InsertBlankRows( 5, -1 );		// Add 5 rows to the end.
table.SetValue( '', 99, 99 );		// Extend the table to 100 rows and 100 columns.
```

## Deleting Rows and Columns

```javascript
table.DeleteColumns( 1, -1 );	// Delete the last column.
table.DeleteRows( 1, 0 );		// Delete the first row.
table.DeleteColumns();			// Delete all columns.
table.DeleteRows();				// Delete all rows.
```

## Getting Cell Values

```javascript
table.GetValue();				// Get the value at the first row and column.
table.GetValue( 0 );			// Get the value at the first row and column.
table.GetValue( 0, 0 );			// Get the value at the first row and column.
table.GetValue( 1, 1 );			// Get the value at the second row and column.
table.GetValue( -1, -1 );		// Get the value at the last row and column.
```

## Setting Cell Values

```javascript
table.SetValue( 'home' );			// Set the value at the first row and column.
table.SetValue( 'home', 0 );		// Set the value at the first row and column.
table.SetValue( 'home', 0, 0 );		// Set the value at the first row and column.
table.SetValue( 'start', 1, 1 );	// Set the value at the second row and column.
table.SetValue( 'end', -1, -1 );	// Set the value at the last row and column.
```


## Create a table from an array of arrays

```javascript
let matrix = 
[
	[ 1, 2, 3 ],
	[ 4, 5, 6 ],
	[ 7, 8, 9 ]
];
let table = LibDatatable.FromMatrix( matrix );
// or
let table = LibDatatable.NewDatatable();
table.InsertRows( matrix );
```
`table` now looks like:
```
   |   | 
---+---+----
 1 | 2 | 3
 4 | 5 | 6
 7 | 8 | 9
```


## Create a table from an array of objects

```javascript
let objects = 
[
	{ name: "Alice", age: 26, sport: "soccer" },
	{ name: "Bob", age: 28, sport: "hockey" },
	{ name: "Eve", age: 23, sport: "swimming" }
];
let table = LibDatatable.FromObjects( objects );
// or
let table = LibDatatable.NewDatatable();
table.InsertObjects( objects );
```
`table` now looks like:
```
name  | age | sport
------+-----+-------
Alice | 26  | soccer
Bob   | 28  | hockey
Eve   | 23  | swimming
```


## Create a subtable from an existing table

```javascript
let objects = 
[
	{ name: "Alice", age: 26, sport: "soccer" },
	{ name: "Bob", age: 28, sport: "hockey" },
	{ name: "Eve", age: 23, sport: "swimming" }
];
let table = LibDatatable.FromObjects( objects );
let matrix = table.GetMatrix( 0, 0, 1, -1 ); // get first two full rows.
let subtable = LibDatatable.FromMatrix( matrix );
```
`table` now looks like:
```
      |     | 
------+-----+-------
Alice | 26  | soccer
Bob   | 28  | hockey
```




