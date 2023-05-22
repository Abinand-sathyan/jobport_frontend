import React from "react";
import { Link } from "react-router-dom";

function Errhandle() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              403 Forbidden
            </h1>
            <p className="mt-2 text-base text-gray-500">
              You do not have permission to access this page.
            </p>
            <div className="mt-6">
              <Link to="/">
                <div className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                  Go back home <span aria-hidden="true"> &rarr;</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Errhandle;