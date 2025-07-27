import React from 'react';
import { Link } from 'react-router-dom';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-100 p-8">
      <h1 className="text-4xl font-bold text-red-800 mb-4">TEST PAGE WORKS!</h1>
      <p className="text-red-600 mb-4">If you can see this, routing is working properly.</p>
      <Link to="/dashboard" className="text-blue-600 underline">
        Back to Dashboard
      </Link>
    </div>
  );
}
