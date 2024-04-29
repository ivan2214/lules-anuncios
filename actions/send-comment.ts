'use server'

import { db } from '@/lib/db'
import { type MessageFormValues } from '@/app/(routes)/offer/[offerId]/components/chat-message-form'
import { MessageSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'

export const sendComment = async (values: MessageFormValues) => {
  const validatedFields = MessageSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { chatId, content, sender, senderId, storeId } = validatedFields.data

  if (chatId) {
    if (sender === 'USER') {
      await db.chat.update({
        where: {
          id: chatId
        },
        data: {
          messages: {
            create: {
              content,
              sender,
              user: {
                connect: {
                  id: senderId
                }
              }
            }
          }
        }
      })
    }

    if (sender === 'STORE') {
      await db.chat.update({
        where: {
          id: chatId
        },
        data: {
          messages: {
            create: {
              content,
              sender,
              store: {
                connect: {
                  id: senderId
                }
              }
            }
          }
        }
      })
    }
  }

  if (!chatId || chatId === '' || chatId === null) {
    if (sender === 'USER') {
      await db.chat.create({
        data: {
          store: {
            connect: {
              id: storeId
            }
          },
          messages: {
            create: {
              content,
              sender,
              user: {
                connect: {
                  id: senderId
                }
              }
            }
          }
        }
      })
    }

    if (sender === 'STORE') {
      await db.chat.create({
        data: {
          store: {
            connect: {
              id: storeId
            }
          },
          messages: {
            create: {
              content,
              sender,
              store: {
                connect: {
                  id: senderId
                }
              }
            }
          }
        }
      })
    }
  }
  revalidatePath('/offer/[offerId]')
}
