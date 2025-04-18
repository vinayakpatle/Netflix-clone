
const WatchPageSkeleton = () => {

  return (
    <div className="animate-pulse">
        <div className="bg-gray-700 w-40 h-6 rounded-md mb-4 shimmer" />
        <div className="bg-gray-700 rounded-md h-96 w-full mb-4 shimmer"/>
        <div className="bg-gray-700 rounded-md h-6 w-3/4 mb-2 shimmer"/>
        <div className="bg-gray-700 rounded-md h-6 w-1/2 mb-4 shimmer"/>
        <div className="bg-gray-700 rounded-md h-24 w-full shimmer"/>
    </div>
  )
}

export default WatchPageSkeleton