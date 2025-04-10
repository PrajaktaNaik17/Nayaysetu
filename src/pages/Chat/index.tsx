import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar, 
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send, AttachFile, Mic, SmartToy } from '@mui/icons-material';
import { motion } from 'framer-motion';

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  overflow: 'visible'
}));

const MessageBubble = styled(Box)<{ isUser?: boolean }>(({ theme, isUser }) => ({
  padding: theme.spacing(2),
  borderRadius: isUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
  background: isUser 
    ? 'linear-gradient(135deg, rgba(229, 190, 236, 0.3) 0%, rgba(145, 127, 179, 0.3) 100%)' 
    : 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  marginBottom: theme.spacing(2),
  maxWidth: '80%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
}));

const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello! I'm your legal assistant. How can I help you today?", isUser: false, timestamp: new Date() },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      // Add user message
      const userMessage: Message = {
        id: messages.length + 1,
        content: message,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages([...messages, userMessage]);
      setMessage('');
      
      // Simulate bot response after a short delay
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          content: "I understand your concern. Let me provide you with the relevant legal information based on Indian law.",
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 3 }}>
          Legal Assistant
        </Typography>
        
        <GlassCard sx={{ flex: 1, mb: 3, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ 
            p: 3, 
            flex: 1, 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            '&::-webkit-scrollbar': {
              width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255,255,255,.1)',
              borderRadius: '20px'
            }
          }}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ alignSelf: msg.isUser ? 'flex-end' : 'flex-start', display: 'flex', gap: '8px' }}
              >
                {!msg.isUser && (
                  <Avatar sx={{ bgcolor: 'primary.dark' }}>
                    <SmartToy />
                  </Avatar>
                )}
                <MessageBubble isUser={msg.isUser}>
                  <Typography variant="body1">{msg.content}</Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      textAlign: msg.isUser ? 'right' : 'left',
                      mt: 1,
                      opacity: 0.7
                    }}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </MessageBubble>
                {msg.isUser && (
                  <Avatar sx={{ bgcolor: 'secondary.main' }} />
                )}
              </motion.div>
            ))}
          </CardContent>
          
          <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2 }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs>
                <InputField
                  fullWidth
                  placeholder="Type your legal question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton size="small">
                          <AttachFile fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <Mic fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary"
                  sx={{ 
                    borderRadius: '50%', 
                    minWidth: 'auto', 
                    width: 48, 
                    height: 48,
                    background: 'linear-gradient(135deg, #E5BEEC 0%, #917FB3 100%)'
                  }}
                >
                  <Send />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </GlassCard>
        
        <GlassCard sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Disclaimer: This AI assistant provides general legal information based on Indian law. 
            For specific advice, please consult with a qualified lawyer.
          </Typography>
        </GlassCard>
      </Box>
    </motion.div>
  );
};

export default ChatPage; 