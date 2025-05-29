// components/ChatRoom.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  width: 100%;
  height: 30vw;
  max-width: 40vw;
  border-radius: 1vw;
  box-shadow: 0 0 0.8vw rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #9DBD5D;
  padding: 1vw;
  color: white;
  font-weight: bold;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1vw;
  background: #f9f9f9;
  overflow-y: auto;
`;

const Message = styled.div`
  margin: 0.7vw 0;
  text-align: ${props => props.isUser ? 'right' : 'left'};
`;

const MessageBubble = styled.div`
  display: inline-block;
  background-color: ${props => props.isUser ? '#9DBD5D' : '#E6E6E6'};
  color: ${props => props.isUser ? 'white' : 'black'};
  padding: 0.6vw 1vw;
  border-radius: 1vw;
  font-size: 0.9vw;
  max-width: 70%;
`;

const ChatInputArea = styled.form`
  display: flex;
  border-top: 0.1vw solid #ccc;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 1vw;
  border: none;
  outline: none;
`;

const SendButton = styled.button`
  padding: 0 1.5vw;
  background-color: #9DBD5D;
  color: white;
  border: none;
  cursor: pointer;
`;

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { text: '안녕하세요! 반려동물에 대해 궁금한 걸 물어보세요 🐶', isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { text: input, isUser: true };
    setMessages(prev => [...prev, newMsg]);

    // 예시용 자동 응답
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `알겠습니다! "${input}"에 대해 확인해볼게요.`, isUser: false }]);
    }, 1000);

    setInput('');
  };

  return (
    <ChatContainer>
      <ChatHeader>🐾 Fit-a-Pet 챗봇</ChatHeader>
      <ChatBody>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            <MessageBubble isUser={msg.isUser}>
              {msg.text}
            </MessageBubble>
          </Message>
        ))}
      </ChatBody>
      <ChatInputArea onSubmit={handleSubmit}>
        <ChatInput
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton type="submit">전송</SendButton>
      </ChatInputArea>
    </ChatContainer>
  );
};

export default ChatRoom;
