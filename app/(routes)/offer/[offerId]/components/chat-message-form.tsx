'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type * as z from 'zod'
import { MessageSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SendIcon } from 'lucide-react'
import { type MessageSender } from '@prisma/client'
import { sendComment } from '@/actions/send-comment'
import { useTransition } from 'react'

interface ChatMessageForrmProps {
  chatId?: string
  sender: MessageSender
  senderId?: string
  storeId?: string
}

export type MessageFormValues = z.infer<typeof MessageSchema>

export const ChatMessageForrm: React.FC<ChatMessageForrmProps> = ({
  chatId,
  sender,
  senderId,
  storeId
}) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<MessageFormValues>({
    defaultValues: {
      content: '',
      sender,
      chatId,
      senderId: senderId ?? '',
      storeId: storeId ?? ''
    },
    resolver: zodResolver(MessageSchema)
  })

  function onSubmit (values: MessageFormValues) {
    startTransition(() => {
      sendComment(values)
        .then((res) => {
          form.reset()
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input placeholder="Type your message..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} size="icon" type="submit">
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </section>
      </form>
    </Form>
  )
}
