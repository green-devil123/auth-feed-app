import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Feed from "./pages/Feed";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";

import Modal from "./components/Modal";
import { AuthForm } from "./components/AuthForm";

const InnerApp: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isFeed = pathname === "/";
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  return (
    <div>

      {/* HEADER */}
      <header className="bg-white py-3">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-bold">
              f
            </div>
            <div className="text-sm font-semibold">foo-rum</div>
          </div>

          <nav className="flex items-center gap-3">
            {isFeed && !isAuthenticated && (
              <button
                onClick={() => navigate("/signin")}
                className="flex items-center gap-2 text-sm font-semibold transition"
              >
                <span>Login</span>
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
              </button>
            )}

            {isAuthPage && (
              <button
                onClick={() => navigate("/")}
                className="text-sm font-semibold"
              >
                Back to home
              </button>
            )}
          </nav>

        </div>
      </header>

      {/* ROUTES */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<div className="pt-6"><Feed /></div>} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>

      {/* AUTH MODAL */}
      <Modal open={isAuthModalOpen} onClose={closeAuthModal}>
        <AuthForm mode="signin" />
      </Modal>

    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
