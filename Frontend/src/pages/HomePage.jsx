// HomePage.jsx
import React from "react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4">
      {/* Emerald Glow + 3D Model Background */}
      <div className="absolute inset-0 z-0">
        {/* Emerald Glow */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)`,
            backgroundSize: "100% 100%",
          }}
        />
        {/* Sketchfab 3D Model iframe only */}
        <iframe
          title="Cartoon Lowpoly Earth"
          src="https://sketchfab.com/models/73dd3283bf6d45a3a62d4806f3044633/embed"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          className="w-full h-full pointer-events-none opacity-70"
        ></iframe>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center max-w-3xl px-6 py-10 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 drop-shadow-lg">
          Ready to go <span className="text-emerald-600">green</span>? 🚀
        </h1>
        <p className="text-xl mb-8 text-gray-800 drop-shadow-md">
          Start your journey towards a more sustainable lifestyle with our Eco Footprint Calculator.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 justify-center">
          <SignInButton>
            <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300">
              Log In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-8 py-4 bg-yellow-400 text-white font-bold rounded-full shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
