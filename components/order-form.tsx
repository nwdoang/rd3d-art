'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Minus, Plus, X } from 'lucide-react'
import { Textarea } from './ui/textarea'

export default function OrderForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    notes: '',
  })

  const [orderSummary] = useState({
    items: [
      {
        id: 1,
        name: 'Minecraft Ludo',
        variant: 'Navy & Green, Large, PLA',
        price: 299.99,
        quantity: 1,
        image: 'https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/premium-wireless-headphones.600w.7d1414.avif',
      },
      {
        id: 2,
        name: 'Leather Laptop Sleeve',
        variant: 'Brown, Small, 13-inch',
        price: 89.99,
        quantity: 1,
        image: 'https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/leather-laptop-sleeve.800w.86ef12.avif',
      },
    ],
    shipping: 15.99,
    tax: 27.54,
    discount: 0,
    promoDiscount: 0,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header */}
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold text-balance'>Order Details</h1>
        <p className='text-muted-foreground'>Please review your order and provide the necessary details</p>
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        {/* Main Form */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader className='gap-0'>
              <CardTitle className='text-balance'>Contact Information</CardTitle>
              <CardDescription>We&apos;ll use this to send you order updates</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-6'>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='email-kL9x23P'>Email address</Label>
                  <Input
                    id='email-kL9x23P'
                    type='email'
                    placeholder='john@example.com'
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className='h-9 rounded-md'
                  />
                </div>

                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='firstName-mN7z84Q'>Name</Label>
                    <Input
                      id='firstName-mN7z84Q'
                      placeholder='John'
                      value={formData.name}
                      onChange={e => handleInputChange('name', e.target.value)}
                      className='h-9 rounded-md'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='phone-rM6n82S'>Phone number (optional)</Label>
                    <Input
                      id='phone-rM6n82S'
                      type='tel'
                      placeholder='+1 (555) 123-4567'
                      value={formData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      className='h-9 rounded-md'
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <Label htmlFor='notes-kL9x23P'>Notes</Label>
                  <Textarea
                    id='notes-kL9x23P'
                    placeholder='Add notes about your order'
                    value={formData.notes}
                    onChange={e => handleInputChange('notes', e.target.value)}
                    className='rounded-md'
                  />
                </div>

              </div>

              {/* Navigation Buttons */}
              <div className='flex justify-end'>
                <Button className="h-9 px-4 py-2 cursor-pointer rounded-sm">
                  Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className='lg:col-span-1'>
          <Card className='sticky top-8'>
            <CardHeader>
              <CardTitle className='text-balance'>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              {/* Items */}
              <div className='flex flex-col gap-4'>
                {orderSummary.items.map(item => (
                  <div key={item.id} className='group flex items-center gap-4'>
                    <div className='relative shrink-0'>
                      <img src={item.image} alt={item.name} className='size-16 rounded-lg object-cover shadow-sm border border-border/50' />
                    </div>
                    <div className='min-w-0 flex-1 py-0.5 flex flex-col justify-between min-h-16'>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className='truncate text-sm font-medium'>{item.name}</h4>
                          <p className='text-muted-foreground text-xs mt-0.5'>{item.variant}</p>
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-7 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 focus-visible:opacity-100 focus-visible:translate-x-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 -mt-1 -mr-1'
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className='size-3.5' />
                        </Button>
                      </div>

                      <div className='flex items-center justify-between mt-1'>
                        <div className='flex items-center rounded-sm border border-border/60 bg-background h-7'>
                          <button type="button" aria-label="Decrease quantity" className='flex h-full w-7 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors rounded-l-sm'>
                            <Minus className='size-3' />
                          </button>
                          <span className='w-4 text-center text-xs font-medium tabular-nums'>{item.quantity}</span>
                          <button type="button" aria-label="Increase quantity" className='flex h-full w-7 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors rounded-r-sm'>
                            <Plus className='size-3' />
                          </button>
                        </div>
                        <p className='text-sm font-medium'>${item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
