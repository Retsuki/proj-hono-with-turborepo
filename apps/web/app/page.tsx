

// app/page.tsx
'use client'

import { useState } from 'react'
import { createPost } from './actions';

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean;
    data?: any;
    error?: string;
  } | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await createPost(formData)
    setResult(result)
    setLoading(false)
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Create New Post</h1>
        
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium mb-1">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              rows={4}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>

        {result && (
          <div
            className={`p-4 rounded-md ${
              result.success
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {result.success ? (
              <div>
                <p className="font-medium">Post created successfully!</p>
                <pre className="mt-2 text-sm overflow-x-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="font-medium">{result.error}</p>
            )}
          </div>
        )}
      </div>
    </main>
  )
}