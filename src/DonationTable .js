import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Container,
    Typography
} from '@mui/material';
import axios from 'axios';

const DonationTable = () => {
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://blood-donation-be.onrender.com/api/card');
                setDonors(response.data);
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
                            <TableCell><strong>#</strong></TableCell>
                            <TableCell><strong>Donor</strong></TableCell>
                            <TableCell><strong>Contact</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donors.map((donor,index) => (
                            <TableRow key={donor.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            src={donor.image}
                                            alt={donor.name}
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '10%',
                                                marginRight: 5 // Adds space between image and name
                                            }}
                                        />
                                        <Typography variant="body1">{donor.name}</Typography>
                                    </div>
                                </TableCell>
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
