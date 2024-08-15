import React from 'react';
import styled from 'styled-components';

import { doc} from 'firebase/firestore';

function Message({ message, timestamp, user, userImage, onReply, messageId, isThread }) {
    const handleReply = () => {
        if (onReply) {
            onReply(doc.id);  // onReply が渡されている場合に呼び出す
        }else {
            console.error('onReply is not a function');
        }
    };
    return (
        <MessageContainer>
            <img src={userImage} alt="" />
            <MessageInfo>
                <h4>
                    {user}
                    <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
                <ReplyButton onClick={handleReply}>Reply</ReplyButton>
            </MessageInfo>
        </MessageContainer>
    );
}

export default Message;

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    position: relative;

    > img {
        height: 50px;
        border-radius: 8px;
    }
`;

const MessageInfo = styled.div`
    margin-left: 10px;
`;

const ReplyButton = styled.button`
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
