export default function Loading() {
  return (
    <div className="py-12 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded mb-8"/>
      <div className="space-y-4">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-gray-200 rounded"/>
            <div className="h-6 w-48 bg-gray-200 rounded"/>
          </div>
        ))}
      </div>
    </div>
  )
}
