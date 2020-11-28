
# Function Summary


## Library Constructor Functions

| Function                                   | Description                                                               |
|--------------------------------------------|---------------------------------------------------------------------------|
| NewDatatable()                             | Creates a new `Datatable` with no rows and no columns.                    |
| NewBlankDatatable( RowCount, ColumnCount ) | Creates a new `Datatable` with the specified number of rows and columns.  |
| FromMatrix( Matrix )                       | Creates a new `Datatable` from an array of arrays.                        |


## Table Manipulation

| Function                                           | Description                                                       |
|----------------------------------------------------|-------------------------------------------------------------------|
| RowCount( Count )                                  | Used to get and set the number of rows in a `Datatable`.          |
| ColumnCount( Count )                               | Used to get and set the number of columns in a `Datatable`.       |
| SetSize( RowCount, ColumnCount )                   | Used to set the number of rows and/or columns in a `Datatable`.   |
| GetMatrix( FromRow, FromColumn, ToRow, ToColumn )  | Get a matrix (array of arrays) of a portion of the `Datatable`.   |
| SetMatrix( Matrix, ToRow, ToColumn )               | Set a matrix (array of arrays) to a portion of the `Datatable`.   |
| FromObjects( Objects )                             | Initializes the `Datatable` with values from an array of objects. |
| ToObjects()                                        | Returns the `Datatable` content as an array of objects.           |


## Cell Manipulation

| Function                    | Description                                                                                                    |
|-----------------------------|----------------------------------------------------------------------------------------------------------------|
| RowCol( AtRow, AtColumn )   | Creates a `RowCol` object from numerical indexes, a spreadsheet like string address, or another RowCol object. |
| GetValue( AtRow, AtColumn ) | Gets the value stored at a specific location within the `Datatable`.                                           |
| SetValue( AtRow, AtColumn ) | Sets the value stored at a specific location within the `Datatable`.                                           |


## Column Manipulation

| Function                              | Description                                                                        |
|---------------------------------------|------------------------------------------------------------------------------------|
| DeleteColumns( Count, AtColumn )      | Deletes a number of columns starting at a specific column index.                   |
| ClearColumns( Count, AtColumn )       | Clears all cell values in a number of columns starting at a specific column index. |
| InsertBlankColumns( Count, AtColumn ) | Inserts a number of blank columns starting at a specific column index.             |
| ColumnHeading( AtColumn, Heading)     | Get and set the heading for each column.                                           |


## Row Manipulation

| Function                        | Description                                                                  |
|---------------------------------|------------------------------------------------------------------------------|
| DeleteRows( Count, AtRow )      | Deletes a number of rows starting at a specific row index.                   |
| ClearRows( Count, AtRow )       | Clears all cell values in a number of rows starting at a specific row index. |
| InsertBlankRows( Count, AtRow ) | Inserts a number of blank rows starting at a specific row index.             |

