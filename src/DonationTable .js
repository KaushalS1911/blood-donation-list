import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Container } from '@mui/material';
import axios from 'axios';

const DonationTable = () => {
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('https://blood-donation-be.onrender.com/api/card');
                setDonors(response.data); // Assuming the response is an array of donor objects
            } catch (error) {
                console.error('Error fetching donor data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Donor</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Contact</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donors.map((donor) => (
                            <TableRow key={donor.id}>
                                <TableCell>
                                    <Avatar
                                        src={donor.image}
                                        alt={donor.name}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: '10%', // Creates square with slightly rounded corners
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{donor.name}</TableCell>
                                <TableCell>{donor.contact}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default DonationTable;
