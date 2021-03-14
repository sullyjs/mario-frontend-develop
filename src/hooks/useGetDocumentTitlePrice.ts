import { useEffect } from 'react'
import { usePriceMushroomBusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const mushroomPriceUsd = usePriceMushroomBusd()
  useEffect(() => {
    document.title = `MarioSwap - $${Number(mushroomPriceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}`
  })
}
export default useGetDocumentTitlePrice
