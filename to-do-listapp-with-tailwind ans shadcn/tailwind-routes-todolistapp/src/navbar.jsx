import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-400 h-16 flex items-center justify-between">
      <ul>
        <Link  className="no-underline text-white ml-16 cursor-pointer hover:text-yellow-400" to="/">Home</Link>
        <Link className="no-underline text-white ml-16 cursor-pointer hover:text-yellow-400" to="/review">Review Tasks</Link>
        <Link className="no-underline text-white ml-16 cursor-pointer hover:text-yellow-400" to="/update">Edit Task</Link>
      </ul>
    </nav>
  );
}

export default Navbar;