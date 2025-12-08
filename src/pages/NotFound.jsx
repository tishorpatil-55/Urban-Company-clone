import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
            <p className="mt-4 text-2xl font-bold text-gray-900 tracking-tight sm:text-4xl">Page not found</p>
            <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-6">
                <Link to="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                    Go back home<span aria-hidden="true"> &rarr;</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
