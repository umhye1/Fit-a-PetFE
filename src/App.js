import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Header from './components/Header/Header';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import { Footer } from './components/Footer/Footer';

import Post from './pages/Community/Post/Post';
import PostWrite from './pages/Community/Post/PostWrite';
import PostPage from './pages/Community/Post/PostPage';

import PetPost from './pages/Community/PetPost/PetPost';
import SearchMate from './pages/Community/PetPost/SearchMate';

import MapPage from './pages/Map/MapPage';

import Home from './pages/Home/Home';
import ChatBox from './pages/ChatBox/ChatBox';
import Trail from './pages/Trail/Trail';
import Profile from './pages/Profile/Profile';

import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import SignupFinish from './pages/Login/SignupFinish';
import NewPassword from './pages/Login/NewPassword';
import NewPasswordSuccess from './pages/Login/NewPasswordSuccess';
import FindPassword from './pages/Login/FindPassword';

import MyPetRoom from './pages/MyPetRoom/MyPetRoom';
import { AuthProvider } from './pages/Login/AuthContext';


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
    <AuthProvider> 
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
          <Route path="/map" element={<MapPage />} />
          <Route path="/trail" element={<Trail />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/post" element={<Post />} />
          <Route path="/postPage" element={<PostPage />} />
          <Route path="/postWrite" element={<PostWrite />} />
          <Route path="/petPost" element={<PetPost />} />
          <Route path="/searchMate" element={<SearchMate />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signupFinish" element={<SignupFinish/>} />
          <Route path="/findPassword" element={<FindPassword/>} />
          <Route path="/newPassword" element={<NewPassword/>} />
          <Route path="/newPassword/success" element={<NewPasswordSuccess/>} />
          <Route path="/myPetRoom" element={<MyPetRoom/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
    </AuthProvider>
  );
}

export default App;