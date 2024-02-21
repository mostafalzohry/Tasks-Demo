import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import 'firebase/auth';
import { auth } from '../../firebase';

interface User {
  displayName: string | null;
}

type SetCurrentUser = Dispatch<SetStateAction<User | null>>;

interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: SetCurrentUser; 
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: () => {}, 
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext; 
};
