import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getMarioProfileAddress,
  getMarioRabbitsAddress,
  getToadFactoryAddress,
  getToadSpecialAddress,
  getShroomAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/marioProfile.json'
import marioRabbitsAbi from 'config/abi/marioRabbits.json'
import toadFactoryAbi from 'config/abi/toadFactory.json'
import toadSpecialAbi from 'config/abi/toadSpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import shroomAbi from 'config/abi/shroom.json'
import ifoAbi from 'config/abi/ifo.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract(ifoAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getShroomContract = (web3?: Web3) => {
  return getContract(shroomAbi, getShroomAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getMarioProfileAddress(), web3)
}
export const getMarioRabbitContract = (web3?: Web3) => {
  return getContract(marioRabbitsAbi, getMarioRabbitsAddress(), web3)
}
export const getToadFactoryContract = (web3?: Web3) => {
  return getContract(toadFactoryAbi, getToadFactoryAddress(), web3)
}
export const getToadSpecialContract = (web3?: Web3) => {
  return getContract(toadSpecialAbi, getToadSpecialAddress(), web3)
}
export const getLotteryContract = (web3?: Web3) => {
  return getContract(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
