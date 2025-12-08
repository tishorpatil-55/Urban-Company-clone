import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) return;
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const { data } = await axios.get('/api/bookings/mybookings', config);
                setBookings(data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
                // Mock data for display if backend fails
                if (bookings.length === 0) {
                    setBookings([
                        { _id: '101', service: { name: 'Home Cleaning' }, date: '2025-12-10', time: '10:00', status: 'Confirmed' },
                        { _id: '102', service: { name: 'AC Repair' }, date: '2025-12-15', time: '14:00', status: 'Pending' }
                    ]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    if (!user) {
        return <div className="p-8 text-center text-gray-500">Please log in to view dashboard.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Welcome back, {user.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your bookings and profile settings.
                    </p>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Role</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">{user.role || 'User'}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Bookings</h3>

            {loading ? (
                <p className="text-gray-500">Loading bookings...</p>
            ) : bookings.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <li key={booking._id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-indigo-600 truncate">{booking.service?.name || "Service"}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {booking.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                {booking.date}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                {booking.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500 bg-white p-6 rounded-md shadow">No bookings found. <a href="/services" className="text-indigo-600 hover:text-indigo-900">Book a service now</a></p>
            )}
        </div>
    );
};

export default Dashboard;
