'use client'
import Papa from 'papaparse'
import { useState } from 'react'

import { UserAuth } from '@/context/AuthContext'
import chartDataService from '@/services/chartsDataService'

import BarChart from '@/components/Charts/BarChart/BarChart'

type ParseResult = {
  data: string[][]
  errors: unknown[]
  meta: any
}

export default function UploadPage() {
  const [fileData, setFileData] = useState<string[][] | null>(null)
  const [isValid, setIsValid] = useState(false)
  const [chartData, setChartData] = useState<any>(null)

  const handleFileUpload = (e: any) => {
    Papa.parse(e.target.files[0], {
      complete: (result: ParseResult) => {
        const filtered = result.data.filter((row) => row.length > 1)
        setFileData(filtered)
      },
    })
  }

  const transformData = (data: string[][]) => {
    const fieldNames = data[0].slice(1)

    const transformedData: any = []

    for (let i = 1; i < data.length; i++) {
      const rowData = data[i]
      const dataObject: any = {
        title: rowData[0],
      }

      fieldNames.forEach((fieldName, index) => {
        const dataKey = fieldName.toLowerCase().replace(/[\s]+/g, '_')
        const value = rowData[index + 1]
        dataObject[dataKey] = value
      })

      transformedData.push(dataObject)
    }
    return transformedData
  }

  const handleSubmit = (e: any) => {
    chartDataService.addChartData(chartData)
  }

  const handlePreview = (e: any) => {
    e.preventDefault()
    const { title, notes, type, unitsAxis, unitsChart, domainMin, domainMax } = e.target.elements
    const data = {
      title: title.value,
      notes: notes.value,
      type: type.value,
      fields:
        fileData &&
        fileData[0].slice(1).map((field: string, index: number) => {
          return {
            title: field,
            color: e.target.elements[`color-${index + 1}`].value,
            dataKey: field.toLowerCase().replace(/[\s]+/g, '_'),
          }
        }),
      data: fileData && transformData(fileData),
      units: {
        axis: unitsAxis.value || null,
        data: unitsChart.value || null
      },
      domain: {
        min: domainMin.value || 'auto',
        max: domainMax.value || 'auto'
      }
    }
    setChartData(data)
    setIsValid(true)
  }

  const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  const renderTableHead = (rows: string[][]) => {
    return (
      <thead>
        <tr>
          {rows[0].map((cell: string, index: number) => {
            return (
              <th key={`h-${cell}`} className="border p-2">
                {cell}{' '}
                {index !== 0 && (
                  <input
                    type="color"
                    name={`color-${index}`}
                    className="bg-none w-6 h-6"
                    defaultValue={getRandomHexColor()}
                  />
                )}{' '}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }

  const renderTableBody = (rows: string[][]) => {
    return (
      <tbody>
        {rows.slice(1).map((row: string[], index: number) => {
          return (
            <tr key={`r-${index}`}>
              {row.map((cell: string) => {
                return (
                  <td key={`${index}-${cell}`} className="border p-2">
                    {cell}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }

  return (
    <>
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new chart
          </h2>
          <form action="#" onSubmit={handlePreview}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file"
                >
                  Upload CSV
                </label>
                <input
                  required
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-900 border border-gray-300 p-1.5 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file"
                  accept=".csv"
                  type="file"
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chart Type
                </label>
                <select
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line" disabled>
                    Line Chart
                  </option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Chart title"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="notes"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Chart notes (optional)"
                ></textarea>
              </div>
                <div className="">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Domain
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      name="domainMin"
                      id="domainMin"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0"
                    />
                    —
                    <input
                      type="text"
                      name="domainMax"
                      id="domainMax"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="100"
                    />
                  </div>
                </div>
                <div className="">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Units
                </label>
                <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="unitsAxis"
                  id="unitsAxis"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Axis"
                />
                <input
                  type="text"
                  name="unitsChart"
                  id="unitsChart"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="On chart"
                />
                </div>
              </div>
            </div>
            {fileData && (
              <div className='mt-8'>
              <h2 className='block mb-2 text-md font-medium text-gray-900 dark:text-white'>Data</h2>
              <table className="mx-auto w-full lg:py-16 text-left ">
                {renderTableHead(fileData)}
                {renderTableBody(fileData)}
              </table>
              </div>
            )}
            <button
              type="submit"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Preview
            </button>
            <button
              disabled={!isValid}
              onClick={handleSubmit}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center disabled:opacity-50 text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Add chart
            </button>


          </form>
        </div>
      </section>
      <div className="w-3/4 m-auto overflow-hidden p-2">
        {chartData && <BarChart data={chartData} />}
      </div>
    </>
  )
}
