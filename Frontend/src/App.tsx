import { useState, useEffect } from 'react'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const AppRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  switch (currentPath) {
    case '/login':
      return <LoginPage />;
    case '/signup':
      return <SignupPage />;
    default:
      return <Home />;
  }
};

function App() {
  return <AppRouter />
}

export default App

