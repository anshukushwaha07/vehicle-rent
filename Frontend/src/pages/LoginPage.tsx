import Header from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

// Helper function to navigate
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// A simple social login button component
const SocialButton = ({ icon, text, provider }: { icon: string, text: string, provider: string }) => (
    <button className="w-full flex items-center justify-center gap-2 py-2.5 border rounded-lg hover:bg-accent transition-colors">
        <img src={icon} alt={`${provider} logo`} className="w-5 h-5" />
        <span className="text-sm font-medium text-muted-foreground">{text}</span>
    </button>
);

export default function LoginPage() {
    return (
        <>
            <Header />
            <main className="flex items-center justify-center min-h-screen bg-background px-4 py-24">
                <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden border">
                    {/* Left Panel: Image */}
                    <div className="hidden md:block">
                        <img 
                            src="https://placehold.co/800x1000/2563EB/FFFFFF?text=Welcome+Back&font=raleway" 
                            alt="Login illustration" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Panel: Form */}
                    <div className="p-8 sm:p-12 bg-card text-card-foreground">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                            <p className="text-muted-foreground mt-2">Enter your credentials to access your account.</p>
                        </div>
                        
                        <form className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-ring outline-none transition" 
                                    />
                                </div>
                                <div>
                                     <div className="flex justify-between items-center mb-1">
                                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                        <a href="#" className="text-sm text-primary hover:underline">Forgot?</a>
                                     </div>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-ring outline-none transition" 
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                                Log In
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t p-2" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SocialButton provider="Google" text="Google" icon="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
                            <SocialButton provider="Facebook" text="Facebook" icon="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" />
                        </div>
                        
                        <p className="text-center text-sm text-muted-foreground mt-8">
                            Don't have an account? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }} className="text-primary hover:underline cursor-pointer">Sign up</a>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

