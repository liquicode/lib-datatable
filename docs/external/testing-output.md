# Testing Output


```


  01) Utils Tests
    value_missing( Value )
      ✓ returns TRUE when called without parameters.
      ✓ returns TRUE when called with null.
      ✓ returns TRUE when called with undefined.
      ✓ returns FALSE when called with FALSE.
      ✓ returns FALSE when called with 0.
      ✓ returns FALSE when called with empty string ''.
      ✓ returns FALSE when called with a numeric value.
      ✓ returns FALSE when called with a string value.
    resolve_index( Count, Index )
      ✓ throws an error when called without any parameters: resolve_index()
      ✓ throws an error when called without an Index parameter: resolve_index( Count )
      ✓ can be called with a positive Index parameter: (0 <= Index < Count)
      ✓ returns null when called with an out of bounds positive Index parameter: (Index >= Count)
      ✓ can be called with a negative Index parameter: (-Count <= Index < 0)
      ✓ returns null when called with an out of bounds negative Index parameter: (Index < -Count)
    address2number( Address )
      ✓ throws an error when called without parameters: address2number()
      ✓ throws an error when called with null: address2number( null )
      ✓ throws an error when called with an invalid address: address2number( 'R2D2' )
      ✓ returns 0 when called with an empty string: address2number( '' )
      ✓ can convert simple addresses: A => 1
      ✓ can convert simple addresses: M => 13
      ✓ can convert simple addresses: Z => 26
      ✓ can convert moderately complex addresses: AA => 27
      ✓ can convert moderately complex addresses: AB => 28
      ✓ can convert moderately complex addresses: AZ => 52
      ✓ can convert moderately complex addresses: BA => 53
      ✓ can convert moderately complex addresses: CZ => 104
      ✓ can convert rather complex addresses: ABC => 731
      ✓ can convert rather complex addresses: DEF => 2840
      ✓ can convert rather complex addresses: KJUFH => 5216856
    number2address( Number )
      ✓ throws an error when called without parameters: number2address()
      ✓ throws an error when called with null: number2address( null )
      ✓ throws an error when called with null: number2address( null )
      ✓ can convert simple addresses: 1 => A
      ✓ can convert simple addresses: 13 => M
      ✓ can convert simple addresses: 26 => Z
      ✓ can convert moderately complex addresses: 27 => AA
      ✓ can convert moderately complex addresses: 28 => AB
      ✓ can convert moderately complex addresses: 52 => AZ
      ✓ can convert moderately complex addresses: 53 => BA
      ✓ can convert moderately complex addresses: 104 => CZ
      ✓ can convert moderately complex addresses: 731 => ABC
      ✓ can convert moderately complex addresses: 2840 => DEF
      ✓ can convert moderately complex addresses: 5216856 => KJUFH

  02) Internal Tests
    ✓ creates a new datatable
    ✓ creates a datatable from a matrix

  12) Datatable Cells Tests
    RowCol( RowIndex, ColIndex )
      ✓ returns a null RowCol when called without parameters: RowCol()
      ✓ can be called with only a row component: RowCol( 0, null )
      ✓ can be called with only a column component: RowCol( null, 0 )
      ✓ can be called with two numeric parameters: RowCol( 0, 0 )
      ✓ can be called with two numeric parameters: RowCol( 12, 12 )
      ✓ can be called with two numeric parameters: RowCol( 25, 25 )
      ✓ can be called with two out of bounds positive parameters: RowCol( 51, 51 )
      ✓ can be called with (in bounds) negative numeric parameters: RowCol( -25, -25 )
      ✓ returns null values when called with one out of bounds negative parameters: RowCol( 51, -51 )
      ✓ returns null values when called with one out of bounds negative parameters: RowCol( -51, 51 )
      ✓ returns null values when called with two out of bounds negative parameters: RowCol( -51, -51 )
      ✓ can be called with a string parameter: RowCol( 'A1' )
      ✓ can be called with a string parameter: RowCol( 'AZ12' )
      ✓ can be called with an object parameter: RowCol( { col_addr: 'AZ', row_num: 12 } )
    GetValue( RowIndex, ColIndex )
      ✓ throws an error when called without parameters: GetValue()
      ✓ throws an error when called with a single numeric parameter: GetValue( 0 )
      ✓ throws an error when addressing a cell that does not exist: GetValue( 99, 99 )
      ✓ can be called with two numeric parameters: GetValue( 0, 0 )
      ✓ can be called with two numeric parameters: GetValue( 1, 1 )
      ✓ can be called with negative index values: GetValue( -1, -1 )
      ✓ can be called with negative index values: GetValue( -2, -2 )
    SetValue( Value, RowIndex, ColIndex )
      ✓ throws an error when called without parameters: SetValue( 'test' )
      ✓ throws an error when called with a single numeric parameter: SetValue( 'test', 0 )
      ✓ throws an error when addressing a cell that does not exist: SetValue( 'test', 99, 99 )
      ✓ can be called with two numeric parameters: SetValue( 'test', 0, 0 )
      ✓ can be called with two numeric parameters: SetValue( 'test', 1, 1 )
      ✓ can be called with negative index values: SetValue( 'test', -1, -1 )
      ✓ can be called with negative index values: SetValue( 'test', -2, -2 )

  13) Datatable Columns Tests
    DeleteColumns( Count, AtColumn )
      ✓ throws an error when called without parameters: DeleteColumns()
      ✓ throws an error when called with a single parameter: DeleteColumns( 1 )
      ✓ can delete a single column: DeleteColumns( 1, 0 )
      ✓ can delete multiple columns: DeleteColumns( 3, 2 )
      ✓ can delete columns from the end: DeleteColumns( 3, -3 )
    ClearColumns( Count, AtColumn )
      ✓ throws an error when called without parameters: ClearColumns()
      ✓ throws an error when called with a single parameter: ClearColumns( 1 )
      ✓ can clear a single column: ClearColumns( 1, 0 )
      ✓ can clear multiple columns: ClearColumns( 3, 2 )
      ✓ can clear columns from the end: ClearColumns( 3, -3 )
    InsertBlankColumns( Count, AtColumn )
      ✓ throws an error when called without parameters: InsertBlankColumns()
      ✓ throws an error when called with a single parameter: InsertBlankColumns( 1 )
      ✓ can insert a single column: InsertBlankColumns( 1, 0 )
      ✓ can insert multiple columns: InsertBlankColumns( 3, 2 )
      ✓ can insert columns at the end: InsertBlankColumns( 3, -1 )

  14) Datatable Rows Tests
    DeleteRows( Count, AtRow )
      ✓ throws an error when called without parameters: DeleteRows()
      ✓ throws an error when called with a single parameter: DeleteRows( 1 )
      ✓ can delete a single row: DeleteRows( 1, 0 )
      ✓ can delete multiple rows: DeleteRows( 3, 2 )
      ✓ can delete rows from the end: DeleteRows( 3, -3 )
    ClearRows( Count, AtRow )
      ✓ throws an error when called without parameters: ClearRows()
      ✓ throws an error when called with a single parameter: ClearRows( 1 )
      ✓ can clear a single row: ClearRows( 1, 0 )
      ✓ can clear multiple rows: ClearRows( 3, 2 )
      ✓ can clear rows from the end: ClearRows( 3, -3 )
    InsertBlankRows( Count, AtRow )
      ✓ throws an error when called without parameters: InsertBlankRows()
      ✓ throws an error when called with a single parameter: InsertBlankRows( 1 )
      ✓ can insert a single row: InsertBlankRows( 1, 0 )
      ✓ can insert multiple rows: InsertBlankRows( 3, 2 )
      ✓ can insert rows at the end: InsertBlankRows( 3, -1 )

  15) Datatable Table Tests
    Constructor Functions
      ✓ should create table from matrix
      ✓ should create table from a partial matrix
    RowCount( Count )
      ✓ returns the current row count when called with no parameters
      ✓ can grow the table when setting a new row count
      ✓ can shrink the table when setting a new row count
      ✓ can shrink the table when removing all rows
    ColumnCount( Count )
      ✓ returns the current row count when called with no parameters
      ✓ can grow the table when setting a new column count
      ✓ can shrink the table when setting a new column count
      ✓ can shrink the table when removing all columns
    SetSize( RowCount, ColCount )
      ✓ can grow a table to resize it
      ✓ can shrink a table to resize it
      ✓ can shrink a table to clear it
    To/From Objects
      ✓ should create a table and column headings from an array of objects
      ✓ should re-create an array of objects
    To/From Matrix
      ✓ should create a matrix
      ✓ should create a matrix of indexed columns
      ✓ should create a matrix of named columns
      ✓ should create a matrix of mixed columns
      ✓ should create a matrix with null columns
      ✓ should create a matrix with '-1' columns

  16) Datatable Shaping Tests
    TransposeTable Function
      ✓ should transpose a table
    AppendTable Function
      ✓ should append single column tables
      ✓ should append multi column tables
      ✓ should append mapped columns
      ✓ should add missing columns
    JoinTable Function
      ✓ should inner join tables
      ✓ should left join tables
      ✓ should right join tables
      ✓ should full join tables
      ✓ should join tables with columns projection


  134 passing (102ms)


```


