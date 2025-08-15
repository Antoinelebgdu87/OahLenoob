import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Only log error for truly unexpected routes, not intentional 404 page access
    if (location.pathname !== "/NotFound") {
      console.warn(
        "404 Warning: User accessed non-existent route:",
        location.pathname,
      );
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4">
          404
        </h1>
        <p className="text-xl text-gray-300 mb-6">Page not found!</p>
        <a
          href="/"
          className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 shadow-lg rounded-xl transition-all duration-200 hover:shadow-xl tracking-wide uppercase inline-block"
        >
          Return to Free Robux Game
        </a>
      </div>
    </div>
  );
};

export default NotFound;
