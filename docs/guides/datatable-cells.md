
# Datatable Cells

## Overview

Internally all cell data is stored in an array of arrays.


---------------------------------------------------------------------


## Function GetValue( RowIndex, ColIndex )

Gets the value stored at a specific location within the datatable.

This function passes both `RowIndex` and `ColIndex` to the `RowCol()` function to resolve the actual cell location.
You can call this function with any of the addressing schemes allowed by the `RowCol()` function.

A `Datatable` cell value can be of any nativa data type (e.g. number, string) or even a complex object.


### GetValue() Invocations

This function can be called in three different ways:

- `GetValue( RowIndex, ColIndex )`: Get the value using two zero based numerical indexes.

- `GetValue( Address )`: Get the value using a spreadsheet style address.

- `GetValue( RowColObject )`: Get the value using any combination of addressing styles.


### GetValue() Return Value

This function returns whatever value was stored in the cell at the specified location.


---------------------------------------------------------------------


## Function SetValue( RowIndex, ColIndex )

Sets the value stored at a specific location within the datatable.

This function passes both `RowIndex` and `ColIndex` to the `RowCol()` function to resolve the actual cell location.
You can call this function with any of the addressing schemes allowed by the `RowCol()` function.

A `Datatable` cell value can be of any nativa data type (e.g. number, string) or even a complex object.


### SetValue() Invocations

This function can be called in three different ways:

- `SetValue( Value, RowIndex, ColIndex )`: Sets the value using two zero based numerical indexes.

- `SetValue( Value, Address )`: Sets the value using a spreadsheet style address.

- `SetValue( Value, RowColObject )`: Sets the value using any combination of addressing styles.


### SetValue() Return Value

This function does not return a value.


