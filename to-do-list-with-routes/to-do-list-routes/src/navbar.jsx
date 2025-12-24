import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <Link  className='navlink navlinks' to="/">Home</Link>
        <Link className='navlink' to="/review">Review Tasks</Link>
        <Link className='navlink' to="/update">Edit Task</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
