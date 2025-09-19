import { useUser } from '@clerk/clerk-react';

function UserProfile() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
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
        
        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-500"></div>
          <span className="ml-3 text-gray-700">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!user) {
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
        
        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/30">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h2>
            <p className="text-gray-600">Please sign in to view your profile</p>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              👤 Your Profile
            </h1>
            <p className="text-xl text-gray-700">
              Manage your eco-journey settings and preferences
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/30">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-eco-green-400 to-eco-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-white font-bold shadow-lg">
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Hello, {user.firstName || 'Eco Warrior'}! 👋
              </h2>
              <p className="text-gray-600 mt-2">
                Welcome to your sustainable journey dashboard
              </p>
            </div>
            
            {/* Profile Details */}
            <div className="space-y-6">
              <div className="bg-gray-50/70 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900 text-lg">
                  {user.emailAddresses[0]?.emailAddress}
                </p>
              </div>
              
              <div className="bg-gray-50/70 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <p className="text-gray-900 text-lg">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              
              <div className="bg-gray-50/70 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Since
                </label>
                <p className="text-gray-900 text-lg">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200/70">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-eco-green-500 hover:bg-eco-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  🌱 View My Eco Stats
                </button>
                <button className="bg-eco-blue-500 hover:bg-eco-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  ⚙️ Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
