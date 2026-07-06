'use client'

import { useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function ImageUploader({
  onUpload,
  existingUrls = [],
}: {
  onUpload: (urls: string[]) => void
  existingUrls?: string[]
}) {
  const [urls, setUrls] = useState<string[]>(existingUrls)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        uploadedUrls.push(data.url)
      }

      const newUrls = [...urls, ...uploadedUrls]
      setUrls(newUrls)
      onUpload(newUrls)
      toast.success(`${uploadedUrls.length} image(s) uploadée(s)`)
    } catch (error) {
      toast.error('Échec de l\'upload')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index)
    setUrls(newUrls)
    onUpload(newUrls)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Upload className="mr-2 size-4" />
          {uploading ? 'Upload...' : 'Ajouter des images'}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {urls.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {urls.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-lg border border-border overflow-hidden">
              <img src={url} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {urls.length === 0 && (
        <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="mx-auto mb-2 size-8" />
            <p className="text-sm">Aucune image</p>
          </div>
        </div>
      )}
    </div>
  )
}