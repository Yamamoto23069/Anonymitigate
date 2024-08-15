import React, { useState, useRef, useEffect } from 'react';
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

    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [roomId, loading]);

    const handleReply = (messageId) => {
        const replyMessage = roomMessages?.docs.find(doc => doc.id === messageId)?.data();
        if (replyingTo?.messageId === messageId) {
            setReplyingTo(null);
        } else {
            setReplyingTo({ messageId, message: replyMessage?.message });
        }
    };

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>#{roomDetails?.data().name}</strong>
                            </h4>
                            <StarBorderOutlinedIcon />
                        </HeaderLeft>

                        <HeaderRight>
                            <p>
                                <InfoOutlinedIcon />Details
                            </p>
                        </HeaderRight>
                    </Header>

                    <ChatMessages>
                        {roomMessages?.docs.map(doc => {
                            const { message, timestamp, user, userImage, parentMessageId } = doc.data();

                            // 親メッセージとリプライメッセージを区別して表示
                            if (!parentMessageId) {
                                return (
                                    <React.Fragment key={doc.id}>
                                        <Message
                                            message={message}
                                            timestamp={timestamp}
                                            user={user}
                                            userImage={userImage}
                                            channelId={roomId}
                                            messageId={doc.id}
                                            onReply={() => handleReply(doc.id)} // リプライボタンのコールバック
                                            isReplying={replyingTo?.messageId === doc.id}
                                        />
                                        {/* リプライメッセージの表示 */}
                                        {roomMessages?.docs
                                            .filter(replyDoc => replyDoc.data().parentMessageId === doc.id)
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
                        parentMessage={replyingTo} // リプライ対象のメッセージを渡す
                        isReplying={!!replyingTo} // リプライ中かどうか
                    />
                </>
            )}
        </ChatContainer>
    );
}

export default Chat;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const ChatMessages = styled.div``;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

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

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 131px;
`;

const ReplyContainer = styled.div`
    margin-left: 50px;
    border-left: 2px solid #ccc;
    padding-left: 10px;
`;
