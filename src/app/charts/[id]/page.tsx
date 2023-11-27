import ChartCard from '@/components/ChartCard/ChartCard'

type ChartPageProps = {
  params: {
    id: string
  }
}

export default function SingleChart({ params: { id } }: ChartPageProps) {
  return (
    <div className="h-full min-h-screen p-10 flex items-center">
      <ChartCard chartId={id} />
    </div>
  )
}
