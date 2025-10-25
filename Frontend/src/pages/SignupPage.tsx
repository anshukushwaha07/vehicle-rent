import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import type { SignUpData } from '../types';
import signupImage from '../assets/vehical_img/Signup.png';

const SocialButton = ({ icon, text, provider }: { icon: string; text: string; provider: string }) => (
  <button className="w-full flex items-center justify-center gap-2 py-2.5 border rounded-lg hover:bg-accent transition-colors">
    <img src={icon} alt={`${provider} logo`} className="w-5 h-5" />
    <span className="text-sm font-medium text-muted-foreground">{text}</span>
  </button>
);

export default function SignupPage() {
  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    drivingLicenseNumber: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // ✅ Updated password regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  // ✅ Validation function
  const validateField = (id: string, value: string) => {
    let error = '';

    switch (id) {
      case 'name':
        if (!/^[a-zA-Z\s]{3,30}$/.test(value)) error = 'Name must be 3–30 letters only.';
        break;

      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email.';
        break;

      case 'password':
        const pwd = value.trim();
        if (!pwd) error = 'Password is required.';
        else if (!passwordRegex.test(pwd))
          error = 'Password must be 8+ chars with uppercase, lowercase, number & symbol.';
        break;

      case 'phoneNumber':
        if (!/^[0-9]{10}$/.test(value)) error = 'Phone must be 10 digits.';
        break;

      case 'dateOfBirth': {
        if (!value) { 
          error = 'Date of birth is required.'; 
          break; 
        }
        const dob = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (dob > today) error = 'DOB cannot be in the future.';
        else if (age < 18) error = 'Must be at least 18 years old.';
        break;
      }

      case 'drivingLicenseNumber':
        if (!/^[A-Z0-9]{6,15}$/.test(value)) error = 'License must be 6–15 alphanumeric chars.';
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [id]: error }));
    return error === '';
  };

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    validateField(id, value); // real-time validation
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      const valid = validateField(key, value);
      if (!valid) isValid = false;
    });

    if (!isValid) return;

    setLoading(true);
    try {
      await signup(formData);
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex items-center justify-center min-h-screen bg-background px-4 py-24">
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden border">
          <div className="hidden md:block">
            <img src={signupImage} alt="Signup illustration" className="w-full h-full object-cover" />
          </div>

          <div className="p-8 sm:p-12 bg-card text-card-foreground">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
              <p className="text-muted-foreground mt-2">Start your journey with us today.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-background"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-background"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-background"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter 10 digits"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-background"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  onChange={handleChange}
                  value={formData.dateOfBirth}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-background"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
              </div>

              {/* Driving License Number */}
              <div>
                <label htmlFor="drivingLicenseNumber" className="block text-sm font-medium mb-1">
                  Driving License Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="drivingLicenseNumber"
                  placeholder="DL12345"
                  onChange={handleChange}
                  value={formData.drivingLicenseNumber}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-background"
                />
                {errors.drivingLicenseNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.drivingLicenseNumber}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Social Signup */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SocialButton
                provider="Google"
                text="Google"
                icon="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
              <SocialButton
                provider="Facebook"
                text="Facebook"
                icon="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
              />
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
