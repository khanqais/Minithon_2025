import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const isActive = (path) => location.pathname === path;

  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/leaderboard", label: "Leaderboard" },
  ];

  const protectedItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/quiz", label: "Take Quiz" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <>
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      <header className="sticky top-0 z-50">
        {/* Glass Header */}
        <div className="backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-2 group-hover:scale-110 transition-transform duration-200">
                    <div className="text-2xl">🌱</div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EcoFootprint
                  </h1>
                  <p className="text-xs text-gray-700 -mt-1">Carbon Impact Tracker</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-gray-900 shadow-lg'
                        : 'text-gray-700 hover:text-gray-900 hover:scale-105'
                    }`}
                  >
                    {isActive(item.path) && (
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 text-lg">{item.icon}</span>
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ))}

                <SignedIn>
                  {protectedItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-gray-900 shadow-lg'
                          : 'text-gray-700 hover:text-gray-900 hover:scale-105'
                      }`}
                    >
                      {isActive(item.path) && (
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 text-lg">{item.icon}</span>
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  ))}
                </SignedIn>
              </nav>

              {/* User Section */}
              <div className="flex items-center space-x-4">
                <SignedIn>
                  {/* Desktop User Info */}
                  <div className="hidden md:flex items-center space-x-3">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName || 'User'}
                      </p>
                      <p className="text-xs text-gray-600">Eco Warrior</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-75"></div>
                      <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-1">
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-10 h-10 transition-all duration-200 hover:scale-110",
                              userButtonPopoverCard: "backdrop-blur-xl bg-white/80 border border-white/30 shadow-2xl",
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile User Button */}
                  <div className="md:hidden">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur opacity-75"></div>
                      <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-1">
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-9 h-9 transition-all duration-200",
                              userButtonPopoverCard: "backdrop-blur-xl bg-white/80 border border-white/30 shadow-2xl",
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </SignedIn>
                
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="group relative bg-white/20 backdrop-blur-sm border border-white/30 text-gray-900 px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>🔑</span>
                        <span>Sign In</span>
                      </span>
                    </button>
                  </SignInButton>
                </SignedOut>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden relative bg-white/20 backdrop-blur-sm border border-white/30 p-2 rounded-xl text-gray-900 hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="relative z-10 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="lg:hidden pb-4 border-t border-white/20">
                <div className="mt-4 space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-gray-900 shadow-lg'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {isActive(item.path) ? (
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl"></div>
                      ) : (
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                      <span className="relative z-10 text-lg">{item.icon}</span>
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  ))}

                  <SignedIn>
                    {protectedItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive(item.path)
                            ? 'text-gray-900 shadow-lg'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        {isActive(item.path) ? (
                          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl"></div>
                        ) : (
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                        <span className="relative z-10 text-lg">{item.icon}</span>
                        <span className="relative z-10">{item.label}</span>
                      </Link>
                    ))}
                  </SignedIn>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group relative w-full text-left flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-900 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 rounded-xl shadow-xl"></div>
                        <span className="relative z-10 text-lg">🔑</span>
                        <span className="relative z-10">Sign In</span>
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
