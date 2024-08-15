import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function ChatInput({ chatRef, channelName, channelId, parentMessage, onCancelReply }) {
    const [input, setInput] = useState('');
    const [replyMessage, setReplyMessage] = useState('');

    useEffect(() => {
        if (parentMessage) {
            setReplyMessage(parentMessage.message);
        } else {
            setReplyMessage('');
        }
    }, [parentMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // メッセージ送信処理を追加する
        setInput('');
        if (onCancelReply) {
            onCancelReply(); // リプライキャンセル処理
        }

        const messagesCollectionRef = collection(doc(db, 'rooms', channelId), 'messages');
    
    await addDoc(messagesCollectionRef, {
        message: input,
        timestamp: serverTimestamp(),
        user: user?.displayName, 
        userImage: user.photoURL,
    });

    chatRef?.current?.scrollIntoView({
        behavior: "smooth",
    });

        setInput("");
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
    bottom: 50px;
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
    width: calc(100% - var(--sidebar-width, 31%));
    bottom: 0;
    background-color: white;
    border-top: 1px solid lightgray;
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const InputField = styled.input`
    width: calc(100% - 90px);
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
