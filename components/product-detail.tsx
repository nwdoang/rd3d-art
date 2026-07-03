'use client'
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import Image from 'next/image'
import { ProductBreadcrumb } from './product-breadcrumb'
import { Marker, MarkerContent, MarkerIcon } from './ui/marker'
import { PaintBucket, ShoppingCart, Sun, Truck } from 'lucide-react'

interface Product {
  id: string
  brand: string
  name: string
  description: string
  price: string
  currency: string
  rating: number
  images: {
    id: number
    src: string
    alt: string
  }[]
  sizes: string[]
  colors: {
    name: string
    value: string[]
  }[]
  materials: string[]
}

const productDetails: Product = {
  id: 'high-tops-black',
  brand: 'Toy',
  name: 'Minecraft Ludo',
  description: 'build & foldable Minecraft ludo.',
  price: '20-50',
  currency: '$',
  rating: 4,
  images: [
    {
      id: 1,
      src: 'https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/nike-zig-kinetica-3-front-view-2.800w.e3c867.avif',
      alt: 'Black technical knit fabric high-tops - View 1',
    },
    {
      id: 2,
      src: 'https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/nike-zig-kinetica-3-side-view.800w.e023db.avif',
      alt: 'Black technical knit fabric high-tops - View 2',
    },
    {
      id: 3,
      src: 'https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/nike-zig-kinetica-3-front-view.800w.75705b.avif',
      alt: 'Black technical knit fabric high-tops - View 3',
    },
    {
      id: 4,
      src: 'https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/nike-zig-kinetica-3-back-view.800w.4d3306.avif',
      alt: 'Black technical knit fabric high-tops - View 4',
    },
  ],
  sizes: ["S", "M", "L"],
  colors: [
    { name: 'Navy & Green', value: ["navy", "green"] },
    { name: 'Green & Orange', value: ["green", "orange"] },
    { name: 'Brown & Green', value: ["brown", "green"] }
  ],
  materials: [
    "PLA",
    "PLA+",
    "Glow In The Dark",
    "Shine"
  ]
}

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(productDetails.sizes[0])
  const [selectedColor, setSelectedColor] = useState(productDetails.colors[0])
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(productDetails.materials[0])
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!carouselApi) return

    // Set carousel to the selected image
    carouselApi.scrollTo(selectedImage)

    // Update selected image when carousel changes
    const handleSelect = () => {
      const currentIndex = carouselApi.selectedScrollSnap()
      setSelectedImage(currentIndex)
    }

    carouselApi.on('select', handleSelect)
    return () => {
      carouselApi.off('select', handleSelect)
    }
  }, [carouselApi, selectedImage])

  return (
    <div>
      {/* Product Details */}
      <section className='@container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-6 py-4 lg:py-6 xl:py-10'>
        <ProductBreadcrumb />
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-12 mt-6'>
          {/* Main Image */}
          <div className='flex flex-col gap-4'>
            <Carousel setApi={setCarouselApi} className='w-full'>
              <CarouselContent>
                {productDetails.images.map(image => (
                  <CarouselItem key={image.id}>
                    <Image src={image.src} alt={image.alt} width={800} height={800} className='w-full h-[500px] rounded-lg object-cover' />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Thumbnails */}
            <div className='flex flex-wrap gap-2'>
              {productDetails.images.map((image, index) => (
                <div
                  key={image.id}
                  onMouseEnter={() => setSelectedImage(index)}
                  className={cn(
                    'ring-offset-background size-16 cursor-pointer overflow-hidden rounded-sm ring-offset-2 transition-all lg:size-18',
                    selectedImage === index && 'ring-foreground ring-2',
                  )}
                >
                  <Image src={image.src} alt={image.alt} width={800} height={800} className='size-full object-cover' />
                </div>
              ))}
            </div>
          </div>

          {/* Product Attributes */}
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <span className='text-sm font-semibold tracking-wide uppercase'>{productDetails.brand}</span>
              <h2 className='text-xl font-bold tracking-tight text-balance lg:text-3xl mt-2'>{productDetails.name}</h2>
              <p className='text-muted-foreground text-balance'>{productDetails.description}</p>
              <p className='text-2xl font-bold tracking-tight mt-2'>
                {productDetails.currency}
                {productDetails.price}
              </p>
            </div>

            {/* Color Selection */}
            <div className='flex flex-col gap-2 mt-4'>
              <h3 className='font-bold'>
                Color:
                <span className='text-sm font-normal ml-1'>{selectedColor.name}</span>
              </h3>
              <div className='flex gap-3'>
                {productDetails.colors.map(color => (
                  <Button
                    type="button"
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'appearance-none bg-transparent border-0 ring-offset-background size-8 cursor-pointer rounded-full ring-offset-2 transition-all p-0 focus:outline-none',
                      selectedColor.name === color.name ? 'ring-foreground ring-2' : 'hover:scale-110',
                    )}
                    aria-label={`Select ${color.name} color`}
                    title={`Select ${color.name} color`}
                  >
                    <span
                      className="size-full rounded-full block shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                      style={{
                        background: color.value.length === 2
                          ? `linear-gradient(135deg, ${color.value[0]} 50%, ${color.value[1]} 50.1%)`
                          : color.value[0]
                      }}
                    />
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className='flex flex-col gap-2 mt-4'>
              <div className='flex justify-between'>
                <h3 className='font-bold'>Sizes</h3>
                <Button variant="link" className='text-xs font-normal underline cursor-pointer'>Size Guide</Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {productDetails.sizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                    className="size-10 cursor-pointer rounded-full p-0 text-xs"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-2 mt-4'>
              <h3 className='font-bold'>Material</h3>
              <div className='flex flex-wrap gap-3'>
                {productDetails.materials.map(material => (
                  <Button
                    key={material}
                    variant={selectedMaterial === material ? 'default' : 'outline'}
                    onClick={() => setSelectedMaterial(material)}
                    className="cursor-pointer rounded-sm"
                    size="lg"
                  >
                    {material}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-2 mt-4'>
              <Button className="h-10 px-8 flex-1 cursor-pointer rounded-sm" size='lg'>
                Order now
              </Button>
              <Button size="icon-lg" className="rounded-sm cursor-pointer" variant="outline">
                <ShoppingCart />
              </Button>
            </div>

            <div className='mt-4 space-y-2'>
              <Marker variant="separator">
                <MarkerContent>
                  Notes
                </MarkerContent>
              </Marker>
              <Marker>
                <MarkerIcon>
                  <Sun />
                </MarkerIcon>
                <MarkerContent>
                  Don’t store under heat above 40 degrees, cannot be placed in the car
                </MarkerContent>
              </Marker>
              <Marker>
                <MarkerIcon>
                  <PaintBucket />
                </MarkerIcon>
                <MarkerContent>
                  Expect that colours might slightly differ than the photo provided
                </MarkerContent>
              </Marker>
              <Marker>
                <MarkerIcon>
                  <Truck />
                </MarkerIcon>
                <MarkerContent>
                  Orders will be completed and delivered within 14 days
                </MarkerContent>
              </Marker>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}