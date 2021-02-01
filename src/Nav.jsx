import './Nav.css';

const Nav = function({ user, onLogout }) {
  if(!user.isLoggedIn) {
    return null;
  }
  return (
    <nav className="logout"><a className="logout" href="#logout" onClick={onLogout}>Logout</a>
    </nav>
  );
};

export default Nav;