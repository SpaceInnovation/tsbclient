import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import EnhancedTableHead from "../../components/Table/EnhancedTableHead";
import EnhancedTableToolbar from "../../components/Table/EnhancedTableToolbar";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  tableCellPadding: {
    padding: "0 5px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const {
    columnData,
    viewItem,
    data,
    showSearch,
    searchPlaceholder,
    deleteItem,
    id,
    editButton,
  } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [dataState, setDataState] = React.useState([]);
  const [dataStateMain, setDataStateMain] = React.useState([]);

  useEffect(() => {
    setDataState(props.data);
    setDataStateMain(props.data);
    setSelected([]);
  }, [props.data]);

  const handleChange = (event) => {
    setDataState(event.target.value);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value
      ? e.target.value.trim().toLowerCase()
      : "";
    if (searchText === "" && dataState !== dataStateMain) {
      setDataState(dataStateMain);
      return;
    }
    if (Array.isArray(columnData) && columnData.length > 0) {
      const searchObj = columnData.find((col) => col.searchable); // Get the searchable column
      if (searchObj) {
        const searchField = searchObj.id || "";
        const filtered = [];
        dataState.forEach((data) => {
          if (
            typeof data[searchField] === "string" &&
            data[searchField].toLowerCase().indexOf(searchText) > -1
          ) {
            filtered.push(data);
          }
        });
        setDataState(filtered);
      }
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataState.map((n) => n[id]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataState.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleChange={handleChange}
        showSearch={showSearch}
        handleSearch={handleSearch}
        searchPlaceholder={searchPlaceholder}
        deleteItem={() => deleteItem(selected)}
        edit={editButton}
      />

      <Table
        aria-labelledby="tableTitle"
        size={dense ? "small" : "medium"}
        aria-label="enhanced table"
      >
        {data.length > 0 ? (
          <EnhancedTableHead
            classes={classes}
            order={order}
            numSelected={selected.length}
            columnData={columnData}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={dataState.length}
            edit={editButton}
          />
        ) : (
          <div style={{ textAlign: "center" }}>No Record Available</div>
        )}
        {dataState.length > 0 && typeof dataState[0] === "object" ? (
          <TableBody>
            {stableSort(dataState, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                console.log("pablo", row);
                const isItemSelected = isSelected(row[id]);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover key={row._id}>
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => handleClick(event, row[id])}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.tableCellPadding}
                      key={`${row._id}`}
                      component="th"
                      padding="none"
                      numeric="false"
                    >
                      {row ? row.name : null}
                    </TableCell>
                    <TableCell
                      className={classes.tableCellPadding}
                      key={`${row._id}`}
                      component="th"
                      padding="none"
                      numeric="false"
                    >
                      {row.stateID ? row.stateID.name : null}
                    </TableCell>

                    <TableCell className={classes.tableCellPadding}>
                      {editButton ? editButton(row) : null}
                    </TableCell>
                    <TableCell className={classes.tableCellPadding}>
                      {viewItem ? viewItem(row) : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        ) : null}
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataState.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
