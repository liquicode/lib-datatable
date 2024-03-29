
# lib-datatable (v0.1.00)

A NodeJS library to manipulate an in memory table (array of arrays).

Use the library to create a `Datatable` object.
With a `Datatable` you can maniuplate a two dimesional array of data.
You can add and remove columns, get and set individual cell values, and 
convert to and from an array of Javascript objects.

Internally, all data is stored as an array of arrays.
This is an array of rows, each of which is composed of an array of cell values.
There is no restriction on the content of a Cell, it can be of any nativa data
type (e.g. number, string) or even a complex object.

A `Datatable` also maintains an array of column headings (`data.column_headings`).
Column headings are not required for the primary functions of a `Datatable` but are
used when converting a `Datatable` to and from an array of Javascript or JSON objects.
In such cases, a `Datatable` column corresponds to a field within the object.

Since the internal representation of a `Datatable` is an array of arrays with an
optional array of column metadata, a significant amount of overhead is avoided as
compared to an array of JSON objects.
That is, we are storing any object field names only once as column metadata rather
than repeating this information for each stored object.
This makes a `Datatable` take up much less memory and makes it an ideal format
for serialization and transmission of large data.


---------------------------------------------------------------------


## Getting Started

***NodeJS***
Install via NPM:
```bash
npm install @liquicode/lib-datatable
```

Use the imported `LibDatatable` object:
```javascript
const LibDatatable = require( '@liquicode/lib-datatable' );
let table = LibDatatable.NewDatable();
table.SetSize( 100, 5 );
```

***NodeJS***
Include via url:
```html
<script type="text/javascript" src="{url}/lib-datatable.min.js"></script>
```

Use the globally defined `LibDatatable` object:
```javascript
let table = LibDatatable.NewDatable();
table.SetSize( 100, 5 );
```

---------------------------------------------------------------------


## Simple Usage

### Include the Datatable library in your source code
```javascript
const LibDatatable = require( '@liquicode/lib-datatable' );
```

### Create a Datatable object
```javascript
let table = LibDatatable.NewDatable();		// Create an empty table with no rows or columns.
table.SetSize( 100, 5 );				// Resize the table to give it 100 rows and 5 columns.
```

### Add some data

```javascript
let counter = 0;
for( let row = 0; row < table.RowCount(); row++ )
{
	for( let col = 0; col < table.ColumnCount(); col++ )
	{
		table.SetValue( counter, row, col );
		counter++;
	}
}
```

Also:

```javascript
let counter = 0;
for( let row = 0; row < 100; row++ )
{
	for( let col = 0; col < 20; col++ )
	{
		// Datatable automatically grows to include row and col.
		table.SetValue( counter, row, col );
		counter++;
	}
}
```

### Read some data
```javascript
table.GetValue( 0, 0 ) === 0		// TRUE
table.GetValue( 'A1' ) === 0		// TRUE
table.GetValue( 0, 'A' ) === 0		// TRUE
table.GetValue( { row_num: 1, col_addr: 'A' } ) === 0		// TRUE

table.GetValue( 0, 1 ) === 1		// TRUE
table.GetValue( 'B1' ) === 1		// TRUE
table.GetValue( 0, 'B' ) === 1		// TRUE
table.GetValue( { row_num: 1, col_num: 2 } ) === 1		// TRUE

table.GetValue( 0, 2 ) === 2		// TRUE
table.GetValue( 'C1' ) === 2		// TRUE
table.GetValue( 0, 'C' ) === 2		// TRUE
table.GetValue( { row_index: 0, col_num: 3 } ) === 2		// TRUE
```


---------------------------------------------------------------------

## Changes from v0.0.13 to v0.1.00

- Mature the concept of Column Headings
The Datatable now maintains an array of Column objects.
When columns are added or removed, the `columns` array is updated as well.
Each Column object has a `title` (replaces `heading`), `id`, and `info` fields.
The `title` field replaces the `heading` field in previous versions.
The `id` field is new and stores an automatically generated unique id.
The `info` field is the same as before and allows you to store an arbitrary object with each column.

- Enhance column addressing by using column `[title]` or column `{id}`.

- Add Calculated Columns
A Calculated Column has a calculation to determine its contents.
Cell values in a calculated column are read-only.


---------------------------------------------------------------------


## More Links

- [Library Source Code](https://github.com/liquicode/lib-datatable)
- [Library Docs Site](http://lib-datatable.liquicode.com)
- [Library NPM Page](https://www.npmjs.com/package/@liquicode/lib-datatable)

