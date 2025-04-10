import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccessTime,
  Gavel,
  Person,
  LocationOn,
  Description,
} from '@mui/icons-material';

const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  height: '100%',
}));

const StyledChip = styled(Chip)<{ status: string }>(({ theme, status }) => {
  const getColor = () => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFA500';
      case 'in progress':
        return '#00A3FF';
      case 'completed':
        return '#00C853';
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    background: `${getColor()}33`,
    color: getColor(),
    border: `1px solid ${getColor()}`,
    '& .MuiChip-label': {
      fontWeight: 600,
    },
  };
});

const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 3,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 3,
    background: 'linear-gradient(90deg, #917FB3 0%, #2A2F4F 100%)',
  },
}));

interface Case {
  id: string;
  title: string;
  type: string;
  status: string;
  progress: number;
  lawyer: string;
  location: string;
  lastUpdate: string;
  nextHearing: string;
}

const CaseTracker: React.FC = () => {
  const cases: Case[] = [
    {
      id: 'CASE001',
      title: 'Financial Fraud Investigation',
      type: 'Fraud',
      status: 'In Progress',
      progress: 65,
      lawyer: 'Adv. Sarah Johnson',
      location: 'Mumbai High Court',
      lastUpdate: '2024-04-09',
      nextHearing: '2024-04-20',
    },
    {
      id: 'CASE002',
      title: 'Domestic Violence Protection',
      type: 'Domestic',
      status: 'Pending',
      progress: 30,
      lawyer: 'Adv. Michael Chen',
      location: 'Delhi District Court',
      lastUpdate: '2024-04-08',
      nextHearing: '2024-04-15',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
            Case Tracker
          </Typography>

          <Grid container spacing={4}>
            {cases.map((case_) => (
              <Grid item xs={12} key={case_.id}>
                <motion.div variants={itemVariants}>
                  <GlassCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={2}
                        >
                          <Typography variant="h3">{case_.title}</Typography>
                          <StyledChip
                            label={case_.status}
                            status={case_.status}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <StyledProgress
                          variant="determinate"
                          value={case_.progress}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          Case Progress: {case_.progress}%
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Gavel sx={{ color: 'text.secondary' }} />
                              <Typography variant="body2">
                                Case Type: {case_.type}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Person sx={{ color: 'text.secondary' }} />
                              <Typography variant="body2">
                                Lawyer: {case_.lawyer}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <LocationOn sx={{ color: 'text.secondary' }} />
                              <Typography variant="body2">
                                {case_.location}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <AccessTime sx={{ color: 'text.secondary' }} />
                              <Typography variant="body2">
                                Next Hearing: {case_.nextHearing}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            p: 2,
                            borderRadius: 1,
                            mt: 2,
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <Description sx={{ color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              Latest Update
                            </Typography>
                          </Box>
                          <Typography variant="body1">
                            Documents submitted to court. Awaiting hearing date
                            confirmation.
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default CaseTracker; 