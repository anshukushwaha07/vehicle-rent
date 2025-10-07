import Header from './components/layout/Header'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const AppRouter = () => {
  const path = window.location.pathname;

  switch (path) {
    case '/login':
      return <LoginPage />;
    case '/signup':
      return <SignupPage />;
    default:
      return <Home />;
  }
};

function App() {
  return (
    <>
    <Header/>
      <AppRouter />
      </>
     
  )
}

export default App

