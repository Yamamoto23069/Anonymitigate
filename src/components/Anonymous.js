import React, { useState } from 'react'
import styled from 'styled-components'
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the import based on your project structure

function Anonymous({ channelId, message, timestamp }) {
    const [loading, setLoading] = useState(false);

    const sendAnonymousMessage = async () => {
        setLoading(true);
        const randomIndex = Math.floor(Math.random() * randomImages.length);
        const randomImage = randomImages[randomIndex];

        try {
            const messagesCollection = collection(db, 'messages');
            await addDoc(messagesCollection, {
                channelId,
                message,
                timestamp,
                userImage: randomImage
            });
            console.log('Anonymous message sent successfully');
        } catch (error) {
            console.error('Error sending anonymous message: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnonymousMessageContainer>
            <button onClick={sendAnonymousMessage} disabled={loading}>
                {loading ? 'Sending...' : 'Send Anonymous Message'}
            </button>
        </AnonymousMessageContainer>
    );
}

export default Anonymous

const AnonymousMessageContainer = styled.div`
    padding: 10px;
    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
    }
`;

