// Frontend/src/Layout.jsx
import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, History, Moon, Star } from "lucide-react";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');

          :root {
            --primary-purple: #6366f1;
            --deep-purple: #4338ca;
            --gold: #f59e0b;
            --silver: #e5e7eb;
            --mystical-blue: #1e1b4b;
          }

          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          .mystical-title {
            font-family: 'Playfair Display', serif;
          }

          .card-glow {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
          }

          .mystical-border {
            border: 1px solid rgba(245, 158, 11, 0.3);
          }
        `}
      </style>

      {/* Mystical Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-indigo-300 rounded-full animate-pulse opacity-40"></div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={createPageUrl("Reading")} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="mystical-title text-xl font-bold text-white">Mystic Cards</span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                to={createPageUrl("Reading")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === createPageUrl("Reading")
                    ? "bg-purple-600/30 text-purple-200 mystical-border"
                    : "text-gray-300 hover:text-purple-200 hover:bg-purple-900/20"
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">New Reading</span>
              </Link>

              <Link
                to={createPageUrl("History")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === createPageUrl("History")
                    ? "bg-purple-600/30 text-purple-200 mystical-border"
                    : "text-gray-300 hover:text-purple-200 hover:bg-purple-900/20"
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        <Outlet /> {/* 자식 라우트가 이곳에 렌더링됩니다 */}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-800/30 bg-black/20 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="mystical-title text-lg text-purple-200">
                Trust in the universe's guidance
              </span>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-gray-400 text-sm">
              Let the cards reveal your path forward with wisdom and clarity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
