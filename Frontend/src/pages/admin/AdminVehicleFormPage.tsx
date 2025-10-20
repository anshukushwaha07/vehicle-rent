import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getVehicleById, createVehicle, updateVehicle, type VehicleFormData } from '../../services/api';
import type { Vehicle } from '../../types';

export default function AdminVehicleFormPage() {
  const { id } = useParams<{ id: string }>(); // Gets the vehicle ID from the URL if it exists
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // If there's an ID, we're in "edit" mode

  const [formData, setFormData] = useState<Partial<VehicleFormData>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'car',
    pricePerDay: 50,
    imageUrl: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // If in edit mode, fetch the vehicle data when the component loads
  useEffect(() => {
    if (isEditMode && id) {
      setIsLoading(true);
      getVehicleById(id)
        .then(response => {
          setFormData(response.data.vehicle);
        })
        .catch(() => toast.error('Failed to fetch vehicle details.'))
        .finally(() => setIsLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditMode && id) {
        await updateVehicle(id, formData);
        toast.success('Vehicle updated successfully!');
      } else {
        await createVehicle(formData as Vehicle);
        toast.success('Vehicle created successfully!');
      }
      navigate('/admin/vehicles'); // Redirect back to the list
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} vehicle.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return <div className="p-8">Loading form...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
      <form onSubmit={handleSubmit} className="bg-card p-8 border rounded-lg shadow-sm space-y-6 max-w-2xl">
        {/* Make and Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="make" className="block text-sm font-medium mb-1">Make</label>
            <input type="text" name="make" id="make" value={formData.make} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg bg-background" />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium mb-1">Model</label>
            <input type="text" name="model" id="model" value={formData.model} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg bg-background" />
          </div>
        </div>

        {/* Year, Type, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="year" className="block text-sm font-medium mb-1">Year</label>
            <input type="number" name="year" id="year" value={formData.year} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg bg-background" />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
            <select name="type" id="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg bg-background">
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="scooter">Scooter</option>
              <option value="van">Van</option>
            </select>
          </div>
          <div>
            <label htmlFor="pricePerDay" className="block text-sm font-medium mb-1">Price/Day ($)</label>
            <input type="number" name="pricePerDay" id="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg bg-background" />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
          <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg bg-background" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
           <button type="button" onClick={() => navigate('/admin/vehicles')} className="px-4 py-2 border rounded-lg">Cancel</button>
           <button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:bg-primary/50">
             {isLoading ? 'Saving...' : (isEditMode ? 'Update Vehicle' : 'Create Vehicle')}
           </button>
        </div>
      </form>
    </div>
  );
}