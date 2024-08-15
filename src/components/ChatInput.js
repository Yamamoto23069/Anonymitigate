import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from "@material-ui/core";
import { db, auth } from '../firebase';
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelName, channelId, chatRef, parentMessage }) {
    const [input, setInput] = useState('');
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (parentMessage) {
            setInput(``); 
        } else {
            setInput(''); // 初期状態に戻す
        }
    }, [parentMessage]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }

        const messagesCollectionRef = collection(doc(db, 'rooms', channelId), 'messages');

        await addDoc(messagesCollectionRef, {
            message: input,
            timestamp: serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL,
            parentMessageId: parentMessage?.messageId || null, // リプライ対象メッセージIDを設定
        });

        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });

        setInput(""); // 入力フィールドをクリア
    };

    return (
        <ChatInputContainer>
            <form>
                <input 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    placeholder={parentMessage 
                        ? `Replying to: "${parentMessage.message}"`
                        : `Message #${channelName}`} 
                />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
                {parentMessage && <Button onClick={() => setInput('')}>Cancel</Button>}
            </form>
        </ChatInputContainer>
    );
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`;
