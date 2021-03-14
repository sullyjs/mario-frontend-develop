import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberMushroomToReactivate: new BigNumber(0),
    numberMushroomToRegister: new BigNumber(0),
    numberMushroomToUpdate: new BigNumber(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberMushroomToReactivate, numberMushroomToRegister, numberMushroomToUpdate] = await makeBatchRequest([
          profileContract.methods.numberMushroomToReactivate().call,
          profileContract.methods.numberMushroomToRegister().call,
          profileContract.methods.numberMushroomToUpdate().call,
        ])

        setCosts({
          numberMushroomToReactivate: new BigNumber(numberMushroomToReactivate as string),
          numberMushroomToRegister: new BigNumber(numberMushroomToRegister as string),
          numberMushroomToUpdate: new BigNumber(numberMushroomToUpdate as string),
        })
      } catch (error) {
        toastError('Error', 'Could not retrieve MUSHROOM costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
