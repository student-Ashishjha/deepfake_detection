
import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white mt-20">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor" className="text-gray-50 dark:text-gray-900"></path>
        </svg>
      </div>

      <div className="relative pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand section */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-purple-400 mr-3" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DeepfakeGuard
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Protecting digital authenticity with cutting-edge AI detection technology. 
                Our mission is to combat misinformation and ensure trust in digital media.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-purple-800 hover:bg-purple-700 rounded-full transition-colors duration-200">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-purple-800 hover:bg-purple-700 rounded-full transition-colors duration-200">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-purple-800 hover:bg-purple-700 rounded-full transition-colors duration-200">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-purple-800 hover:bg-purple-700 rounded-full transition-colors duration-200">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Detection Tool</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Research</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 sm:mb-0">
              © {new Date().getFullYear()} DeepfakeGuard. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Made with ❤️ for digital safety</span>
              <button 
                onClick={scrollToTop}
                className="p-2 bg-purple-700 hover:bg-purple-600 rounded-full transition-colors duration-200"
                aria-label="Scroll to top"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;