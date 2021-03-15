import { useEffect } from 'react'
import { usePriceShroomBusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const shroomPriceUsd = usePriceShroomBusd()
  useEffect(() => {
    document.title = `MarioSwap - $${Number(shroomPriceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}`
  })
}
export default useGetDocumentTitlePrice
