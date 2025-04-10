import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  TextField,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Alert,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  AccountCircle,
  Notifications,
  Security,
  Language,
  Save,
  Edit,
  PhotoCamera,
  ShieldOutlined,
  DeleteOutline,
  CheckCircleOutline
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  overflow: 'visible'
}));

const GlassTextField = styled(TextField)(({ theme }) => ({
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
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  marginBottom: theme.spacing(4),
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 0,
    padding: theme.spacing(1.5, 2),
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  border: '3px solid rgba(255, 255, 255, 0.1)',
  background: 'linear-gradient(135deg, #E5BEEC 0%, #917FB3 100%)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #E5BEEC 0%, #917FB3 100%)',
  '&:hover': {
    background: 'linear-gradient(135deg, #E5BEEC 10%, #917FB3 80%)',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    caseUpdates: true,
    newMessages: true,
    marketingEmails: false,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your account preferences and application settings
        </Typography>

        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<AccountCircle />} label="Profile" />
          <Tab icon={<Notifications />} label="Notifications" />
          <Tab icon={<Security />} label="Security" />
          <Tab icon={<Language />} label="Language" />
        </StyledTabs>
        
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert 
              icon={<CheckCircleOutline />} 
              severity="success"
              sx={{ mb: 3, background: 'rgba(46, 125, 50, 0.1)', backdropFilter: 'blur(10px)' }}
            >
              Settings saved successfully!
            </Alert>
          </motion.div>
        )}

        <TabPanel value={tabValue} index={0}>
          <GlassCard>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton
                        sx={{
                          bgcolor: 'rgba(229, 190, 236, 0.8)',
                          '&:hover': { bgcolor: 'rgba(229, 190, 236, 1)' },
                        }}
                        size="small"
                      >
                        <PhotoCamera fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ProfileAvatar>A</ProfileAvatar>
                  </Badge>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Anita Desai
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    anita.desai@example.com
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2, borderRadius: '20px' }}
                  >
                    Change Password
                  </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <GlassTextField
                        fullWidth
                        label="First Name"
                        defaultValue="Anita"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <GlassTextField
                        fullWidth
                        label="Last Name"
                        defaultValue="Desai"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <GlassTextField
                        fullWidth
                        label="Email"
                        defaultValue="anita.desai@example.com"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <GlassTextField
                        fullWidth
                        label="Phone"
                        defaultValue="+91 98765 43210"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
                      <GradientButton
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSave}
                      >
                        Save Changes
                      </GradientButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </GlassCard>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <GlassCard>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Notification Preferences
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Email Alerts"
                    secondary="Get important updates via email"
                  />
                  <Switch
                    edge="end"
                    checked={notificationSettings.emailAlerts}
                    onChange={handleSwitchChange}
                    name="emailAlerts"
                  />
                </ListItem>
                <Divider sx={{ my: 1, opacity: 0.1 }} />
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Case Updates"
                    secondary="Receive notifications about your case status"
                  />
                  <Switch
                    edge="end"
                    checked={notificationSettings.caseUpdates}
                    onChange={handleSwitchChange}
                    name="caseUpdates"
                  />
                </ListItem>
                <Divider sx={{ my: 1, opacity: 0.1 }} />
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="New Messages"
                    secondary="Get notified when you receive new messages"
                  />
                  <Switch
                    edge="end"
                    checked={notificationSettings.newMessages}
                    onChange={handleSwitchChange}
                    name="newMessages"
                  />
                </ListItem>
                <Divider sx={{ my: 1, opacity: 0.1 }} />
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Marketing Emails"
                    secondary="Receive promotional content and offers"
                  />
                  <Switch
                    edge="end"
                    checked={notificationSettings.marketingEmails}
                    onChange={handleSwitchChange}
                    name="marketingEmails"
                  />
                </ListItem>
              </List>
              <Box sx={{ textAlign: 'right', mt: 3 }}>
                <GradientButton
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Save Preferences
                </GradientButton>
              </Box>
            </CardContent>
          </GlassCard>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <GlassCard>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Security Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage your account security and privacy settings
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <GlassCard sx={{ background: 'rgba(255, 255, 255, 0.01)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShieldOutlined sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1">
                            Two-Factor Authentication
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Add an extra layer of security to your account
                          </Typography>
                        </Box>
                        <Box sx={{ ml: 'auto' }}>
                          <Button variant="outlined" color="primary" size="small">
                            Enable
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Grid>
                
                <Grid item xs={12}>
                  <GlassCard sx={{ background: 'rgba(255, 255, 255, 0.01)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Security sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                        <Box>
                          <Typography variant="subtitle1">
                            Password
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last changed 3 months ago
                          </Typography>
                        </Box>
                        <Box sx={{ ml: 'auto' }}>
                          <Button variant="outlined" color="primary" size="small">
                            Change
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      variant="text"
                      color="error"
                      startIcon={<DeleteOutline />}
                      onClick={() => setDeleteDialog(true)}
                    >
                      Delete Account
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </GlassCard>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <GlassCard>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Language & Regional Settings
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <GlassTextField
                    select
                    fullWidth
                    label="Language"
                    defaultValue="en"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                    <option value="gu">Gujarati</option>
                    <option value="pa">Punjabi</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                    <option value="kn">Kannada</option>
                    <option value="ml">Malayalam</option>
                  </GlassTextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <GlassTextField
                    select
                    fullWidth
                    label="Time Zone"
                    defaultValue="IST"
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="IST">Indian Standard Time (GMT+5:30)</option>
                    <option value="GMT">Greenwich Mean Time (GMT)</option>
                    <option value="EST">Eastern Standard Time (GMT-5)</option>
                  </GlassTextField>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
                  <GradientButton
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Save Settings
                  </GradientButton>
                </Grid>
              </Grid>
            </CardContent>
          </GlassCard>
        </TabPanel>
      </Box>
      
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        PaperProps={{
          sx: {
            background: 'rgba(30, 30, 35, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }
        }}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={() => setDeleteDialog(false)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default SettingsPage; 