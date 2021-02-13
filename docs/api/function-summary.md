
# Function Summary


## Constructor Functions

- [NewDatatable()](api/lib-datatable?id=newdatatable) :
	Creates a new `Datatable` with no rows and no columns.

- [NewBlankDatatable( RowCount, ColumnCount )](api/lib-datatable?id=newblankdatatable-rowcount-columncount-) :
	Creates a new `Datatable` with the specified number of rows and columns.

- [FromMatrix( Matrix )](api/lib-datatable?id=frommatrix-matrix-) :
	Creates a new `Datatable` from an array of arrays.


## Table Functions

- [RowCount( Count )](api/datatable-table?id=rowcount-count-) :
	Used to get and set the number of rows in a `Datatable`.

- [ColumnCount( Count )](api/datatable-table?id=columncount-count-) :
	Used to get and set the number of columns in a `Datatable`.

- [SetSize( RowCount, ColumnCount )](api/datatable-table?id=setsize-rowcount-columncount-) :
	Used to set the number of rows and/or columns in a `Datatable`.

- [GetMatrix( FromRowIndex, FromColumnIndex, ToRowIndex, ToColumnIndex )](api/datatable-table?id=getmatrix-fromrowindex-fromcolumnindex-torowindex-tocolumnindex-) :
	Get a matrix (array of arrays) of a portion of the `Datatable`.

- [SetMatrix( Matrix, ToRow, ToColumn )](api/datatable-table?id=setmatrix-matrix-torow-tocolumn-) :
	Set a matrix (array of arrays) to a portion of the `Datatable`.

- [FromObjects( Objects )](api/datatable-table?id=fromobjects-objects-) :
	Initializes the `Datatable` with values from an array of objects.

- [ToObjects()](api/datatable-table?id=toobjects) :
	Returns the `Datatable` content as an array of objects.

- [TransposeTable()](api/datatable-table?id=transposetable) :
	Transposes the datatable by switching values from rows to columns.


## Cell Functions

- [RowCol( AtRow, AtColumn )](api/datatable-cells?id=rowcol-atrow-atcolumn-) :
	Creates a `RowCol` object from numerical indexes, a spreadsheet like string address, or another RowCol object.

- [GetValue( AtRow, AtColumn )](api/datatable-cells?id=getvalue-atrow-atcolumn-) :
	Gets the value stored at a specific location within the `Datatable`.

- [SetValue( Value, AtRow, AtColumn )](api/datatable-cells?id=setvalue-value-atrow-atcolumn-) :
	Sets the value stored at a specific location within the `Datatable`.


## Column Functions

- [DeleteColumns( Count, AtColumn )](api/datatable-columns?id=deletecolumns-count-atcolumn-) :
	Deletes a number of columns starting at a specific column index.

- [ClearColumns( Count, AtColumn )](api/datatable-columns?id=clearcolumns-count-atcolumn-) :
	Clears all cell values in a number of columns starting at a specific column index.

- [InsertBlankColumns( Count, AtColumn )](api/datatable-columns?id=insertblankcolumns-count-atcolumn-) :
	Inserts a number of blank columns starting at a specific column index.

- [ColumnHeading( AtColumn, Heading)](api/datatable-columns?id=columnheading-atcolumn-heading-) :
	Get and set the heading for each column.

- [ColumnInfo( AtColumn, Info)](api/datatable-columns?id=columninfo-atcolumn-info-) :
	Get and set the application defined info for each column.


## Row Functions

- [DeleteRows( Count, AtRow )](api/datatable-rows?id=deleterows-count-atrow-) :
	Deletes a number of rows starting at a specific row index.

- [ClearRows( Count, AtRow )](api/datatable-rows?id=clearrows-count-atrow-) :
	Clears all cell values in a number of rows starting at a specific row index.

- [InsertBlankRows( Count, AtRow )](api/datatable-rows?id=insertblankrows-count-atrow-) :
	Inserts a number of blank rows starting at a specific row index.

- [InsertRows( Matrix, AtRow )](api/datatable-rows?id=insertrows-matrix-atrow-) :
	Inserts rows from a matrix starting at a specific row index.

