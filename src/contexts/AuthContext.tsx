
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'admin' | 'superadmin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Pour la démonstration, on simule un utilisateur superadmin
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@comptanova.com',
    role: 'superadmin'
  });

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    
    const roleHierarchy = {
      user: 0,
      admin: 1,
      superadmin: 2
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[role];
  };

  return (
    <AuthContext.Provider value={{ user, setUser, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
