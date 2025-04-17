import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    // Simple mock authentication
    setUser({ email, id: '1' });
    return Promise.resolve();
  };

  const signUp = (email, password) => {
    // Simple mock sign up
    setUser({ email, id: '1' });
    return Promise.resolve();
  };

  const signOut = () => {
    setUser(null);
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}