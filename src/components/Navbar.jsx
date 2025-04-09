import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-secondary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Forum App</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/categories" className="hover:text-primary">Categories</Link>
          <Link to="/discussions" className="hover:text-primary">Discussions</Link>
          {user ? (
            <>
              <span className="text-gray-300">Welcome, {user.email}</span>
              <button
                onClick={() => signOut()}
                className="hover:text-primary"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;