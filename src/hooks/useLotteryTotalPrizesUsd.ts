import { usePriceMushroomBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalMushroom = getBalanceNumber(totalRewards)
  const mushroomPriceBusd = usePriceMushroomBusd()

  return totalMushroom * mushroomPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
