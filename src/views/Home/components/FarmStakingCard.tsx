import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@marioswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import ShroomHarvestBalance from './ShroomHarvestBalance'
import ShroomWalletBalance from './ShroomWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/mario-card-bg2.png');
  background-repeat: no-repeat;
  background-position: 120% 0%;
  background-size: auto 80%;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farm & Stake Shrooms to Harvest')}
        </Heading>
        <CardImage src="/images/mario.png" alt="shroom logo" width={64} height={64} />
        <Block>
          <Label>{TranslateString(544, 'SHROOM to Harvest')}:</Label>
          <ShroomHarvestBalance />
        </Block>
        <Block>
          <Label>{TranslateString(546, 'SHROOM in Wallet')}:</Label>
          <ShroomWalletBalance />
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? TranslateString(548, 'Collecting SHROOM')
                : TranslateString(532, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
