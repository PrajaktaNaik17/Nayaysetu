import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Rating, 
  Button, 
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  CardActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { 
  Search, 
  LocationOn, 
  Language, 
  Phone, 
  FilterList, 
  Sort,
  Star
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  overflow: 'visible',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
  }
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const GlassSelect = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  }
}));

const GlassChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  }
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: '2px solid rgba(255, 255, 255, 0.1)',
  background: 'linear-gradient(135deg, #E5BEEC 0%, #917FB3 100%)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
}));

interface Lawyer {
  id: number;
  name: string;
  avatar: string;
  specialization: string[];
  rating: number;
  reviews: number;
  location: string;
  experience: number;
  languages: string[];
  consultationFee: number;
  about: string;
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: 'Advocate Priya Sharma',
    avatar: '',
    specialization: ['Family Law', 'Divorce'],
    rating: 4.8,
    reviews: 124,
    location: 'Delhi High Court',
    experience: 8,
    languages: ['Hindi', 'English'],
    consultationFee: 1500,
    about: 'Specializing in family law with 8 years of experience in Delhi High Court. Expertise in handling divorce, child custody, and domestic violence cases.'
  },
  {
    id: 2,
    name: 'Advocate Rajesh Kumar',
    avatar: '',
    specialization: ['Criminal Law', 'Bail Matters'],
    rating: 4.6,
    reviews: 98,
    location: 'Mumbai',
    experience: 12,
    languages: ['Marathi', 'Hindi', 'English'],
    consultationFee: 2000,
    about: 'Experienced criminal lawyer with expertise in bail matters, criminal trials, and appeals. Practicing in Mumbai for over 12 years.'
  },
  {
    id: 3,
    name: 'Advocate Aarti Patel',
    avatar: '',
    specialization: ['Corporate Law', 'Intellectual Property'],
    rating: 4.9,
    reviews: 87,
    location: 'Bangalore',
    experience: 10,
    languages: ['English', 'Kannada', 'Hindi'],
    consultationFee: 2500,
    about: 'Corporate lawyer with expertise in IP, contracts, and company formation. Served numerous tech startups in Bangalore.'
  },
  {
    id: 4,
    name: 'Advocate Sanjay Mehta',
    avatar: '',
    specialization: ['Property Law', 'Real Estate'],
    rating: 4.7,
    reviews: 132,
    location: 'Pune',
    experience: 15,
    languages: ['English', 'Hindi', 'Marathi'],
    consultationFee: 1800,
    about: 'Property law expert handling property disputes, registration issues, and real estate transactions for over 15 years.'
  },
];

const LawyersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  
  const handleSpecializationChange = (event: SelectChangeEvent) => {
    setSpecializationFilter(event.target.value);
  };
  
  const filteredLawyers = lawyers.filter(lawyer => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        !lawyer.name.toLowerCase().includes(searchLower) &&
        !lawyer.location.toLowerCase().includes(searchLower) &&
        !lawyer.specialization.some(s => s.toLowerCase().includes(searchLower))
      ) {
        return false;
      }
    }
    
    if (specializationFilter && !lawyer.specialization.includes(specializationFilter)) {
      return false;
    }
    
    return true;
  });
  
  const allSpecializations = Array.from(
    new Set(lawyers.flatMap(lawyer => lawyer.specialization))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
          Find Legal Experts
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Connect with experienced lawyers specialized in various legal fields
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <SearchField
              fullWidth
              placeholder="Search by name, location, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <GlassSelect fullWidth size="small">
              <InputLabel id="specialization-label">Specialization</InputLabel>
              <Select
                labelId="specialization-label"
                value={specializationFilter}
                label="Specialization"
                onChange={handleSpecializationChange}
              >
                <MenuItem value="">All Specializations</MenuItem>
                {allSpecializations.map((spec) => (
                  <MenuItem key={spec} value={spec}>{spec}</MenuItem>
                ))}
              </Select>
            </GlassSelect>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<FilterList />}
              sx={{ 
                height: '100%', 
                background: 'linear-gradient(135deg, rgba(229, 190, 236, 0.8) 0%, rgba(145, 127, 179, 0.8) 100%)',
                borderRadius: '12px',
              }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>
        
        <Grid container spacing={3}>
          {filteredLawyers.map((lawyer) => (
            <Grid item xs={12} md={6} lg={4} key={lawyer.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AvatarStyled>
                        {lawyer.name.charAt(0)}
                      </AvatarStyled>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" fontWeight="600">
                          {lawyer.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating 
                            value={lawyer.rating} 
                            precision={0.1} 
                            size="small" 
                            readOnly 
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            ({lawyer.rating}) • {lawyer.reviews} reviews
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.7)', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {lawyer.location}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {lawyer.experience} years experience • {lawyer.languages.join(', ')}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      {lawyer.specialization.map((spec) => (
                        <GlassChip 
                          key={spec}
                          label={spec}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                    
                    <Typography variant="body2" sx={{ mb: 2, height: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lawyer.about}
                    </Typography>
                    
                    <Divider sx={{ my: 2, opacity: 0.1 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="600">
                        ₹{lawyer.consultationFee}
                        <Typography component="span" variant="caption" color="text.secondary"> / consultation</Typography>
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                        sx={{ 
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #E5BEEC 0%, #917FB3 100%)',
                        }}
                      >
                        Book Consultation
                      </Button>
                    </Box>
                  </CardContent>
                </GlassCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default LawyersPage; 