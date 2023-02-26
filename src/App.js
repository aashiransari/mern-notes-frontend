import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from './components/User';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {

  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/login' element={<LoginScreen />} />
          <Route exact path='/profile' element={<ProfileScreen />} />
          <Route exact path='/register' element={<RegisterScreen />} />
          <Route exact path='/createnote' element={<CreateNote />} />
          <Route exact path='/note/:id' element={<SingleNote />} />
          <Route path='/mynotes' element={<MyNotes search={search} />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
