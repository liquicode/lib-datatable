
# lib-datatable

A NodeJS library to manipulate an in memory table (array of arrays).


## Getting Started

Install via NPM:
```
npm install @liquicode/lib-datatable
```


## Usage

Include the datatable library in your source code:
```
let Datatable = require( '@liquicode/lib-datatable' );
```


## Reference

- Internal representation is an array of arrays.
- Elements can be nativa data types (e.g. number, string) or complex objects.
- Cell addressing: 'C4' or '3, 4' or 'r:4, c:3'
- Cell Ranges: 'A1-E5' or 'A1:C5'
- Row Manipulation:
	- InsertRows( AtRow, Count )
	- DeleteRows( AtRow, Count )
	- ClearRows( AtRow, Count )
	- MoveRows( AtRow, ToRow, Count )
- Column Manipulation:
	- InsertColumns( AtColumn, Count )
	- DeleteColumns( AtColumn, Count )
	- ClearColumns( AtColumn, Count )
	- MoveColumns( AtColumn, ToColumn, Count )
- Cell/Range Manipulation:
	- GetValues( Address )
	- SetValues( Address, Value )
- Table Manipulation:
	- TransposeTable()
	- UnionTable( OtherTable, SourceKeyColumn, OtherKeyColumn )
	- IntersectTable( OtherTable )
	- SortTable( AtColumn, SortDirection, ComparisonFunction )
	- FilterTable( FilterFunction )


