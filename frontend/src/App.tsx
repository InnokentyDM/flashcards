import React from 'react';

// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Home from './components/Home';
import FlashCards from './components/FlashCards';
import Header from './components/Header';
import Piles from './components/Piles';
import FlashCardsList from "./components/FlashCardsList";

// Styles
import { GlobalStyle } from './GlobalStyle';
import UserProvider from "./context";


const App = () => (
    <Router>
        <UserProvider>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/piles/:pileId/flashcards' element={<FlashCards />} />
                <Route path='/piles' element={<Piles />} />
                <Route path='/piles/:pileId/flashcards/list' element={<FlashCardsList />} />
            </Routes>
          <GlobalStyle />
      </UserProvider>
    </Router>
)

export default App;
