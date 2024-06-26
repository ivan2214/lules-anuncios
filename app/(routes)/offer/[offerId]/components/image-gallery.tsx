'use client'
import ImageSkeleton from '@/components/image-skeleton'
import { type Image } from '@prisma/client'
import { useState } from 'react'

interface ImageGalleryProps {
  images: Image[]
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const selectImage = (index: number) => {
    setCurrentImage(index)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    const image = e.currentTarget.querySelector('img')
    if (image) {
      image.style.transformOrigin = `${x * 105}% ${y * 105}%`
      image.style.transform = 'scale(1.5)' // Aplicar escala para el efecto de zoom
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget.querySelector('img')
    if (image) {
      image.style.transform = 'scale(1)' // Reestablecer la escala cuando el mouse sale de la imagen
    }
  }

  return (
    <section className="w-full lg:w-1/2 flex flex-col gap-4">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden rounded-lg"
        style={{ cursor: 'zoom-in' }}
      >
        <ImageSkeleton
          alt="Sneaker Image"
          className="aspect-[1/1] w-full object-cover object-center transition"
          src={images[currentImage].url || ''}
        />
      </div>
      <div className="w-full grid grid-cols-4 gap-4">
        {images?.map((image, index) => (
          <picture
            key={image.id}
            onClick={() => { selectImage(index) }}
            className="w-full overflow-hidden rounded-lg cursor-pointer transition hover:opacity-60"
          >
            <ImageSkeleton
              alt="Sneaker Image"
              className="aspect-[1/1] w-full object-cover object-center"
              src={image?.url || ''}
            />
          </picture>
        ))}
      </div>
    </section>
  )
}
