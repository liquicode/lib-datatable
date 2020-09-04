
# lib-datatable

A NodeJS library to manipulate an in memory table (array of arrays).

Use the library to create a `Datatable` object.
With a `Datatable` you can maniuplate a two dimesional array of data.
You can add and remove columns, get and set individual cell values, and convert to and from an array of objects.

Internally, all data is stored as an array of rows.
Each row stores an array of cell values.
Cell values can be of a nativa data type (e.g. number, string) or a complex object.


## Getting Started

Install via NPM:
```bash
npm install @liquicode/lib-datatable
```


## Usage

Include the datatable library in your source code:
```js
let Datatable = require( '@liquicode/lib-datatable' );
```

Creating Rows and Columns:
```js
Datatable.InsertBlankColumns( 5 );		// Add 5 columns to the beginning.
Datatable.InsertBlankColumns( 5, 0 );	// Add 5 columns to the beginning.
Datatable.InsertBlankColumns( 5, -1 );	// Add 5 columns to the end.
Datatable.InsertBlankRows( 5 );			// Add 5 rows to the beginning.
Datatable.InsertBlankRows( 5, 0 );		// Add 5 rows to the beginning.
Datatable.InsertBlankRows( 5, -1 );		// Add 5 rows to the end.
Datatable.SetValue( '', 99, 99 );		// Extend the table to 100 rows and 100 columns.
```

Deleting Rows and Columns:
```js
Datatable.DeleteColumns( 1, -1 );	// Delete the last column.
Datatable.DeleteRows( 1, 0 );		// Delete the first row.
Datatable.DeleteColumns();			// Delete all columns.
Datatable.DeleteRows();				// Delete all rows.
```

Getting Cell Values:
```js
Datatable.GetValue();				// Get the value at the first row and column.
Datatable.GetValue( 0 );			// Get the value at the first row and column.
Datatable.GetValue( 0, 0 );			// Get the value at the first row and column.
Datatable.GetValue( 1, 1 );			// Get the value at the second row and column.
Datatable.GetValue( -1, -1 );		// Get the value at the last row and column.
```

Setting Cell Values:
```js
Datatable.SetValue( 'home' );			// Set the value at the first row and column.
Datatable.SetValue( 'home', 0 );		// Set the value at the first row and column.
Datatable.SetValue( 'home', 0, 0 );		// Set the value at the first row and column.
Datatable.SetValue( 'start', 1, 1 );	// Set the value at the second row and column.
Datatable.SetValue( 'end', -1, -1 );	// Set the value at the last row and column.
```


## TODO:

- Cell addressing: `C4` or `3, 4` or `{ r:4, c:3 }`
- Cell ranges: `A1-C5` or `A1:C5` or `A` or `A:C`

