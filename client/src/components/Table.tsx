import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Table as MuiTable,
  TableFooter,
  TablePagination,
  Box,
  IconButton,
  useTheme,
  TableHead,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomTheme } from "../lib/theme";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

interface TableData {
  data: any[];
  headers: string[];
  action: (id: string) => void;
}

export default function Table(props: TableData) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const belowSmMatches = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down("sm")
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <MuiTable
        sx={{ minWidth: 500 }}
        size={belowSmMatches ? "small" : "medium"}
        aria-label="custom pagination table"
      >
        <TableHead sx={{ "& th": { backgroundColor: "secondary.light" } }}>
          <TableRow>
            {props.headers.map((header) => (
              <TableCell>
                <Typography
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  {header}
                </Typography>
              </TableCell>
            ))}
            <TableCell>
              <Typography
                textTransform="uppercase"
                fontWeight="bold"
                textAlign="right"
              >
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? props.data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.data
          ).map((single: any[], idx: number) => (
            <TableRow key={idx} className="trow">
              {single.map((col) => (
                <TableCell component="th" scope="row">
                  {col}
                </TableCell>
              ))}
              <TableCell style={{ width: 160 }} align="right">
                <Button onClick={() => props.action(`${idx}`)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={props.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MuiTable>
    </TableContainer>
  );
}
