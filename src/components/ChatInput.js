import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, auth } from '../firebase';
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ chatRef, channelName, channelId, parentMessage, onCancelReply }) {
    const [input, setInput] = useState('');
    const [replyMessage, setReplyMessage] = useState('');
    const [user] = useAuthState(auth);

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
            // メッセージ送信処理を追加する
            await addDoc(collection(doc(db, 'rooms', channelId), 'messages'), {
                message: input,
                timestamp: serverTimestamp(),
                user: user?.displayName, 
                userImage: user?.photoURL,
                parentMessageId: parentMessage?.messageId || null // リプライの場合、親メッセージIDを設定
            });
            

            setInput('');
            if (onCancelReply) {
                onCancelReply(); // リプライキャンセル処理
            }

        }
    };

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
