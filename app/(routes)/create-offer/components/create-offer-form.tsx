'use client'

import { useState, useTransition } from 'react'
import type * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { OfferSchema } from '@/schemas'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@ui/form'

import { Input } from '@ui/input'
import { Button } from '@ui/button'
import { FormError } from '@components/form-error'
import { FormSucces } from '@components/form-succes'
import { Loader2Icon, TrashIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ImageUpload from '@/components/image-upload'
import { createOffer } from '@/actions/offer'

export type OfferFormValues = z.infer<typeof OfferSchema>

export const CreateOfferForm = () => {
  const [categories, setCategories] = useState<Array<{ name: string }>>([])
  const [error, setError] = useState<string | undefined>('')

  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<OfferFormValues>({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      categories: [],
      images: [],
      storeId: 'clva49dz100011ls9u1tpj925'
    },
    resolver: zodResolver(OfferSchema)
  })

  function onSubmit (values: OfferFormValues) {
    setError('')
    setSuccess('')

    startTransition(() => {
      createOffer(values)
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
        .finally(() => {
          setCategories([])
          form.reset()
        })
    })
  }

  const handleAddCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key === ' ') {
      event.preventDefault() // Evita que el espacio se añada al input
      const inputElement = event.target as HTMLInputElement
      const categoryName = inputElement.value.trim() // Accede al valor del campo de entrada
      if (categoryName) {
        // Agregar categoría al estado
        setCategories((prevCategories) => [...prevCategories, { name: categoryName }])

        // Llamar a setValue para actualizar el valor del campo de entrada
        const oldValues = form.getValues('categories')

        form.setValue('categories', [...oldValues, { name: categoryName }])

        // Limpiar el campo de entrada
        inputElement.value = ''
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="9.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories" // Este nombre debe coincidir con el nombre del campo en tu esquema OfferSchema
            render={() => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Categories"
                    onKeyDown={handleAddCategory} // Maneja la combinación de teclas para añadir categorías
                  />
                </FormControl>
                <FormDescription>Press control + space to add a category</FormDescription>
                <section className="flex flex-wrap gap-2">
                  {categories?.length > 0 &&
                    categories?.map((category, index) => (
                      <Badge
                        className="flex items-center justify-between gap-2 border-2"
                        variant="outline"
                        key={index}
                      >
                        <span className="capitalize">{category.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCategories((old) => old.filter((c) => c !== category))
                          }}
                        >
                          <TrashIcon className="h-5 w-5 text-destructive" />
                        </Button>
                      </Badge>
                    ))}
                </section>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <section>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Imagenes</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value?.map((image) => image?.url)}
                      disabled={isPending}
                      onChange={(url) => {
                        field.onChange([...field.value, { url }])
                      }}
                      onRemove={(url) => {
                        field.onChange([...field.value.filter((current) => current?.url !== url)])
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </section>
        <section className="grid grid-cols-1 gap-6">
          <Button variant="default" disabled={isPending} type="submit">
            {isPending && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Creating...' : 'Create Offer'}
          </Button>
          <FormError message={error} />
          <FormSucces message={success} />
        </section>
      </form>
    </Form>
  )
}
