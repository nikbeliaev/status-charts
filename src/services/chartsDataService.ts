import { ref, get, set, push, child } from 'firebase/database'
import { toast } from 'react-toastify'

import { db } from '@/utils/firebase'
import { handleError, ERROR_MESSAGES } from '@/utils/errorHandling'

import { ChartData } from '@/types/ChartData'

const chartDataService = {
  getChartData: async (chartId: string): Promise<any> => {
    try {
      const id = chartId
      const dbRef = ref(db)
      const snapshot = await get(child(dbRef, 'charts/' + id))

      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        throw new Error(ERROR_MESSAGES.getChartData)
      }
    }
    catch {(e: unknown) => {
        handleError(e)
    }}
  },


  getAllCharts: async (): Promise<object[] | undefined> => {
    try {
      const dbRef = ref(db)
      const snapshot = await get(child(dbRef, 'charts/'))

      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        throw new Error(ERROR_MESSAGES.getChartData)
      }
    } catch {(e: unknown) => {
      handleError(e)
    }}
  },


  addChartData: (chartData: object): void => {
    const dbRef = ref(db)
    const newPostRef = push(child(dbRef, 'charts'));
    set(newPostRef, chartData)
    .then(() => {
      toast.success("New chart added")
    })
    .catch((error) => {
      handleError(error)
    });
  }
}

export default chartDataService
