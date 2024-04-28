'use server'
import { db } from '@/lib/db'

export async function updateImageUser (userId: string, image: string) {
  if (!userId || !image) {
    return
  }
  try {
    await db.user.update({
      where: {
        id: userId
      },
      data: {
        image
      }
    })
  } catch (error) {
    console.log(error)
  }
}

