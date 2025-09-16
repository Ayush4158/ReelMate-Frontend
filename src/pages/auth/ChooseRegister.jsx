import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop"
          alt="Food background"
          className="w-full h-full object-cover opacity-30 dark:opacity-40"
        />
      </div>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-12 py-16 md:py-24 space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow-lg">
          Discover, Share & Enjoy Delicious Food
        </h1>
        <p className="max-w-xl text-gray-700 dark:text-gray-300 text-lg sm:text-xl">
          Connect with food lovers, explore amazing recipes, and join our community of culinary enthusiasts. Your next favorite meal is just a click away!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            to="/user/register"
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-indigo-700 hover:scale-105 transform transition"
          >
            Register as User
          </Link>
          <Link
            to="/food-partner/register"
            className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-2xl shadow hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105 transform transition"
          >
            Register as Food Partner
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Feature Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
            <img
              src="https://images.unsplash.com/photo-1523986371872-9d3ba2e2f0c3?q=80&w=400&auto=format&fit=crop"
              alt="Explore"
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Explore Recipes</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Browse thousands of recipes from food enthusiasts around the world and discover your next favorite dish.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=400&auto=format&fit=crop"
              alt="Share"
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Share Your Creations</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Upload your favorite recipes, cooking tips, and food stories to inspire the community.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c14?q=80&w=400&auto=format&fit=crop"
              alt="Connect"
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Connect with Partners</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Collaborate with local food partners, discover exclusive meals, and grow your culinary network.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
