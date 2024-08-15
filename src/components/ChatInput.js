import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, auth } from '../firebase';
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { translateMessage, translateMessage2 } from './translate'; // Import hàm dịch
import { getUserLanguage } from './languageStorage'; // Import hàm lấy ngôn ngữ người dùng
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ chatRef, channelName, channelId, parentMessage, onCancelReply }) {
    const [input, setInput] = useState('');
    const [replyMessage, setReplyMessage] = useState('');
    const [user] = useAuthState(auth);
    const [userLanguage, setUserLanguage] = useState('vi');

    useEffect(() => {
        const fetchUserLanguage = async () => {
            try {
                const savedLanguage = await getUserLanguage();
                if (savedLanguage) {
                    setUserLanguage(savedLanguage);
                }
            } catch (error) {
                console.error("Error fetching user language:", error);
            }
        };
        fetchUserLanguage();
    }, [user]);

    useEffect(() => {
        if (parentMessage) {
            setReplyMessage(parentMessage.message);
        } else {
            setReplyMessage('');
        }
    }, [parentMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            try {
                let translatedMessage = input;

                if (userLanguage === 'vi') {
                    // Dịch từ tiếng Việt sang tiếng Nhật
                    translatedMessage = await translateMessage(input, 'ja');
                } else if (userLanguage === 'ja') {
                    // Dịch từ tiếng Nhật sang tiếng Việt
                    translatedMessage = await translateMessage2(input, 'vi');
                }

                await addDoc(collection(doc(db, 'rooms', channelId), 'messages'), {
                    message: input,
                    message_translate: translatedMessage,
                    timestamp: serverTimestamp(),
                    user: user?.displayName,
                    userImage: user?.photoURL,
                    parentMessageId: parentMessage?.messageId || null // Set parent message ID if replying
                });

                setInput('');
                if (onCancelReply) {
                    onCancelReply(); // Cancel reply action
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    useEffect(() => {
        chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chatRef]);

    return (
        <>
            {parentMessage && (
                <ReplyInfoContainer>
                    <ReplyInfo>
                        Replying to: <strong>{replyMessage}</strong>
                        <CancelButton onClick={onCancelReply}>Cancel</CancelButton>
                    </ReplyInfo>
                </ReplyInfoContainer>
            )}
            <ChatInputContainer>
                <form onSubmit={handleSubmit}>
                    <InputField
                        type="text"
                        placeholder={parentMessage ? `Replying to: ${replyMessage}` : `Message #${channelName}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <SubmitButton type="submit">Send</SubmitButton>
                </form>
            </ChatInputContainer>
        </>
    );
}

export default ChatInput;

const ReplyInfoContainer = styled.div`
    position: fixed;
    bottom: 60px; /* Adjusted for better placement */
    left: var(--sidebar-width, 31%);
    width: calc(100% - var(--sidebar-width, 31%));
    background-color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid lightgray;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const ReplyInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CancelButton = styled.button`
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        text-decoration: underline;
    }
`;

const ChatInputContainer = styled.div`
    position: fixed;
    left: var(--sidebar-width, 31%);
    bottom: 0;
    width: calc(100% - var(--sidebar-width, 35%));
    background-color: white;
    border-top: 1px solid lightgray;
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const InputField = styled.input`
    width: calc(100% - 100px);
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 4px;
    margin-right: 10px;
`;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
