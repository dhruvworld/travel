'use client'

import { useState } from 'react'
import { Package } from '@prisma/client'
import { toast } from 'react-hot-toast'

export function FeaturedPackagesForm({ packages }: { packages: Package[] }) {
  const [selected, setSelected] = useState<string[]>(
    packages.filter(p => p.isActive).map(p => p.id)
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selected.length > 3) {
      toast.error('Please select up to 3 packages only')
      return
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/featured-packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageIds: selected })
      })
      
      // Show rate limit info
      const remaining = res.headers.get('X-RateLimit-Remaining')
      const reset = res.headers.get('X-RateLimit-Reset')
      
      if (res.status === 429) {
        toast.error(`Rate limit exceeded. Try again after ${new Date(reset || '').toLocaleTimeString()}`)
        return
      }
      
      if (!res.ok) throw new Error('Failed to update')
      
      toast.success(`Updated successfully! ${remaining} requests remaining`)
    } catch (error) {
      toast.error('Failed to update featured packages')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">Select up to 3 packages to feature</p>
      {packages.map(pkg => (
        <label key={pkg.id} className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={selected.includes(pkg.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelected([...selected, pkg.id])
              } else {
                setSelected(selected.filter(id => id !== pkg.id))
              }
            }}
            className="h-5 w-5"
          />
          <span>{pkg.name}</span>
        </label>
      ))}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
