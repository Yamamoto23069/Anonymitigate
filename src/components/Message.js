import React from 'react';
import styled from 'styled-components';

function Message({ message, timestamp, user, isAnonymous, userImage, channelType }) {

    return (
        <MessageContainer>
            <img src={ isAnonymous ? '' : userImage} alt="" />
            <MessageInfo>
            <h4>
                { isAnonymous ? '' : user }
                <span>
                    {new Date(timestamp?.toDate()).toUTCString()}
                </span>
            </h4>
            <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    );
}

export default Message; 

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        height: 50px;
        border-radius: 8px;
    }

    ${({ channelType }) => channelType === 'private' && `
        background-color: #f5f5f5; /* Example style for private messages */
        border-left: 5px solid #ccc;
    `}
`;

const MessageInfo = styled.div``;
