import { usePriceShroomBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalShroom = getBalanceNumber(totalRewards)
  const shroomPriceBusd = usePriceShroomBusd()

  return totalShroom * shroomPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
