import { SignIn, SignUp } from "@clerk/clerk-react";

function AuthPage() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Emerald Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white/30">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome to Eco Footprint</h1>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Sign In</h2>
              <SignIn />
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Or Sign Up</h2>
                <SignUp />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-white/80 backdrop-blur-sm bg-black/10 rounded-full px-4 py-2">
            🌱 Join thousands making a difference for our planet
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
