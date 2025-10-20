import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Car, Bike, Zap, CarTaxiFront, Wallet } from 'lucide-react'; 
import { getVehicles } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  type: 'car' | 'bike' | 'scooter' | 'van';
  pricePerDay: number;
  imageUrl: string;
}

// Define the specific filter types
type VehicleFilterType = 'car' | 'bike' | 'scooter' | 'van';

// Map vehicle types to their respective icons
const vehicleIcons: Record<VehicleFilterType, React.ElementType> = {
  car: Car,
  bike: Bike,
  scooter: Zap,
  van: CarTaxiFront,
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeFilter, setActiveFilter] = useState<VehicleFilterType>('car');
  const [isLoading, setIsLoading] = useState(true);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const response = await getVehicles();
        setVehicles(response.data.vehicles);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch vehicles.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);
  
  const filteredVehicles = vehicles.filter(vehicle => vehicle.type === activeFilter);

 
  const handleBookingClick = (vehicleId: string) => {
    if (isAuthenticated) {
      navigate(`/booking/${vehicleId}`);
    } else {
      toast.error('You must be logged in to book a vehicle.');
      setTimeout(() => {
        navigate('/login'); 
      }, 1500);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Fleet</h1>
            <p className="text-lg text-muted-foreground mt-2">Choose from our exclusive collection of premium vehicles.</p>
          </div>

          {/*  Filter Buttons  */}
          <div className="flex justify-center items-center gap-4 mb-8 p-2 bg-card border rounded-full">
            {(Object.keys(vehicleIcons) as VehicleFilterType[]).map((type) => {
              const Icon = vehicleIcons[type];
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeFilter === type
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  <Icon size={16} />
                  <span className="capitalize">{type}</span>
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading vehicles...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                 
                  <div key={vehicle._id} className="bg-card border rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                    <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-56 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-sm text-muted-foreground">{vehicle.year}</p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-2xl font-semibold text-primary">
                          ${vehicle.pricePerDay}<span className="text-sm font-normal text-muted-foreground">/day</span>
                        </p>
                        <button 
                          onClick={() => handleBookingClick(vehicle._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          <Wallet size={16} /> Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No {activeFilter}s available at the moment. Please check back later.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}