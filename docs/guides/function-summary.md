
# Function Summary


## Library Constructor Functions

| Function                                   | Description |
|--------------------------------------------|-------------|
| NewDatatable()                             |             |
| NewBlankDatatable( RowCount, ColumnCount ) |             |
| FromMatrix( Matrix )                       |             |


## Table Manipulation

| Function                         | Description                                                     |
|----------------------------------|-----------------------------------------------------------------|
| RowCount( Count )                | Used to get and set the number of rows in a `Datatable`.        |
| ColumnCount( Count )             | Used to get and set the number of columns in a `Datatable`.     |
| SetSize( RowCount, ColumnCount ) | Used to set the number of rows and/or columns in a `Datatable`. |


## Cell Manipulation

| Function                    | Description                                                                                                                  |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------|
| RowCol( AtRow, AtColumn )   | Creates a `RowCol` object from numerical indexes, a spreadsheet like string address, or another RowCol object. |
| GetValue( AtRow, AtColumn ) | Gets the value stored at a specific location within the datatable.                                                           |
| SetValue( AtRow, AtColumn ) | Sets the value stored at a specific location within the datatable.                                                           |


## Column Manipulation

| Function                              | Description                                                                        |
|---------------------------------------|------------------------------------------------------------------------------------|
| DeleteColumns( Count, AtColumn )      | Deletes a number of columns starting at a specific column index.                   |
| ClearColumns( Count, AtColumn )       | Clears all cell values in a number of columns starting at a specific column index. |
| InsertBlankColumns( Count, AtColumn ) | Inserts a number of blank columns starting at a specific column index.             |


## Row Manipulation

| Function                        | Description                                                                  |
|---------------------------------|------------------------------------------------------------------------------|
| DeleteRows( Count, AtRow )      | Deletes a number of rows starting at a specific row index.                   |
| ClearRows( Count, AtRow )       | Clears all cell values in a number of rows starting at a specific row index. |
| InsertBlankRows( Count, AtRow ) | Inserts a number of blank rows starting at a specific row index.             |

