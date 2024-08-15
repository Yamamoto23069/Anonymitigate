
// App.js

import React, { useState, useEffect } from 'react';

import './App.css';

import {

  BrowserRouter as Router,

  Route,

  Link,

  Routes

} from "react-router-dom"

import Header from './components/Header'; 

import styled from 'styled-components';

import Sidebar from './components/Sidebar';

import Chat from "./components/Chat";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "./firebase";

import Login from "./components/Login"

import Spinner from "react-spinkit"

import LanguagePopup from './LanguagePopup';

import { doc, getDoc } from 'firebase/firestore';

function App() {

  const [user, loading] = useAuthState(auth);

  const [showPopup, setShowPopup] = useState(false);



  useEffect(() => {

    const checkLanguagePreference = async () => {

      if (user) {

        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (userDoc.exists() && userDoc.data().language) {

          setShowPopup(false);

        } else {

          setShowPopup(true);

        }

      }

    };



    checkLanguagePreference();

  }, [user]);

 if (loading) {

    return (

      <AppLoading>

        <AppLoadingContents>

          <img

            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"

            alt=""

          />



          <Spinner 

            name="ball-spin-fade-loader"

            color="purple"

            fadeIn="none"

          />

        </AppLoadingContents>

      </AppLoading>

    );

  }



  return (
   <div className="app">

      <Router>

        {!user ? (

          <Login />

        ) : (

          <>

          <Header />
	  {showPopup && <LanguagePopup onClose={() => setShowPopup(false)} />}

          <AppBody>

            <Sidebar />

            <Routes>

              <Route path="/" element={<Header />} />

            </Routes>

            <Routes>

            <Route path="/" element={<Chat />} />

            </Routes>

          </AppBody>

        </>

        )}
 </Router>

    </div>

  );

}



export default App;

const AppLoading = styled.div`

  display: grid;

  place-items: center;

  height: 100vh;

  width: 100%;

`;



const AppLoadingContents = styled.div`

  text-align: center;

  padding-bottom: 100px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;



  > img {

    height: 100px;

    padding: 20px;

    margin-bottom: 40px;

  }

`;



const AppBody = styled.div`

  display: flex;

  height: 100vh;

`
