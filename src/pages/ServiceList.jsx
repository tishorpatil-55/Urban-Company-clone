import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get('/api/services');
        setServices(data);
        setLoading(false);
      } catch (err) {
        // Fallback mock data if API fails or backend not running yet for preview
        console.error("API Fetch Error, using mock data for demo", err);
        setServices([
          { _id: '1', name: 'Home Cleaning', description: 'Deep cleaning for your home.', price: 499, category: 'Cleaning' },
          { _id: '2', name: 'AC Repair', description: 'Expert AC repair and servicing.', price: 799, category: 'Appliance' },
          { _id: '3', name: 'Plumbing', description: 'Fixing leaks and installations.', price: 299, category: 'Plumbing' },
          { _id: '4', name: 'Electrician', description: 'Wiring and electrical repairs.', price: 349, category: 'Electrical' },
        ]);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin h-10 w-10 text-indigo-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Available Services</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{service.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {service.category}
                </span>
              </div>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>{service.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">₹{service.price}</span>
                <Link to={`/book?serviceId=${service._id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
