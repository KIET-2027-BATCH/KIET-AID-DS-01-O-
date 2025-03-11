import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import Home from "./pages/home/home";
import Register from "./pages/auth/register";
import { ThemeProvider } from "./components/ui/theme-provider";
import Data from "./pages/home/data";
import Prediction from "./pages/home/prediction";
import Blog from "./pages/home/blog";


function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<Login />} path="/login" />
        </Routes>
        <Routes>
          <Route element={<Home />} path="/home" />
        </Routes>
        <Routes>
          <Route element={<Register />} path="/register" />
        </Routes>
        <Routes>
          <Route element={<Data/>} path="/data" />
        </Routes>
        <Routes>
          <Route element={<Prediction/>} path="/prediction" />
        </Routes>
        <Routes>
          <Route element={<Blog/>} path="/blog" />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
