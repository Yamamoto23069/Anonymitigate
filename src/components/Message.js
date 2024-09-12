import React from 'react';
import styled from 'styled-components';

<<<<<<< HEAD
function Message({ message, timestamp, user, isAnonymous, userImage, channelType }) {     return (
        <MessageContainer>
            <userImage src={ isAnonymous ? "../resources/Anonymitigate_logo.png" : userImage} alt="" />            <MessageInfo>
            <h4>
                { isAnonymous ? '' : user }
                <span>
                    {new Date(timestamp?.toDate()).toUTCString()}
                </span>
            </h4>
            <p>{message}</p>
=======
function Message({ message, timestamp, user, isAnonymous, channelType, userImage, onReply, messageId, isThread }) {
    const handleReply = () => {
        console.log('Reply button clicked for message:', messageId); // デバッグ用
        if (onReply) {
            onReply(messageId);  // messageId を渡して onReply を呼び出す
        } else {
            console.error('onReply is not a function');
        }
    };

    return (
        <MessageContainer isThread={isThread} channelType={channelType}>
            {!isAnonymous && <UserImage src={userImage} alt={`${user}'s avatar`} />}
            <MessageInfo>
                <h4>
                    {!isAnonymous && <span>{user}</span>}
                    <span>{new Date(timestamp?.toDate()).toLocaleString()}</span>
                </h4>
                <p>{message}</p>
                {onReply && <ReplyButton onClick={handleReply}>Reply</ReplyButton>}
>>>>>>> cc4e8d5553464e24587123652b915278d9bcb903
            </MessageInfo>
        </MessageContainer>
    );
}

export default Message;

const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 20px;
    position: relative;
    margin-left: ${(props) => (props.isThread ? '50px' : '0')};
    border-left: ${(props) => (props.isThread ? '2px solid #ccc' : 'none')};
    background-color: ${(props) => (props.isThread ? '#f1f1f1' : props.channelType === 'private' ? '#f5f5f5' : 'white')};

    &:hover {
        background-color: ${(props) => (props.isThread ? '#e0e0e0' : '#f9f9f9')};
    }

    ${({ channelType }) => channelType === 'private' && `
        background-color: #f5f5f5; /* Example style for private messages */
        border-left: 5px solid #ccc;
    `}
`;

const UserImage = styled.img`
    height: 50px;
    border-radius: 8px;
    margin-right: 10px;
`;

const MessageInfo = styled.div`
    flex: 1;
    > h4 {
        display: flex;
        justify-content: space-between;
        margin: 0;
        font-size: 14px;

        > span {
            font-weight: bold;
        }

        > span:last-child {
            color: gray;
            font-size: 12px;
        }
    }

    > p {
        margin: 5px 0 0;
    }
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
