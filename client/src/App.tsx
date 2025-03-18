import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import Home from "./pages/home/home";
import Register from "./pages/auth/register";
import { ThemeProvider } from "./components/ui/theme-provider";
import Data from "./pages/home/data";
import Prediction from "./pages/home/prediction";
import Blog from "./pages/home/blog";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={user ? <Navigate to="/home" /> : <Login />} path="/login" />
          <Route element={user ? <Navigate to="/home" /> : <Register />} path="/register" />
          <Route element={<Home />} path="/home" />
          <Route element={<Data />} path="/data" />
          <Route element={<Prediction />} path="/prediction" />
          <Route element={<Blog />} path="/blog" />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
