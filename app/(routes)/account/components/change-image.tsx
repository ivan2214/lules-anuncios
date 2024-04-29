'use client'
import { updateImageUser } from '@/actions/update-image-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Loader2Icon } from 'lucide-react'
import { type User } from 'next-auth'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useState } from 'react'

interface ChangeImageProps {
  user: User
}

const ChangeImage: React.FC<ChangeImageProps> = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagen de perfil</CardTitle>
        <CardDescription>Cambia tu imagen de perfil</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async () => {
            setLoading(true)
            if (imageUrl && user?.id) {
              await updateImageUser(user?.id, imageUrl)
            }
            setLoading(false)
          }}
          className="flex items-center justify-between space-x-4"
        >
          <div className="flex items-center justify-start gap-x-3">
            <Avatar className="h-12 w-12">
              {user.image ?? imageUrl
                ? (
                <AvatarImage src={user.image ?? imageUrl} />
                  )
                : (
                <AvatarFallback>AC</AvatarFallback>
                  )}
            </Avatar>
            <CldUploadWidget
              options={{
                folder: `happy_kids/users/profile/images/${user?.id}`,
                autoMinimize: true,
                maxFiles: 3,
                language: 'es',
                resourceType: 'image',
                theme: 'minimal'
              }}
              onUpload={(result: any) => {
                setImageUrl(result.info.secure_url)
              }}
              uploadPreset="yg83lxkj"
            >
              {({ open }: any) => {
                const onClick = () => {
                  open()
                }

                return (
                  <Button onClick={onClick} type="button" disabled={loading}>
                    Cambiar imagen
                  </Button>
                )
              }}
            </CldUploadWidget>
          </div>
          {imageUrl && (
            <Button
              type="submit"
              disabled={loading}
              variant="outline"
              size="sm"
            >
              {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Guardar
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangeImage
