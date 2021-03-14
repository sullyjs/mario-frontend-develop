import { useWeb3React } from '@web3-react/core'
import { useEffect, useReducer } from 'react'
import { getMarioRabbitContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'

const marioRabbitsContract = getMarioRabbitContract()

export type NftMap = {
  [key: number]: {
    tokenUri: string
    tokenIds: number[]
  }
}

type Action = { type: 'set_nfts'; data: NftMap } | { type: 'reset' } | { type: 'refresh'; timestamp: number }

type State = {
  isLoading: boolean
  nfts: NftMap
  lastUpdated: number
}

const initialState: State = {
  isLoading: true,
  nfts: {},
  lastUpdated: Date.now(),
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_nfts':
      return {
        ...initialState,
        isLoading: false,
        nfts: action.data,
      }
    case 'refresh':
      return {
        ...initialState,
        lastUpdated: action.timestamp,
      }
    case 'reset':
      return {
        ...initialState,
        isLoading: false,
      }
    default:
      return state
  }
}

const useGetWalletNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWeb3React()
  const { lastUpdated } = state

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await marioRabbitsContract.methods.balanceOf(account).call()

        if (balanceOf > 0) {
          let nfts: NftMap = {}

          const getTokenIdAndToadId = async (index: number) => {
            try {
              const { tokenOfOwnerByIndex, getToadId, tokenURI } = marioRabbitsContract.methods
              const tokenId = await tokenOfOwnerByIndex(account, index).call()
              const [toadId, tokenUri] = await makeBatchRequest([getToadId(tokenId).call, tokenURI(tokenId).call])

              return [Number(toadId), Number(tokenId), tokenUri]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenIdAndToadId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)

          nfts = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [toadId, tokenId, tokenUri] = association

            return {
              ...accum,
              [toadId]: {
                tokenUri,
                tokenIds: accum[toadId] ? [...accum[toadId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, lastUpdated, dispatch])

  const refresh = () => dispatch({ type: 'refresh', timestamp: Date.now() })

  return { ...state, refresh }
}

export default useGetWalletNfts
