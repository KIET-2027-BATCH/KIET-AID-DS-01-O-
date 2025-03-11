
import { Link } from "react-router-dom";
import { ModeToggle } from "../ui/mode-toggle";


export default function Header() {
  return (
    <header className="bg-white dark:bg-black text-white py-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold dark:text-white text-black">My Website</h1>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6 text-[18px] font-medium dark:text-white text-black">
            <li>
              <Link to="/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/data" className="hover:underline">
                Data
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
          <ModeToggle/>
        </nav>
      </div>
    </header>
  );
}