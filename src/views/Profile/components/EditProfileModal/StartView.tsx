import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Button, Flex, Text, InjectedModalProps } from '@marioswap-libs/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getMarioProfileAddress } from 'utils/addressHelpers'
import { useShroom } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import { useProfile } from 'state/hooks'
import useGetProfileCosts from 'views/Profile/hooks/useGetProfileCosts'
import useHasShroomBalance from 'hooks/useHasShroomBalance'
import { UseEditProfileResponse } from './reducer'
import ProfileAvatar from '../ProfileAvatar'

interface StartPageProps extends InjectedModalProps {
  goToChange: UseEditProfileResponse['goToChange']
  goToRemove: UseEditProfileResponse['goToRemove']
  goToApprove: UseEditProfileResponse['goToApprove']
}

const DangerOutline = styled(Button).attrs({ variant: 'secondary' })`
  border-color: ${({ theme }) => theme.colors.failure};
  color: ${({ theme }) => theme.colors.failure};
  margin-bottom: 24px;

  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    border-color: ${({ theme }) => theme.colors.failure};
    opacity: 0.8;
  }
`

const StartPage: React.FC<StartPageProps> = ({ goToApprove, goToChange, goToRemove, onDismiss }) => {
  const [needsApproval, setNeedsApproval] = useState(null)
  const { profile } = useProfile()
  const { numberShroomToUpdate, numberShroomToReactivate } = useGetProfileCosts()
  const hasMinimumShroomRequired = useHasShroomBalance(profile.isActive ? numberShroomToUpdate : numberShroomToReactivate)
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const shroomContract = useShroom()
  const cost = profile.isActive ? numberShroomToUpdate : numberShroomToReactivate

  /**
   * Check if the wallet has the required SHROOM allowance to change their profile pic or reactivate
   * If they don't, we send them to the approval screen first
   */
  useEffect(() => {
    const checkApprovalStatus = async () => {
      const response = await shroomContract.methods.allowance(account, getMarioProfileAddress()).call()
      const currentAllowance = new BigNumber(response)
      setNeedsApproval(currentAllowance.lt(cost))
    }

    if (account) {
      checkApprovalStatus()
    }
  }, [account, cost, setNeedsApproval, shroomContract])

  if (!profile) {
    return null
  }

  return (
    <Flex alignItems="center" justifyContent="center" flexDirection="column">
      <ProfileAvatar profile={profile} />
      <Flex alignItems="center" style={{ height: '48px' }} justifyContent="center">
        <Text as="p" color="failure">
          {!hasMinimumShroomRequired &&
            TranslateString(999, `${getFullDisplayBalance(numberShroomToUpdate)} SHROOM required to change profile pic`)}
        </Text>
      </Flex>
      {profile.isActive ? (
        <>
          <Button
            width="100%"
            mb="8px"
            onClick={needsApproval === true ? goToApprove : goToChange}
            disabled={!hasMinimumShroomRequired || needsApproval === null}
          >
            {TranslateString(999, 'Change Profile Pic')}
          </Button>
          <DangerOutline width="100%" onClick={goToRemove}>
            {TranslateString(999, 'Remove Profile Pic')}
          </DangerOutline>
        </>
      ) : (
        <Button
          width="100%"
          mb="8px"
          onClick={needsApproval === true ? goToApprove : goToChange}
          disabled={!hasMinimumShroomRequired || needsApproval === null}
        >
          {TranslateString(999, 'Reactivate Profile')}
        </Button>
      )}
      <Button variant="text" width="100%" onClick={onDismiss}>
        {TranslateString(999, 'Close Window')}
      </Button>
    </Flex>
  )
}

export default StartPage
