import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from 'page/LoginPage';
import MailListPage from 'page/MailListPage';
import SigninPage from 'page/SigninPage';
import MainPage from './page/MainPage';
import MailWritePage from 'page/MailWritePage';
import RemainingDaysPage from './page/RemainingDaysPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/" element={<MainPage />} />
        <Route path="/remainingdayspage" element={<RemainingDaysPage />} />
        <Route path="/maillistpage" element={<MailListPage />} />
        <Route path="/mailwritepage" element={<MailWritePage />} />
        <Route path="/signin" element={<SigninPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
