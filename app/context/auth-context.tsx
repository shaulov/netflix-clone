'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthContext ({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;