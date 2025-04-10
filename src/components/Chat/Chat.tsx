import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send } from '@mui/icons-material';

const ChatContainer = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
}));

const MessagesContainer = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.05)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3px',
  },
});

const MessageBubble = styled(motion.div)<{ isUser?: boolean }>(({ theme, isUser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(2),
  borderRadius: '20px',
  marginBottom: theme.spacing(2),
  background: isUser
    ? 'linear-gradient(135deg, #917FB3 0%, #2A2F4F 100%)'
    : 'rgba(255, 255, 255, 0.05)',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '30px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '30px',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: '#fff',
    padding: '16px 20px',
  },
}));

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Adv. Sarah, your legal assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    // Simulate lawyer response
    setTimeout(() => {
      const lawyerMessage: Message = {
        id: messages.length + 2,
        text: "I understand your concern. Let me review the details and provide you with the best legal advice for your situation.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, lawyerMessage]);
    }, 1000);
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
          Chat with Your Lawyer
        </Typography>

        <ChatContainer elevation={0}>
          <MessagesContainer>
            <AnimatePresence>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  isUser={message.isUser}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    {!message.isUser && (
                      <Avatar
                        src="/lawyer-avatar.jpg"
                        sx={{ width: 32, height: 32 }}
                      />
                    )}
                    <Box>
                      <Typography variant="body1" color="text.primary">
                        {message.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: 'block' }}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Box>
                </MessageBubble>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <Box
            component="form"
            onSubmit={handleSend}
            sx={{
              display: 'flex',
              gap: 2,
              p: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <StyledTextField
              fullWidth
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: '50%',
                minWidth: 'unset',
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #917FB3 0%, #2A2F4F 100%)',
              }}
            >
              <Send />
            </Button>
          </Box>
        </ChatContainer>
      </Box>
    </Container>
  );
};

export default Chat; 