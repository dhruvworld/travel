export default function Loading() {
  return (
    <div className="py-12 max-w-4xl mx-auto animate-pulse">
      <div className="w-full h-96 bg-gray-200 rounded-lg"/>
      <div className="h-10 w-3/4 bg-gray-200 rounded mt-8"/>
      <div className="flex gap-4 mt-4">
        <div className="h-6 w-32 bg-gray-200 rounded"/>
        <div className="h-6 w-24 bg-gray-200 rounded"/>
      </div>
      <div className="h-24 w-full bg-gray-200 rounded mt-6"/>
      <div className="mt-8">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4"/>
        <div className="space-y-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-6 w-full bg-gray-200 rounded"/>
          ))}
        </div>
      </div>
    </div>
  )
}
