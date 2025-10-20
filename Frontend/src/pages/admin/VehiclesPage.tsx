import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { getVehicles, deleteVehicle } from '../../services/api';
import type { Vehicle } from '../../types';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const response = await getVehicles();
        setVehicles(response.data.vehicles);
      } catch (error) {
        toast.error('Failed to fetch vehicles.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  //  Implement the full delete logic
  const handleDelete = async (id: string, make: string, model: string) => {
    // Add a confirmation dialog to prevent accidental deletion
    if (window.confirm(`Are you sure you want to delete the ${make} ${model}? This action cannot be undone.`)) {
      try {
        // Call the API to delete the vehicle from the database
        await deleteVehicle(id);
        toast.success('Vehicle deleted successfully!');
        
        // Update the state to instantly remove the vehicle from the UI
        setVehicles(currentVehicles => currentVehicles.filter(vehicle => vehicle._id !== id));
      } catch (error) {
        toast.error('Failed to delete the vehicle.');
      }
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading vehicles...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Vehicles</h2>
        <Link 
          to="/admin/vehicles/add" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 flex items-center gap-2"
        >
          <PlusCircle size={18} /> Add Vehicle
        </Link>
      </div>

      <div className="bg-card border rounded-lg shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Make & Model</th>
              <th className="p-4">Type</th>
              <th className="p-4">Price/Day</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle._id} className="border-b last:border-b-0">
                <td className="p-4">
                  <img src={vehicle.imageUrl} alt={vehicle.model} className="w-16 h-10 object-cover rounded" />
                </td>
                <td className="p-4 font-medium">{vehicle.make} {vehicle.model}</td>
                <td className="p-4 capitalize">{vehicle.type}</td>
                <td className="p-4">${vehicle.pricePerDay}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link to={`/admin/vehicles/edit/${vehicle._id}`} className="p-2 hover:text-primary"><Edit size={16} /></Link>
                    {/*  Update the button's onClick handler to pass vehicle details */}
                    <button 
                      onClick={() => handleDelete(vehicle._id, vehicle.make, vehicle.model)} 
                      className="p-2 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}