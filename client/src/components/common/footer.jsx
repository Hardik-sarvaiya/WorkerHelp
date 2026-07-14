
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaFaceGrinHearts } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-4">WorkerHelp</h2>
            <p className="text-gray-400">
              Connecting skilled workers with customers seamlessly. Quality, trust, and satisfaction guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/catalog" className="hover:text-white transition-colors">Workers</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-white"><FaFacebookF /></a>
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-white"><FaInstagram /></a>
            </div>
            <p className="text-gray-400">
              Email: support@workerhelp.com <br />
              Phone: +91 99999 99999
            </p>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-gray-500 text-sm">
          Made with {" "}
          <FaFaceGrinHearts /> {" "} by
          Hardik Sarvaiya &copy; {new Date().getFullYear()} WorkerHelp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;