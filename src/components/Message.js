import React, { useState } from 'react';
import styled from 'styled-components';
import anonymousImage from './Anonymitigate_logo.png'; 

function Message({
    message,
    timestamp,
    user,
    userImage,
    originalMessage,
    isAnonymous,
    channelType,
    onReply,
    messageId,
    isThread
}) {
    const [showOriginal, setShowOriginal] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [currentMessage, setCurrentMessage] = useState("");

   

    const handleClick = (event) => {
        if (event.ctrlKey) {
            const rect = event.currentTarget.getBoundingClientRect();
            const newPopupContent = originalMessage || ""; // Lấy nội dung tin nhắn gốc
            
            if (showOriginal && currentMessage === newPopupContent) {
                // Nếu pop-up đã mở và tin nhắn gốc trùng, tắt pop-up
                setShowOriginal(false);
                setCurrentMessage('');
            } else {
                // Nếu pop-up không mở hoặc tin nhắn gốc khác, mở pop-up và cập nhật nội dung
                setPopupPosition({
                    top: rect.top + window.scrollY + rect.height / 2, // Center vertically
                    left: rect.left + window.scrollX + rect.width / 2  // Center horizontally
                });
                setCurrentMessage(newPopupContent);
                setShowOriginal(true);
            }
        }
    };

    const handleReply = () => {
        console.log('Reply button clicked for message:', messageId); // Debug
        if (onReply) {
            onReply(messageId);  // messageId を渡して onReply を呼び出す
        } else {
            console.error('onReply is not a function');
        }
    };

    return (
        <MessageContainer isThread={isThread} channelType={channelType} onClick={handleClick}>
            <UserImage src={isAnonymous ? anonymousImage : userImage} alt={``} />
            <MessageInfo>
                <h4>
                    {isAnonymous ? '' : <span>{user}</span>}
                    <span>{new Date(timestamp?.toDate()).toLocaleString()}</span>
                </h4>
                <p>{message}</p>
                {onReply && <ReplyButton onClick={handleReply}>Reply</ReplyButton>}
            </MessageInfo>
            {showOriginal && (
                <OriginalMessagePopup style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}>
                    <div className="popup-content">
                        <p><strong>Original Message:</strong></p>
                        <p>{currentMessage}</p>
                    </div>
                </OriginalMessagePopup>
            )}
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
    border-bottom: 1px solid #f0f0f0; /* Added a bottom border for better separation */
    
    &:hover {
        background-color: ${(props) => (props.isThread ? '#e0e0e0' : '#f9f9f9')};
    }
`;

const UserImage = styled.img`
    height: 50px;
    width: 50px; /* 幅を指定して画像が表示されるようにする */
    border-radius: 8px;
    margin-right: 10px;
    object-fit: cover; /* 画像がコンテナに収まるようにする */

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

const OriginalMessagePopup = styled.div`
    position: fixed; /* Ensure it stays in place */
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    transform: translate(-50%, -50%); /* Center based on the calculated position */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for better visibility */

    .popup-content {
        position: relative;
    }
`;

