import { useState } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, SearchIcon } from '../../lib/icon';

// --- Data for different vehicles ---
const vehicles = [
    {
        type: 'Car',
        name: 'BMW 5 Series',
        imageUrl: 'https://placehold.co/1000x500/3B82F6/FFFFFF?text=BMW+5+Series&font=raleway',
    },
    {
        type: 'Bike',
        name: 'Sports Bike',
        imageUrl: 'https://placehold.co/1000x500/10B981/FFFFFF?text=Sports+Bike&font=raleway',
    },
    {
        type: 'Van',
        name: 'Utility Van',
        imageUrl: 'https://placehold.co/1000x500/F59E0B/FFFFFF?text=Utility+Van&font=raleway',
    },
];

export const HeroSection = () => {
    const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);

    const currentVehicle = vehicles[currentVehicleIndex];

    return (
        <section className="relative bg-gray-50 dark:bg-gray-900 pt-24 pb-12 sm:pt-32 sm:pb-16 min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 top-[-20%] sm:top-[-40%] md:top-[-50%] lg:top-[-60%] flex items-center justify-center">
                 <div className="w-[150%] sm:w-[120%] md:w-[100%] aspect-square rounded-full bg-gradient-to-b from-blue-200 via-blue-100 to-transparent dark:from-blue-900/50 dark:via-blue-800/20 dark:to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-800 dark:text-white leading-tight tracking-tighter mb-6">
                    RIDE SMARTER <br /> SAVE TOGETHER.
                </h1>
                
                <div className="max-w-4xl mx-auto mb-8">
                    <img
                        key={currentVehicle.name}
                        src={currentVehicle.imageUrl}
                        alt={currentVehicle.name}
                        className="w-full h-auto object-contain animate-fade-in"
                    />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-6 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                        <div className="lg:col-span-2">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative">
                                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="Departure" className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                                </div>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="Destination" className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition" />
                                </div>
                             </div>
                        </div>
                         <div className="lg:col-span-2">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="date" className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-500" />
                                </div>
                                <div className="relative">
                                    <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="time" className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-500" />
                                </div>
                             </div>
                        </div>
                        <button className="bg-blue-500 text-white rounded-lg py-2 px-6 flex items-center justify-center font-semibold hover:bg-blue-600 transition w-full h-full">
                            <SearchIcon className="w-5 h-5 mr-2" />
                            Search
                        </button>
                    </div>
                </div>

                <div className="flex justify-center space-x-2 mt-8">
                    {vehicles.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentVehicleIndex(index)}
                            className={`w-3 h-3 rounded-full transition ${currentVehicleIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'}`}
                            aria-label={`Select ${vehicles[index].type}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
