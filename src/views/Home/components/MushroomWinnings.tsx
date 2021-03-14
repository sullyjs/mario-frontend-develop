import React from 'react'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceMushroomBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
 }
`
const MushroomWinnings = () => {
  const { claimAmount } = useTotalClaim()
  const mushroomAmount = getBalanceNumber(claimAmount)
  const claimAmountBusd = new BigNumber(mushroomAmount).multipliedBy(usePriceMushroomBusd()).toNumber()

  return (
    <Block>
      <CardValue value={mushroomAmount} lineHeight="1.5" />
      <CardBusdValue value={claimAmountBusd} decimals={2} />
    </Block>
  )
}

export default MushroomWinnings
