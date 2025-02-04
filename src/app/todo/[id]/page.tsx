'use client';

import { useRouter } from 'next/navigation';

export default function TodoDetail({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
          {/* Add todo details and edit functionality here */}
        </div>
      </div>
    </div>
  );
}