import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Card,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocationOn, AttachMoney, Gavel } from '@mui/icons-material';

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.03)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <Container maxWidth="lg">
      <Box py={8}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Typography variant="h1" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
              Find Your Legal Guardian
            </Typography>
          </motion.div>

          <GlassCard>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <FormControl fullWidth>
                    <InputLabel>Case Type</InputLabel>
                    <StyledSelect
                      label="Case Type"
                      defaultValue=""
                      startAdornment={<Gavel sx={{ mr: 1, color: 'rgba(255, 255, 255, 0.7)' }} />}
                    >
                      <MenuItem value="fraud">Extortion & Financial Fraud</MenuItem>
                      <MenuItem value="domestic">Domestic Violence & Abuse</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <StyledTextField
                    fullWidth
                    label="Budget Range"
                    type="number"
                    InputProps={{
                      startAdornment: <AttachMoney sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />,
                    }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <StyledTextField
                    fullWidth
                    label="Location"
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />,
                    }}
                  />
                </motion.div>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="center" mt={4}>
              <motion.div variants={itemVariants}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    minWidth: 200,
                    background: 'linear-gradient(135deg, #917FB3 0%, #2A2F4F 100%)',
                  }}
                >
                  Find Lawyers
                </Button>
              </motion.div>
            </Box>
          </GlassCard>

          <motion.div variants={itemVariants}>
            <Typography variant="h2" component="h2" gutterBottom sx={{ mb: 4, mt: 8 }}>
              Top Rated Lawyers
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div variants={itemVariants}>
                  <GlassCard sx={{ height: '100%' }}>
                    <Box display="flex" flexDirection="column" height="100%">
                      <Typography variant="h3" component="h3" gutterBottom>
                        John Doe
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        Specializes in Financial Fraud
                      </Typography>
                      <Box mt={2}>
                        <Typography variant="body1" paragraph>
                          ⭐ 4.9/5 Rating
                        </Typography>
                        <Typography variant="body1" paragraph>
                          💼 8+ Years Experience
                        </Typography>
                        <Typography variant="body1" paragraph>
                          📍 Mumbai, India
                        </Typography>
                      </Box>
                      <Box mt="auto" pt={2}>
                        <Button variant="contained" fullWidth>
                          Contact Now
                        </Button>
                      </Box>
                    </Box>
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

export default Home; 