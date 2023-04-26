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

function Explore() {
    interface TableData {
        name: string;
        city: string;
      }
      
      interface Props {
        listingsData: TableData[];
        eventsData: TableData[];
        restaurantsData: TableData[];
      }

      const listingsData = [
        { name: 'Cozy downtown apartment', city: 'New York City' },
        { name: 'Spacious condo with stunning views', city: 'Los Angeles' },
        { name: 'Charming studio in historic district', city: 'Boston' },
      ];
    
      const eventsData = [
        { name: 'Food festival', city: 'Chicago' },
        { name: 'Live music concert', city: 'Austin' },
        { name: 'Art exhibition', city: 'San Francisco' },
      ];
    
      const restaurantsData = [
        { name: 'Italian bistro', city: 'Miami' },
        { name: 'Sushi restaurant', city: 'Seattle' },
        { name: 'Farm-to-table eatery', city: 'Portland' },
      ];

    return (
        <>
            <Navbar></Navbar>
            <div className="container">
            <h1>Explore</h1>
            <h2>Listings</h2>
                <div className="table-container">
                    <table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listingsData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.city}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <h2>Events</h2>

            <div className="table-container">
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {eventsData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <h2>Restaurants</h2>

            <div className="table-container">
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurantsData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        </>
        );
}
export default Explore;