import { ref, get, child } from 'firebase/database'

import { db } from '@/utils/firebase'
import { handleError, ERROR_MESSAGES } from '@/utils/errorHandling'

import { ChartData } from '@/types/ChartData'

const chartDataService = {
  getChartData: async (chartId: string): Promise<ChartData | undefined> => {
    const id = Number(chartId) - 1
    const dbRef = ref(db)

    try {
      const snapshot = await get(child(dbRef, 'charts/' + id))
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        throw new Error(ERROR_MESSAGES.getChartData)
      }
    } catch (e: unknown) {
      handleError(e)
    }
  },
}

export default chartDataService
