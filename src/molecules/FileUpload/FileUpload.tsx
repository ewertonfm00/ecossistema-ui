import React, { useRef, useState } from 'react'
import { Upload, X, File as FileIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FileUploadProps {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
  className?: string
}

interface FileEntry {
  file: File
  preview?: string
  error?: string
}

function validateFile(file: File, accept?: string, maxSize?: number): string | null {
  if (accept) {
    const accepted = accept.split(',').map(t => t.trim())
    const matches = accepted.some(t => {
      if (t.endsWith('/*')) return file.type.startsWith(t.replace('/*', '/'))
      return file.type === t || file.name.endsWith(t.replace('*', ''))
    })
    if (!matches) return 'Tipo não permitido'
  }
  if (maxSize !== undefined && file.size > maxSize) {
    return `Arquivo muito grande (máx ${Math.round(maxSize / 1024 / 1024)}MB)`
  }
  return null
}

export function FileUpload({
  onFiles,
  accept,
  multiple = true,
  maxSize,
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [entries, setEntries] = useState<FileEntry[]>([])

  function processFiles(fileList: FileList) {
    const newEntries: FileEntry[] = []
    const validFiles: File[] = []

    Array.from(fileList).forEach(file => {
      const error = validateFile(file, accept, maxSize)
      const entry: FileEntry = { file, error: error ?? undefined }

      if (!error && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = e => {
          setEntries(prev =>
            prev.map(en => (en.file === file ? { ...en, preview: e.target?.result as string } : en)),
          )
        }
        reader.readAsDataURL(file)
      }

      newEntries.push(entry)
      if (!error) validFiles.push(file)
    })

    setEntries(prev => [...prev, ...newEntries])
    if (validFiles.length > 0) onFiles(validFiles)
  }

  function removeEntry(index: number) {
    setEntries(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div role="region" aria-label="Área de upload de arquivo" className={cn('w-full', className)}>
      <div
        onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => {
          e.preventDefault()
          setIsDragging(false)
          processFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer',
          isDragging ? 'border-primary-500 bg-primary-50' : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50',
        )}
      >
        <Upload className="h-8 w-8 text-neutral-400" />
        <p className="text-sm text-neutral-600 text-center">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        {accept && (
          <p className="text-xs text-neutral-400">Formatos aceitos: {accept}</p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={e => { if (e.target.files) processFiles(e.target.files) }}
      />

      {entries.length > 0 && (
        <ul className="mt-3 space-y-2">
          {entries.map((entry, i) => (
            <li
              key={i}
              className={cn(
                'flex items-center gap-3 rounded-md border p-3',
                entry.error ? 'border-red-200 bg-red-50' : 'border-neutral-200 bg-white',
              )}
            >
              {entry.preview ? (
                <img src={entry.preview} alt={entry.file.name} className="h-10 w-10 rounded object-cover" />
              ) : (
                <FileIcon className="h-8 w-8 shrink-0 text-neutral-400" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-700">{entry.file.name}</p>
                {entry.error && (
                  <p className="text-xs text-red-600">{entry.error}</p>
                )}
              </div>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); removeEntry(i) }}
                aria-label={`Remover ${entry.file.name}`}
                className="shrink-0 rounded p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
