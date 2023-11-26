import ChartCard from '@/components/ChartCard/ChartCard'

type ChartPageProps = {
  params: {
    id: string
  }
}

export default function SingleChart({ params: { id } }: ChartPageProps) {
  return (
    <div className="h-screen flex items-center">
      <ChartCard chartId={id} />
    </div>
  )
}
