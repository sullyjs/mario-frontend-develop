import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getBep20Contract,
  getShroomContract,
  getToadFactoryContract,
  getToadSpecialContract,
  getMarioRabbitContract,
  getProfileContract,
  getIfoContract,
  getLotteryContract,
  getLotteryTicketContract,
  getMasterchefContract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoContract(address, web3), [address, web3])
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

export const useShroom = () => {
  const web3 = useWeb3()
  return useMemo(() => getShroomContract(web3), [web3])
}

export const useToadFactory = () => {
  const web3 = useWeb3()
  return useMemo(() => getToadFactoryContract(web3), [web3])
}

export const useMarioRabbits = () => {
  const web3 = useWeb3()
  return useMemo(() => getMarioRabbitContract(web3), [web3])
}

export const useProfile = () => {
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3), [web3])
}

export const useToadSpecialContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getToadSpecialContract(web3), [web3])
}

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}
