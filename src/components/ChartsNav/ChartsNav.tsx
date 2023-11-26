import React from 'react'
import Link from 'next/link'

type ChartLinkProps = {
  href: string,
  text: string
}

function ChartLink({ href, text }: ChartLinkProps) {
  return (
    <Link href={href} className="block text-blue underline mb-2">
      {text}
    </Link>
  )
}

export default function ChartsNav() {
  return (
    <nav className="p-10">
      <h1 className="font-bold text-2xl mb-4">Charts</h1>
      <ChartLink href="/charts/1" text="Values in Russia: responses by age group, 2017" />
      <ChartLink href="/charts/2" text="Поколение неверующих?" />
      <ChartLink href="/charts/3" text="How Couples Met" />
    </nav>
  )
}
