'use client'

import { cn, normalizeImages } from '@/lib/utils'
import type React from 'react'
import { useMemo, useState } from 'react'
import { Edit, Plus, RefreshCw, Save, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ImageUploader } from '@/components/admin/image-uploader'

export type ResourceItem = Record<string, unknown> & { id: string }

type FieldType = 'text' | 'number' | 'boolean' | 'textarea' | 'csv' | 'colors' | 'image'

export type ResourceField = {
  key: string
  label: string
  type?: FieldType
  placeholder?: string
}

export type ResourceColumn = {
  key: string
  label: string
  render?: (item: ResourceItem) => React.ReactNode
}

function apiUrl() {
  return process.env.NEXT_PUBLIC_JSON_SERVER_URL || 'http://localhost:4000'
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}`
}

function fieldToInputValue(value: unknown, type: FieldType) {
  if (type === 'csv' && Array.isArray(value)) {
    return value.join(', ')
  }

  if (type === 'image' && Array.isArray(value)) {
    return value.join(', ')
  }

  if (type === 'colors' && Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'object' && item && 'name' in item && 'hex' in item) {
          const color = item as { name: string; hex: string }
          return `${color.name}:${color.hex}`
        }
        return String(item)
      })
      .join(', ')
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }

  return value == null ? '' : String(value)
}

function parseFieldValue(value: unknown, type: FieldType) {
  if (type === 'number') {
    return Number(value) || 0
  }

  if (type === 'boolean') {
    return value === 'true'
  }

  if (type === 'csv') {
    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  if (type === 'image') {
    if (Array.isArray(value)) {
      return value
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean)
    }

    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  if (type === 'colors') {
    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [name, hex] = item.split(':').map((part) => part.trim())
        return { name, hex: hex || '#111111' }
      })
  }

  return value == null ? '' : String(value)
}

function compactValue(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'object' && item && 'name' in item) {
          return String((item as { name: string }).name)
        }
        return String(item)
      })
      .join(', ')
  }

  if (typeof value === 'boolean') {
    return value ? 'Oui' : 'Non'
  }

  if (typeof value === 'object' && value) {
    return JSON.stringify(value)
  }

  return value == null ? '—' : String(value)
}

export function ResourceManager({
  title,
  description,
  resource,
  idPrefix,
  initialItems,
  columns,
  fields,
}: {
  title: string
  description: string
  resource: string
  idPrefix: string
  initialItems: ResourceItem[]
  columns: ResourceColumn[]
  fields: ResourceField[]
}) {
  const [items, setItems] = useState<ResourceItem[]>(initialItems)
  const [editing, setEditing] = useState<ResourceItem | null>(null)
  const [draft, setDraft] = useState<Record<string, string | string[]>>({})
  const [saving, setSaving] = useState(false)

  const formTitle = editing ? 'Modifier' : 'Ajouter'

  const emptyDraft = useMemo(() => {
    return Object.fromEntries(fields.map((field) => [field.key, '']))
  }, [fields])

  function startCreate() {
    setEditing(null)
    setDraft(emptyDraft)
  }

  function startEdit(item: ResourceItem) {
    setEditing(item)
    setDraft(
      Object.fromEntries(
        fields.map((field) => [
          field.key,
          fieldToInputValue(item[field.key], field.type || 'text'),
        ]),
      ),
    )
  }

  async function refresh() {
    try {
      const response = await fetch(`${apiUrl()}/${resource}`)
      if (!response.ok) throw new Error('Refresh failed')
      const nextItems = (await response.json()) as ResourceItem[]
      setItems(nextItems)
      toast.success('Données synchronisées')
    } catch {
      toast.error('JSON Server est indisponible')
    }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)

    const payload = fields.reduce<ResourceItem>(
      (acc, field) => {
        acc[field.key] = parseFieldValue(draft[field.key] || '', field.type || 'text')
        return acc
      },
      { id: editing?.id || createId(idPrefix) },
    )

    try {
      const response = await fetch(
        editing ? `${apiUrl()}/${resource}/${editing.id}` : `${apiUrl()}/${resource}`,
        {
          method: editing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )

      if (!response.ok) throw new Error('Save failed')

      const saved = (await response.json()) as ResourceItem
      setItems((current) =>
        editing
          ? current.map((item) => (item.id === saved.id ? saved : item))
          : [saved, ...current],
      )
      toast.success(editing ? 'Élément modifié' : 'Élément créé')
      setEditing(null)
      setDraft(emptyDraft)
    } catch {
      setItems((current) =>
        editing
          ? current.map((item) => (item.id === payload.id ? payload : item))
          : [payload, ...current],
      )
      toast.warning('JSON Server indisponible: changement appliqué localement')
      setEditing(null)
      setDraft(emptyDraft)
    } finally {
      setSaving(false)
    }
  }

  async function remove(item: ResourceItem) {
    try {
      const response = await fetch(`${apiUrl()}/${resource}/${item.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Delete failed')
      toast.success('Élément supprimé')
    } catch {
      toast.warning('JSON Server indisponible: suppression locale uniquement')
    }

    setItems((current) => current.filter((entry) => entry.id !== item.id))
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="rounded-lg border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={refresh}>
              <RefreshCw className="size-4" />
              Sync
            </Button>
            <Button onClick={startCreate}>
              <Plus className="size-4" />
              Nouveau
            </Button>
          </div>
        </div>

        <div className="p-3">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render ? column.render(item) : compactValue(item[column.key])}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon-sm" onClick={() => startEdit(item)}>
                        <Edit className="size-4" />
                      </Button>
                      <Button variant="destructive" size="icon-sm" onClick={() => remove(item)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <form onSubmit={save} className="h-fit rounded-lg border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl">{formTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Les champs sont synchronisés avec JSON Server quand il est lancé.
            </p>
          </div>
          {(editing || Object.values(draft).some(Boolean)) && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setEditing(null)
                setDraft(emptyDraft)
              }}
            >
              <X className="size-4" />
            </Button>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {fields.map((field) => {
            const type = field.type || 'text'

            return (
              <div key={field.key} className="flex flex-col gap-2">
                <Label htmlFor={`${resource}-${field.key}`}>{field.label}</Label>
                {type === 'textarea' ? (
                  <Textarea
                    id={`${resource}-${field.key}`}
                    value={draft[field.key] || ''}
                    onChange={(event) =>
                      setDraft((current) => ({ ...current, [field.key]: event.target.value }))
                    }
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : type === 'boolean' ? (
                  <select
                    id={`${resource}-${field.key}`}
                    value={draft[field.key] || 'false'}
                    onChange={(event) =>
                      setDraft((current) => ({ ...current, [field.key]: event.target.value }))
                    }
                    className="h-9 rounded-lg border border-input bg-background px-2.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                  </select>
                ) : type === 'image' ? (
                  <ImageUploader
                    onUpload={(urls) => setDraft((current) => ({ ...current, [field.key]: urls }))}
                    existingUrls={normalizeImages(draft[field.key])}
                  />
                ) : (
                  <Input
                    id={`${resource}-${field.key}`}
                    type={type === 'number' ? 'number' : 'text'}
                    value={draft[field.key] || ''}
                    onChange={(event) =>
                      setDraft((current) => ({ ...current, [field.key]: event.target.value }))
                    }
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            )
          })}
        </div>

        <Button type="submit" className="mt-6 w-full" disabled={saving}>
          <Save className="size-4" />
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </form>
    </div>
  )
}
