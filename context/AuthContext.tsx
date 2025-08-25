"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../supabaseClient";
import type { Session, AuthError, AuthResponse } from "@supabase/supabase-js";

// Define context value type
interface AuthContextType {
  session: Session | null;
  signUpNewUser: (email: string, password: string) => Promise<{ success: boolean; data?: AuthResponse["data"]; error?: AuthError }>;
  signInUser: (email: string, password: string) => Promise<{ success: boolean; data?: AuthResponse["data"]; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  // Sign up
  const signUpNewUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Error signing up: ", error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  // Sign in
  const signInUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        console.error("Sign-in error:", error.message);
        return { success: false, error: error.message };
      }

      console.log("Sign-in success:", data);
      return { success: true, data };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Unexpected error during sign-in:", message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // Keep session updated
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signUpNewUser, signInUser, session, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }
  return context;
};
