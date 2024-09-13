import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from '../firebase';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import Message from "./Message";
import { getUserLanguage } from '../languageStorage'; // Import hàm lấy ngôn ngữ người dùng
import { translateMessage, translateMessage2, translateMessage3, translateMessage4, translateMessage5, translateMessage6 } from './translate'; // Import hàm dịch
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Import auth từ firebase

function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useDocument(roomId && doc(db, 'rooms', roomId));
    const [roomMessages, loading] = useCollection(
        roomId &&
        query(
            collection(doc(db, 'rooms', roomId), 'messages'),
            orderBy('timestamp', 'asc')
        )
    );
    const [userLanguage, setUserLanguage] = useState('vi');
    const [user] = useAuthState(auth);
    const [replyingTo, setReplyingTo] = useState(null);
    const [justReplied, setJustReplied] = useState(false);
    const [translatedMessages, setTranslatedMessages] = useState([]);

    useEffect(() => {
        const fetchUserLanguage = async () => {
            const savedLanguage = await getUserLanguage();
            setUserLanguage(savedLanguage || 'vi');
        };

        fetchUserLanguage();
    }, []);

    useEffect(() => {
        if (roomMessages) {
            roomMessages.docs.forEach(doc => {
                console.log(doc.data()); // Kiểm tra dữ liệu để xác nhận giá trị của isAnonymous
            });
        }
    }, [roomMessages]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [roomId, roomMessages, loading, replyingTo, justReplied]);

    useEffect(() => {
        const translateMessages = async () => {
            if (roomMessages && roomMessages.docs.length > 0) {
                try {
                    const messagesWithTranslation = await Promise.all(roomMessages.docs.map(async (doc) => {
                        const { message, userLanguage: messageLanguage, parentMessageId} = doc.data();
                        let translatedText = message;

                        if (user?.displayName !== doc.data().user) {
                            console.log(userLanguage);
                            console.log(messageLanguage);
                            if (userLanguage === messageLanguage)
                            {translatedText=message;}
                            else if (userLanguage === 'vi') {
                                if (messageLanguage === 'en') {
                                    translatedText = await translateMessage5(message, 'vi');
                                } else {
                                    translatedText = await translateMessage2(message, 'vi');
                                }
                            } else if (userLanguage === 'ja') {
                                if (messageLanguage === 'vi') {
                                    translatedText = await translateMessage(message, 'ja');
                                } else {
                                    translatedText = await translateMessage3(message, 'ja');
                                }
                            } else if (userLanguage === 'en') {
                                if (messageLanguage === 'vi') {
                                    translatedText = await translateMessage6(message, 'en');
                                } else if (messageLanguage === 'ja') {
                                    console.log(message);
                                    translatedText = await translateMessage4(message, 'en');
                                    console.log(translatedText);        
                                }
                            }
                        }

                        return {
                            ...doc.data(),
                            message_translate: translatedText,
                            id: doc.id,
                            originalMessage: message // Retain original message
                        };
                    }));
                    setTranslatedMessages(messagesWithTranslation);
                } catch (error) {
                    console.error('Error translating messages:', error);
                }
            }
        };

        translateMessages();
    }, [roomMessages, userLanguage, user]);

    const handleReply = (messageId) => {
        if (replyingTo === messageId) {
            setReplyingTo(null);
        } else {
            setReplyingTo(messageId);
        }
    };

    const handleCancelReply = () => {
        setReplyingTo(null);
    };

    const { channelType = 'public', members = [], isAnonymous = false } = roomDetails?.data() || {};

    return (
        <ChatContainer>
            {roomDetails && roomMessages ? (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>#{roomDetails?.data().name}</strong>
                                <StarBorderOutlinedIcon />
                            </h4>
                        </HeaderLeft>

                        <HeaderRight>
                            <p>
                                <InfoOutlinedIcon /> Details
                            </p>
                        </HeaderRight>
                    </Header>

                    <ChatMessages>
                        {translatedMessages.map((msg) => {
                            const { message_translate, timestamp, user, userImage, id, originalMessage } = msg;
                            console.log(isAnonymous); // `isAnonymous` フィールドの値を確認
                            if (!msg.parentMessageId) {
                                return (
                                    <React.Fragment key={id}>
                                        <Message
                                            message={message_translate}
                                            timestamp={timestamp}
                                            user={user}
                                            userImage={userImage}
                                            messageId={id}
                                            isAnonymous={isAnonymous}
                                            onReply={() => handleReply(id)}
                                            isReplying={replyingTo === id}
                                            originalMessage={originalMessage} // Show original message
                                        />
                                        {roomMessages.docs
                                            .filter(replyDoc => replyDoc.data().parentMessageId === id)
                                            .map(replyDoc => (
                                                <ReplyContainer key={replyDoc.id}>
                                                    <Message
                                                        message={replyDoc.data().message}
                                                        timestamp={replyDoc.data().timestamp}
                                                        user={replyDoc.data().user}
                                                        userImage={replyDoc.data().userImage}
                                                        channelId={roomId}
                                                        messageId={replyDoc.id}
                                                        isThread={true}
                                                    />
                                                </ReplyContainer>
                                            ))}
                                    </React.Fragment>
                                );
                            }
                            return null;
                        })}
                        <ChatBottom ref={chatRef} />
                    </ChatMessages>

                    <ChatInput 
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}
                        channelId={roomId}
                        parentMessage={replyingTo ? roomMessages.docs.find(doc => doc.id === replyingTo).data() : null}
                        onCancelReply={handleCancelReply}
                    />
                </>
            ) : (
                <p>Loading...</p> 
            )}
        </ChatContainer>
    );
}

export default Chat;

// Styles...

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
    position: relative;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }
    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div`
    // Add styles for messages container here
`;

const ChatBottom = styled.div`
    padding-bottom: 80px;
`;

const ReplyContainer = styled.div`
    margin-left: 50px;
    border-left: 2px solid #ccc;
    padding-left: 10px;
    background-color: #f9f9f9;
    margin-top: 10px;
    padding-top: 10px;
`;