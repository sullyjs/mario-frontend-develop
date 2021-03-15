import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberShroomToReactivate: new BigNumber(0),
    numberShroomToRegister: new BigNumber(0),
    numberShroomToUpdate: new BigNumber(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberShroomToReactivate, numberShroomToRegister, numberShroomToUpdate] = await makeBatchRequest([
          profileContract.methods.numberShroomToReactivate().call,
          profileContract.methods.numberShroomToRegister().call,
          profileContract.methods.numberShroomToUpdate().call,
        ])

        setCosts({
          numberShroomToReactivate: new BigNumber(numberShroomToReactivate as string),
          numberShroomToRegister: new BigNumber(numberShroomToRegister as string),
          numberShroomToUpdate: new BigNumber(numberShroomToUpdate as string),
        })
      } catch (error) {
        toastError('Error', 'Could not retrieve SHROOM costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
