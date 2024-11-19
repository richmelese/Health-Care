import React from 'react';
import { Box, Grid } from '@mui/material';  // Import Box and Grid from MUI
import Navbar from './Navbar';
import PatientList from './PatientList';
import DiagnosisHistory from './DiagnosisHistory';
import PatientProfile from './PatientProfile';

const Dashboard: React.FC = () => (
  <Box display="flex">
    {/* Sidebar */}
    <Navbar />
    
    {/* Main Content */}
    <Box flex={1} padding="20px"bgcolor="#f5f5f5">
      <Grid container spacing={1}>
        {/* Patient List - This will take 3 out of 12 columns on larger screens */}
        <Grid item xs={8} md={3}>
          <PatientList />
        </Grid>

        {/* Diagnosis History - This will take 6 out of 12 columns on larger screens */}
        <Grid item xs={12} md={6}>
          <DiagnosisHistory />
        </Grid>

        {/* Patient Profile - This will take 3 out of 12 columns on larger screens */}
        <Grid item xs={12} md={3}>
          <PatientProfile />
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default Dashboard;
