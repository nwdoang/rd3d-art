"use client"

import * as React from "react"
import { UploadCloud, X, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CustomOrderForm() {
  const [file, setFile] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const validTypes = ["image/jpeg", "image/jpg", "image/png"]

      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        setPreviewUrl(URL.createObjectURL(selectedFile))
      } else {
        alert("Please upload a valid image file (.jpg, .jpeg, .png)")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validation and submission logic goes here
    console.log("Form submitted")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Vision & Identity */}
          <div className="flex flex-col justify-start space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                Bring Your Vision <br className="hidden lg:block" />
                <span className="font-semibold text-primary">To Life</span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
                Every great piece starts with a unique idea. Describe your requirements, select your materials, and upload a reference. We&apos;ll craft a distinctive 3D art piece tailored precisely to your specifications.
              </p>
            </div>

            <div className="hidden lg:block">
              <div className="aspect-square rounded-4xl bg-muted/30 overflow-hidden relative border border-border/50 flex items-center justify-center p-12">
                <div className="text-center space-y-4 opacity-50">
                  <div className="size-24 rounded-full border border-dashed border-primary/40 flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-serif text-primary/60">3D</span>
                  </div>
                  <p className="text-sm font-medium tracking-widest uppercase">Artisanal Crafting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8 bg-card p-8 sm:p-10 rounded-4xl shadow-2xl shadow-black/5 ring-1 ring-border/50">

              <div className="space-y-10">
                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-medium tracking-tight">Contact Information</h2>
                    <p className="text-sm text-muted-foreground">How can we reach you about your order?</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., John Doe"
                      required
                      className="h-9 rounded-md bg-input/20 focus-visible:bg-transparent transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g., john@example.com"
                        required
                        className="h-9 rounded-md bg-input/20 focus-visible:bg-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="e.g., +1 234 567 890"
                        required
                        className="h-9 rounded-md bg-input/20 focus-visible:bg-transparent transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-border/50" />

                {/* Order Specifications */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-medium tracking-tight">Order Specifications</h2>
                    <p className="text-sm text-muted-foreground">Fill out the details below to request your custom piece.</p>
                  </div>

                  {/* Size & Color Row */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="size" className="text-sm font-medium">Size</Label>
                      <Input
                        id="size"
                        name="size"
                        placeholder="e.g., 20x20x30 cm"
                        required
                        className="h-9 rounded-md bg-input/20 focus-visible:bg-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="color" className="text-sm font-medium">Color</Label>
                      <Input
                        id="color"
                        name="color"
                        placeholder="e.g., Matte Black"
                        required
                        className="h-9 rounded-md bg-input/20 focus-visible:bg-transparent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Quantity & Material Row */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        defaultValue="1"
                        required
                        className="h-9 rounded-md bg-input/20 focus-visible:bg-transparent transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="material" className="text-sm font-medium">Material</Label>
                      <Select required name="material">
                        <SelectTrigger id="material" className="h-9 rounded-md bg-input/20 w-full justify-between">
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent className="rounded-md">
                          <SelectItem value="resin">High-Detail Resin</SelectItem>
                          <SelectItem value="pla">PLA Plastic</SelectItem>
                          <SelectItem value="abs">Durable ABS</SelectItem>
                          <SelectItem value="petg">PETG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-3">
                    <Label htmlFor="notes" className="text-sm font-medium">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Describe any specific details, tolerances, or finishing requirements..."
                      className="min-h-[120px] rounded-md bg-input/20 focus-visible:bg-transparent transition-colors resize-y"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Reference Photo</Label>

                    {!previewUrl ? (
                      <label
                        htmlFor="photo-upload"
                        className="group relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/10 p-8 text-center transition-all hover:bg-muted/30 hover:border-primary/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                      >
                        <div className="rounded-full bg-background p-4 shadow-sm ring-1 ring-border/50 group-hover:scale-105 transition-transform duration-300">
                          <UploadCloud className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground">
                            Click to upload <span className="font-normal text-muted-foreground">or drag and drop</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            JPG, JPEG, or PNG (Max 5MB)
                          </p>
                        </div>
                        <input
                          id="photo-upload"
                          name="photo"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          className="sr-only"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <div className="relative overflow-hidden rounded-md border border-border/50 bg-muted/10 p-2">
                        <div className="flex items-center gap-4">
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-md border bg-background flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">
                              {file?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(file?.size ? (file.size / 1024 / 1024).toFixed(2) : "0")} MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={removeFile}
                            className="shrink-0 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="size-4" />
                            <span className="sr-only">Remove file</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-10 rounded-md cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Submit Request
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  )
}
