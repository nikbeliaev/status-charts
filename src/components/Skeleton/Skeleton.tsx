export function TitleSkeleton() {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700 w-72"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function NotesSkeleton() {
  return (
    <div role="status" className="animate-pulse px-4 mb-8">
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-3"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function LegendSkeleton() {
  return (
    <div role="status" className="flex w-full animate-pulse px-4 mb-8">
      <div className="flex">
        <span className="h-4 w-4 bg-gray-200 rounded-full dark:bg-gray-700"></span>
        <span className="h-4 w-64 bg-gray-200 rounded-full dark:bg-gray-700 ml-2.5"></span>
      </div>
      <div className="flex ml-6">
        <span className="h-4 w-4 bg-gray-200 rounded-full dark:bg-gray-700"></span>
        <span className="h-4 w-64 bg-gray-200 rounded-full dark:bg-gray-700 ml-2.5"></span>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div
      role="status"
      className="flex items-center justify-center w-[calc(100%-2rem)] m-auto mb-4 aspect-[3/1] px-4 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700"
    >
      <div className="flex items-baseline w-full mt-6 px-16 pt-8"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function NavSkeleton() {
  return (
    <div role="status" className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[250px] mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[320px] mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[350px] mb-3"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
