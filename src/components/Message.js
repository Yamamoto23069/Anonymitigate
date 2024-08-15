import React from 'react';
import styled from 'styled-components';

import { doc} from 'firebase/firestore';

function Message({ message, timestamp, user, userImage, onReply, isThread}) {
    const handleReply = () => {
        if (onReply) {
            onReply(doc.id);  // onReply が渡されている場合に呼び出す
        }else {
            console.error('onReply is not a function');
        }
    };
    return (
        <MessageContainer isThread={isThread}>
            <img src={userImage} alt="" />
            <MessageInfo>
                <h4>
                    {user}
                    <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
                {!isThread && <ReplyButton onClick={onReply}>Reply</ReplyButton>}
            </MessageInfo>
        </MessageContainer>
    );
}

export default Message;

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    margin-left: ${({ isThread }) => (isThread ? '50px' : '0')};

    > img {
        height: 50px;
        border-radius: 8px;
    }
`;

const MessageInfo = styled.div`
    position: relative;
`;

const ReplyButton = styled.button`
    position: absolute;
    right: 0;
    bottom: -10px;
    background: none;
    border: none;
    color: blue;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
