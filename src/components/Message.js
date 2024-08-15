import React from 'react';
import styled from 'styled-components';

function Message({ message, timestamp, user,isAnonymous, channelType userImage, onReply, messageId, isThread }) {
    const handleReply = () => {
        console.log('Reply button clicked for message:', messageId); // デバッグ用
        if (onReply) {
            onReply(messageId);  // messageId を渡して onReply を呼び出す
        } else {
            console.error('onReply is not a function');
        }
    };

    return (
        <MessageContainer isThread={isThread}>
            <img src={ isAnonymous ? '' : userImage} alt="" />
            <MessageInfo>
                <h4>
                    { isAnonymous ? '' : user }
                    <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
                {onReply && <ReplyButton onClick={handleReply}>Reply</ReplyButton>}

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
    margin-left: ${(props) => (props.isThread ? '50px' : '0')};
    border-left: ${(props) => (props.isThread ? '2px solid #ccc' : 'none')};
    background-color: ${(props) => (props.isThread ? '#f1f1f1' : 'white')};

    > img {
        height: 50px;
        border-radius: 8px;
    }

    ${({ channelType }) => channelType === 'private' && `
        background-color: #f5f5f5; /* Example style for private messages */
        border-left: 5px solid #ccc;
    `}
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
