'use client'

import { useState, useTransition } from 'react'
import type * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterStoreSchema } from '@schemas/index'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form'

import CardWrapper from '@components/auth/card-wrapper'
import { Input } from '@ui/input'
import { Button } from '@ui/button'
import { FormError } from '@components/form-error'
import { FormSucces } from '@components/form-succes'
import { registerStore } from '@/actions/register-store'

export type RegisterStoreFormValues = z.infer<typeof RegisterStoreSchema>

export const RegisterStoreForm = () => {
  const [viewPassword, setViewPassword] = useState(false)
  const [error, setError] = useState<string | undefined>('')

  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterStoreFormValues>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      phone: '',
      postalCode: '',
      image: '',
      password: ''
    },
    resolver: zodResolver(RegisterStoreSchema)
  })

  function onSubmit (values: RegisterStoreFormValues) {
    setError('')
    setSuccess('')

    startTransition(() => {
      registerStore(values)
        .then((res) => {
          setError(res.error)
          setSuccess(res.success)
        })
        .catch((error) => {
          console.error(error)
          if (error instanceof Error) {
            setError(error.message)
          }
        })
    })
  }

  return (
    <CardWrapper
      hederLabel="Registrate como tienda"
      backButtonLabel="Iniciar sesión con tu tienda"
      backButtonHref="/auth/store/login"
      className="bg-slate-900 text-white"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="example@me.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="text" placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="San Francisco"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="text" placeholder="94103" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="text" placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="https://example.com/image.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type={viewPassword ? 'text' : 'password'}
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setViewPassword(!viewPassword)
                }}
              >
                {viewPassword ? 'Hide password' : 'Show password'}
              </Button>
            </div>
          </div>

          <FormError message={error} />
          <FormSucces message={success} />

          <Button type="submit" className="w-full">
            {isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
