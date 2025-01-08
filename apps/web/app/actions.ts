// app/actions.ts
'use server'

import { hc } from 'hono/client'
import type { AppType } from '@apps/backend'

const client = hc<AppType>('http://localhost:8787/')

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const body = formData.get('body') as string

    const res = await client.posts.$post({
      form: { title, body }
    })

    const data = await res.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error creating post:', error)
    return { success: false, error: 'Failed to create post' }
  }
}
