import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/login";
import Home from "./pages/home/home";
import Register from "./pages/auth/register";
import { ThemeProvider } from "./components/ui/theme-provider";


function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<Login />} path="" />
        </Routes>
        <Routes>
          <Route element={<Home />} path="/home" />
        </Routes>
        <Routes>
          <Route element={<Register />} path="/register" />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
