import React from 'react';
import './style.css';
import Navbar from "../components/Navbar";
import { Button,
    Card, 
    Box,
    CardContent, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Grid } from '@mui/material';

function Dashboard() {
    interface Plan {
        plan_id: number;
        created_by_user_id: number;
        saved_by_users: number[];
        destination: string;
        start_date: Date;
        end_date: Date;
      }
      
    const plans: Plan[] = [{
        plan_id: 1,
        created_by_user_id: 123,
        saved_by_users: [456, 789],
        destination: 'New York City',
        start_date: new Date('2023-05-01'),
        end_date: new Date('2023-05-07'),
      },
      {
        plan_id: 2,
        created_by_user_id: 7,
        saved_by_users: [986, 789],
        destination: 'San Jose',
        start_date: new Date('2023-05-01'),
        end_date: new Date('2023-05-07'),
      },
      {
        plan_id: 3,
        created_by_user_id: 4,
        saved_by_users: [986, 789],
        destination: 'San Jose',
        start_date: new Date('2023-05-01'),
        end_date: new Date('2023-05-07'),
      }
    ];
    const splans: Plan[] = [{
        plan_id: 1,
        created_by_user_id: 100,
        saved_by_users: [101, 102],
        destination: 'Paris, France',
        start_date: new Date(2023, 6, 1),
        end_date: new Date(2023, 6, 8),
      },
      {
        plan_id: 2,
        created_by_user_id: 101,
        saved_by_users: [100, 103],
        destination: 'Tokyo, Japan',
        start_date: new Date(2023, 9, 15),
        end_date: new Date(2023, 9, 23),
      },
      {
        plan_id: 4,
        created_by_user_id: 103,
        saved_by_users: [102],
        destination: 'Sydney, Australia',
        start_date: new Date(2024, 3, 1),
        end_date: new Date(2024, 3, 10),
      },
    ];
      
  return (
    <>
    <Navbar></Navbar>
    <div className='container'>
    <h1> Your plans</h1>
    <Grid container spacing={6}>
      {plans.map((plan) => (
        <Grid key={plan.plan_id} item xs={12} sm={6} md={4}>
          <Box>
            <Card className="card">
            <CardContent className="card-details">
              <h2>Plan {plan.plan_id}</h2>
              <p>Created by: {plan.created_by_user_id}</p>
              <p>Saved by: {plan.saved_by_users.join(', ')}</p>
              <p>Destination: {plan.destination}</p>
              <p>Start Date: {plan.start_date.toLocaleDateString()}</p>
              <p>End Date: {plan.end_date.toLocaleDateString()}</p>
              <button className="button" onClick={() => console.log('View plan clicked')}>
              <span className="button-content">View Plan</span>
              </button>
            </CardContent>
          </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
    <h1> Saved plans</h1>
    <Grid container spacing={3}>
      {splans.map((plan) => (
        <Grid key={plan.plan_id} item xs={12} sm={6} md={4}>
          <Box>
            <Card className="card">
            <CardContent className="card-details">
              <h2>Plan {plan.plan_id}</h2>
              <p>Created by: {plan.created_by_user_id}</p>
              <p>Saved by: {plan.saved_by_users.join(', ')}</p>
              <p>Destination: {plan.destination}</p>
              <p>Start Date: {plan.start_date.toLocaleDateString()}</p>
              <p>End Date: {plan.end_date.toLocaleDateString()}</p>
              <button className="button" onClick={() => console.log('View plan clicked')}>
              <span className="button-content">View Plan</span>
              </button>
            </CardContent>
          </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
    </div>
    </>
  );
}

export default Dashboard;
