import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { CiLogin } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { logout } from "@/store/auth";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  console.log(user); // Print user data

  return (
    <header className="bg-white dark:bg-black text-white py-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold dark:text-white text-black">
          My Website
        </h1>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6 text-[18px] font-medium dark:text-white text-black">
            <li>
              <Link to="/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/data" className="hover:underline">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/prediction" className="hover:underline">
                Prediction
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
          <ModeToggle />
          {user ? (
            <Button onClick={handleLogout} className="cursor-pointer">
              Logout
            </Button>
          ) : (
            <span>
              <Link to="/login">
                <Button className="cursor-pointer">
                  <CiLogin />
                  Signup/Signin
                </Button>
              </Link>
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
