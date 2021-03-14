import BigNumber from 'bignumber.js'
import { getMushroomAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's MUSHROOM balance is at least the amount passed in
 */
const useHasMushroomBalance = (minimumBalance: BigNumber) => {
  const mushroomBalance = useTokenBalance(getMushroomAddress())
  return mushroomBalance.gte(minimumBalance)
}

export default useHasMushroomBalance
