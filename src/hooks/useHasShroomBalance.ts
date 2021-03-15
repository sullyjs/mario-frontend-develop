import BigNumber from 'bignumber.js'
import { getShroomAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's SHROOM balance is at least the amount passed in
 */
const useHasShroomBalance = (minimumBalance: BigNumber) => {
  const shroomBalance = useTokenBalance(getShroomAddress())
  return shroomBalance.gte(minimumBalance)
}

export default useHasShroomBalance
