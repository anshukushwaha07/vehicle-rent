import Header from './components/layout/Header'
import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 md:pt-32">
        <Home />
      </main>
    </div>
  )
}

export default App
