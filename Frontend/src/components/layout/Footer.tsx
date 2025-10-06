export const Footer = () => (
    <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-4">Community</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">About Us</a></li>
                        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">How it works</a></li>
                        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Careers</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Help Centre</a></li>
                        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Trust & Safety</a></li>
                        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Contact us</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500">Privacy Policy</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-4">Follow Us</h4>
                     <div className="flex space-x-4">
                        {/* Add social media icons here if you have them */}
                     </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} MatteCar. All rights reserved.
            </div>
        </div>
    </footer>
);
