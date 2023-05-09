import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Navbar from "../components/Navbar";
import "./style.css";
import { Search } from "../components";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const listingsData = [
  createData("Cozy downtown apartment", "New York City", 99),
  createData("Spacious condo with stunning views", "Los Angeles", 500),
  createData("Charming studio in historic district", "Boston", 170),
  createData("Downtown apartment", "Chicago", 80),
  createData("Sunny studio", "Los Angeles", 60),
  createData("Cozy cottage", "Seattle", 100),
  createData("Luxury penthouse", "New York City", 500),
  createData("Beachfront villa", "Miami", 250),
  createData("Charming bungalow", "Austin", 75),
  createData("Private room in historic home", "Boston", 50),
  createData("Spectacular view apartment", "San Francisco", 200),
  createData("Rustic cabin", "Denver", 120),
  createData("Treehouse retreat", "Portland", 150),
  createData("Tropical getaway", "Honolulu", 300),
  createData("Spacious loft", "Toronto", 80),
  createData("Country estate", "Nashville", 400),
  createData("Rooftop terrace apartment", "Paris", 150),
  createData("Bohemian flat", "Berlin", 90),
  createData("Historic mansion", "Washington D.C.", 350),
  createData("Modern townhouse", "Sydney", 180),
  createData("Secluded cabin", "Asheville", 100),
  createData("Beach house", "Rio de Janeiro", 220),
  createData("Ski chalet", "Zurich", 400),
].sort((a, b) => (a.price < b.price ? -1 : 1));

const eventsData = [
  createData("Food festival", "Chicago", 80),
  createData("Live music concert", "Austin", 280),
  createData("Art exhibition", "Chicago", 0),
  createData("Wine tasting", "San Francisco", 50),
  createData("Music festival", "Austin", 100),
  createData("Art fair", "New York City", 75),
  createData("Film festival", "Los Angeles", 120),
  createData("Craft beer expo", "Denver", 40),
  createData("Book festival", "Boston", 25),
  createData("Street fair", "Seattle", 20),
  createData("Fashion show", "Miami", 150),
  createData("Car show", "Detroit", 30),
  createData("Tech conference", "San Jose", 200),
  createData("Comedy festival", "Toronto", 60),
  createData("Fitness expo", "Las Vegas", 35),
  createData("Design conference", "Portland", 175),
  createData("Gaming convention", "Orlando", 80),
  createData("Science fair", "Washington D.C.", 15),
  createData("Outdoor concert", "Nashville", 90),
  createData("Sake tasting", "Tokyo", 70),
  createData("Wellness retreat", "Bali", 300),
  createData("Beer and brat festival", "Munich", 45),
].sort((a, b) => (a.price < b.price ? -1 : 1));

const restaurantsData = [
  createData("Italian bistro", "Miami", 145),
  createData("Sushi restaurant", "Seattle", 75),
  createData("Farm-to-table eatery", "Portland", 50),
  createData("French bistro", "New York City", 75),
  createData("Savor", "New Orleans", 75),
  createData("Citrus Grove", "Miami", 50),
  createData("Heritage Tavern", "Madison", 80),
  createData("The Whisk and Ladle", "San Francisco", 120),
  createData("Elevate", "Denver", 100),
  createData("Copper and Oak", "Austin", 60),
  createData("Gourmet Garden", "Seattle", 40),
  createData("Plated", "Los Angeles", 90),
  createData("Aroma", "Portland", 50),
  createData("Harvest Bistro", "Boston", 75),
  createData("Urban Butcher", "Washington D.C.", 100),
  createData("Miso Hungry", "Chicago", 30),
  createData("Amber", "Sydney", 120),
  createData("Pizzeria Mamma Mia", "Rome", 15),
  createData("Savory & Sweet", "San Diego", 50),
  createData("Brew & Chew", "London", 40),
  createData("Tapasville", "Barcelona", 30),
  createData("Gusto", "Florence", 80),
  createData("Gourmet Garage", "Paris", 100),
  createData("Basilico", "Milan", 60),
  createData("Taste of Thai", "Bangkok", 20),
  createData("Flamingo Grill", "Dubai", 150),
  createData("Sumptuous", "Toronto", 70),
  createData("Noble Grains", "Minneapolis", 90),
  createData("Farmhouse Cafe", "Portland", 40),
  createData("Authentic sushi bar", "Tokyo", 100),
  createData("Italian gelateria", "Florence", 5),
  createData("Modern Australian cuisine", "Melbourne", 80),
  createData("Chic rooftop lounge", "Dubai", 150),
].sort((a, b) => (a.price < b.price ? -1 : 1));

function createData(name: string, city: string, price: number) {
  return { name, city, price };
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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
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
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function Explore() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyrestRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - restaurantsData.length)
      : 0;

  const emptylistRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listingsData.length) : 0;

  const emptyevRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - eventsData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ marginY: 4 }}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Search />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Restaurants</Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  {(rowsPerPage > 0
                    ? restaurantsData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : restaurantsData
                  ).map((restaurantsData) => (
                    <TableRow key={restaurantsData.name} className="trow">
                      <TableCell component="th" scope="row">
                        {restaurantsData.name}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {restaurantsData.city}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {restaurantsData.price}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Button
                          onClick={() => {
                            alert("clicked");
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyrestRows > 0 && (
                    <TableRow style={{ height: 53 * emptyrestRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={restaurantsData.length}
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
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Listings</Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  {(rowsPerPage > 0
                    ? listingsData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : listingsData
                  ).map((listingsData) => (
                    <TableRow key={listingsData.name} className="trow">
                      <TableCell component="th" scope="row">
                        {listingsData.name}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {listingsData.city}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {listingsData.price}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Button
                          onClick={() => {
                            alert("clicked");
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptylistRows > 0 && (
                    <TableRow style={{ height: 53 * emptylistRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={listingsData.length}
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
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Events</Typography>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  {(rowsPerPage > 0
                    ? eventsData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : eventsData
                  ).map((eventsData) => (
                    <TableRow key={eventsData.name} className="trow">
                      <TableCell component="th" scope="row">
                        {eventsData.name}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {eventsData.city}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {eventsData.price}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Button
                          onClick={() => {
                            alert("clicked");
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyevRows > 0 && (
                    <TableRow style={{ height: 53 * emptyevRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={eventsData.length}
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
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// export default Explore;
