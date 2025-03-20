import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Header from './components/Header/Header';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import { Footer } from './components/Footer/Footer';

import Feed from './pages/Community/Feed/Feed';
import FeedWrite from './pages/Community/Feed/FeedWrite';
import FeedPage from './pages/Community/Feed/FeedPage';
import PetPhoto from './pages/Community/PetPhoto/PetPhoto';

import Map from './pages/Map/Map';

import Home from './pages/Home/Home';
import ChatBox from './pages/ChatBox/ChatBox';
import WalkBox from './pages/WalkBox/WalkBox';
import Profile from './pages/Profile/Profile';

import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import SignupFinish from './pages/Login/SignupFinish';
import NewPassword from './pages/Login/NewPassword';
import NewPasswordSuccess from './pages/Login/NewPasswordSuccess';
import FindPassword from './pages/Login/FindPassword';

function App() {

  const[hoveredComponent, setHoveredComponent] = useState(null);

  const handleHeaderHover =(component) =>{
    setHoveredComponent(component);
  };

  const handleHeaderLeave =()=>{
    setHoveredComponent(null);
  }
  const closeMenu =()=>{
    setHoveredComponent(null);
  }

  return (
    <>
      <Router>
        <Header onHover={handleHeaderHover} onLeave={handleHeaderLeave}/>
        <HeaderMenu
          hoveredComponent={hoveredComponent}
          onHover={handleHeaderHover}
          onLeave={handleHeaderLeave}
          closeMenu={closeMenu}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbox" element={<ChatBox />} />
          <Route path="/map" element={<Map />} />
          <Route path="/walkbox" element={<WalkBox />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/feed" element={<Feed />} />
          <Route path="/feedPage" element={<FeedPage />} />
          <Route path="/feedWrite" element={<FeedWrite />} />
          <Route path="/petphoto" element={<PetPhoto />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signupFinish" element={<SignupFinish/>} />
          <Route path="/findPassword" element={<FindPassword/>} />
          <Route path="/newPassword" element={<NewPassword/>} />
          <Route path="/newPassword/success" element={<NewPasswordSuccess/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;