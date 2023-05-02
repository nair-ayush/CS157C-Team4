import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Adb } from '@mui/icons-material';
import Navbar from '../components/Navbar';

const Plans = () => {
  const city = {
    name: 'New York City',
    image: 'https://www.example.com/images/nyc.jpg',
    stays: [
      { name: 'The Plaza', price: '$$$$', rating: 4.8 },
      { name: 'The Waldorf Astoria', price: '$$$$', rating: 4.7 },
      { name: 'The Ritz-Carlton', price: '$$$$', rating: 4.6 },
    ],
    activities: [
      { name: 'Broadway Show', price: '$$$$', rating: 4.9 },
      { name: 'Empire State Tour', price: '$$', rating: 4.5 },
      { name: 'Central Park Bike Ride', price: '$', rating: 4.3 },
    ],
    restaurants: [
      { name: 'Le Bernardin', price: '$$$$', rating: 4.8 },
      { name: 'Eleven Madison Park', price: '$$$', rating: 4.7 },
      { name: 'Per Se', price: '$$$$$', rating: 4.6 },
    ],
  };

  const SectionTitle = {
    margin: '50px 0 20px',
    fontSize: '32px',
    fontWeight: 'bold',
  };

  const ListItem = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const ListItemIcon = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    marginRight: '10px',
    color: '#ffd700',
  };

  const ListItemText = {
    flex: 1,
    fontSize: '18px',
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box my={4}>
        <Typography variant="h2" align="center" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: 'light' }}>
            EXPLORE THE CITY
        </Typography>

          <img src={city.image} alt={city.name} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Stays
                </Typography>
                <ul>
                  {city.stays.map((stay) => (
                    <li key={stay.name}>
                      <Box display="flex" alignItems="center" my={1}>
                        <Avatar style={{ backgroundColor: '#f50057', marginRight: '10px' }}>
                          <Adb />
                        </Avatar>
                        <Typography variant="subtitle1" component="span">
                          {stay.name} - {stay.price} - {stay.rating}
                        </Typography>
                      </Box>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Entertaining Activities
                </Typography>
                <ul>
                  {city.activities.map((activity) => (
                    <li key={activity.name}>
                      <Box display="flex" alignItems="center" my={1}>
                        <Avatar style={{ backgroundColor: '#3f51b5', marginRight: '10px' }}>
                          <Adb />
                        </Avatar>
                        <Typography variant="subtitle1" component="span">
                          {activity.name} - {activity.price} - {activity.rating}
                        </Typography>
                      </Box>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                  Restaurants
                </Typography>
                <ul>
                  {city.restaurants.map((restaurant) => (
                    <li key={restaurant.name}>
                      <Box display="flex" alignItems="center" my={1}>
                        <Avatar style={{ backgroundColor: '#00bcd4', marginRight: '10px' }}>
                          <Adb />
                        </Avatar>
                        <Typography variant="subtitle1" component="span">
                          {restaurant.name} - {restaurant.price} - {restaurant.rating}
                        </Typography>
                      </Box>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Plans;