import { useState, useEffect } from 'react';

import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const CalendarIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
);

const ClockIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const MapPinIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const SearchIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
);

const CarIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 16.5 19 22l-5-5.5"></path><path d="M4 13.5 9 9l-5 5.5"></path><path d="M14 8.5 9 13l5-4.5"></path><path d="m11.5 6-6 6"></path><path d="M20.5 12.5c0-1.8-1.4-3.5-3.5-3.5s-3.5 1.8-3.5 3.5c0 1.5 1 3 2.5 3.5"></path><path d="M12.5 2.5c0 1.8 1.4 3.5 3.5 3.5s3.5-1.8 3.5-3.5c0-1.5-1-3-2.5-3.5"></path><path d="m3.5 17.5 4.5-4.5"></path><path d="M15 12.5c0-1.5-1-3-2.5-3.5A3.5 3.5 0 0 0 9 12.5c0 1.8 1.4 3.5 3.5 3.5s3.5-1.8 3.5-3.5"></path></svg>
);

const ShieldIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const HandshakeIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m11 17 2 2a1 1 0 1 0 1.4-1.4l-2-2"></path><path d="m5.8 11.8 2.2 2.2c.5.5 1.2.5 1.7 0l2.4-2.4c.5-.5.5-1.2 0-1.7l-2.2-2.2c-.5-.5-1.2-.5-1.7 0l-2.4 2.4c-.5.5-.5 1.2 0 1.7Z"></path><path d="m14 6-2.5 2.5"></path><path d="m18 10-2.5 2.5"></path><path d="m19 11 2.2 2.2c.5.5 1.2.5 1.7 0l1.2-1.2c.5-.5.5-1.2 0-1.7l-2.2-2.2c-.5-.5-1.2-.5-1.7 0l-1.2 1.2Z"></path></svg>
);


// --- Data for different vehicles ---
const vehicles = [
    {
        type: 'Car',
        name: 'BMW 5 Series',
        imageUrl: 'https://images.wsj.net/im-913577?width=1280&size=1.33333333',
    },
    {
        type: 'Bike',
        name: 'Sports Bike',
        imageUrl: 'https://images.pexels.com/photos/18868363/pexels-photo-18868363.jpeg',    },
    {
        type: 'Van',
        name: 'Utility Van',
        imageUrl: 'https://images.pexels.com/photos/3298901/pexels-photo-3298901.jpeg',
    },
];


const HeroSection = () => {
    const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);

    // 💡 Implementation for automatic sliding
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Calculate the next index, looping back to 0 if it reaches the end
            setCurrentVehicleIndex(prevIndex => 
                (prevIndex + 1) % vehicles.length
            );
        }, 5000); // Auto-advance every 5 seconds (5000ms)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this runs once on mount

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
                
                {/* Image container with fixed aspect ratio */}
                <div className="max-w-4xl mx-auto mb-8 aspect-video">
                    <img
                        // Using 'key' forces React to re-render the <img>, re-triggering the CSS animation
                        key={currentVehicle.name}
                        src={currentVehicle.imageUrl}
                        alt={currentVehicle.name}
                        className="w-full h-full object-cover animate-fade-in rounded-lg shadow-xl"
                    />
                </div>

                {/* Search Form Card (No changes needed here) */}
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


const HowItWorksSection = () => (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">How It Works</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Find a ride, offer a ride, and travel together with ease. It's simple, affordable, and good for the planet.
                </p>
            </div>
            {/* Ensure all cards have the same height */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-stretch">
                {[
                    {
                        icon: <CarIcon className="w-8 h-8" />,
                        title: "Your pick of rides at low prices",
                        desc: "No matter where you’re going, find the perfect ride from our wide range of destinations and routes."
                    },
                    {
                        icon: <HandshakeIcon className="w-8 h-8" />,
                        title: "Trust who you travel with",
                        desc: "We take the time to get to know each of our members. We verify profiles, ratings and IDs, so you know who you're travelling with."
                    },
                    {
                        icon: <ShieldIcon className="w-8 h-8" />,
                        title: "Scroll, click, tap and go!",
                        desc: "Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in minutes."
                    }
                ].map((item, index) => (
                    // Use h-full, flex, and flex-col, plus flex-grow on the paragraph, to enforce equal height
                    <div key={index} className="p-6 h-full flex flex-col justify-start bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-500 dark:text-blue-400 mx-auto mb-4">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 flex-grow">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const SafetySection = () => (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Help Us keep you safe from scams and fraud.
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        A reminder that you're travelling for business or pleasure, you should remain vigilant to car-sharing scams. Follow our tips to stay safe.
                    </p>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                        Learn More
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <img src="https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg" alt="Motorbike" className="rounded-lg shadow-lg aspect-video object-cover" />
                    <img src="https://images.pexels.com/photos/33524950/pexels-photo-33524950.jpeg" alt="Scooter" className="rounded-lg shadow-lg aspect-video object-cover" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Left_side_of_Flying_Pigeon.jpg/500px-Left_side_of_Flying_Pigeon.jpg" alt="Scooter" className="rounded-lg shadow-lg aspect-video object-cover" />
                    <img src="https://images.wsj.net/im-913577?width=1280&size=1.33333333" alt="Van" className="rounded-lg shadow-lg aspect-video object-cover" />
                </div>
            </div>
        </div>
    </section>
);

const BonusSection = () => (
     <section className="py-16 sm:py-24 bg-white dark:bg-gray-800">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 {/* Image container with fixed aspect ratio */}
                 <div className="aspect-video">
                     <img 
                         src="https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2022/09/23074716/sports-vs-supercars-cover-230920221250.jpg"
                         alt="Sports Car" 
                         // Image fills the container, maintaining consistency
                         className="rounded-lg shadow-lg w-full h-full object-cover" 
                     />
                 </div>
                 <div>
                     <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                         Enjoy a €25 carpool bonus for sharing your ride!
                     </h2>
                     <p className="text-gray-600 dark:text-gray-400 mb-8">
                         Offer a ride on our platform to get your bonus. All you have to do is publish your ride and get your first passengers.
                     </p>
                      <div className="space-y-6 mb-8">
                          <div className="flex items-start">
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-500 mr-4">
                                  <CarIcon className="w-6 h-6" />
                              </div>
                              <div>
                                  <h4 className="font-semibold text-gray-800 dark:text-white">Get more passengers</h4>
                                  <p className="text-gray-600 dark:text-gray-400">Reach more people looking for a ride.</p>
                              </div>
                          </div>
                          <div className="flex items-start">
                               <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-500 mr-4">
                                 <ShieldIcon className="w-6 h-6" />
                              </div>
                              <div>
                                  <h4 className="font-semibold text-gray-800 dark:text-white">Verified and Secure</h4>
                                  <p className="text-gray-600 dark:text-gray-400">We verify all profiles to ensure a safe community.</p>
                              </div>
                          </div>
                     </div>
                     <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                         Offer a ride
                     </button>
                 </div>
             </div>
         </div>
     </section>
);

// --- Main App Component ---

export default function Home() {
    // 💡 Add the CSS keyframes directly here for a fully contained solution
    // This runs once when the component is first rendered (simulating a global style add)
    useEffect(() => {
        if (!document.getElementById('fade-in-style')) {
            const style = document.createElement('style');
            style.id = 'fade-in-style';
            style.innerHTML = `
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800">
            <Header />
            <main>
                <HeroSection />
                <HowItWorksSection />
                <SafetySection />
                <BonusSection />
            </main>
            <Footer />
        </div>
    );
}