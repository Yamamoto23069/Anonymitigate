// LanguagePopup.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from './firebase';

const LanguagePopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLanguageSelect = async (lang) => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        language: lang
      }, { merge: true });
      onClose();
      navigate('/'); // Redirect to the main chat page or reload
    }
  };

  return (
    <PopupContainer>
      <h2>Select Your Language</h2>
      <button onClick={() => handleLanguageSelect('vi')}>Tiếng Việt</button>
      <button onClick={() => handleLanguageSelect('ja')}>日本語</button>
      <button onClick={() => handleLanguageSelect('en')}>English</button>
    </PopupContainer>
  );
};


export default LanguagePopup;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;

  > button {
    margin: 5px;
  }
`;
