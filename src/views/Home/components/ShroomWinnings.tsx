import React from 'react'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceShroomBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
 }
`
const ShroomWinnings = () => {
  const { claimAmount } = useTotalClaim()
  const shroomAmount = getBalanceNumber(claimAmount)
  const claimAmountBusd = new BigNumber(shroomAmount).multipliedBy(usePriceShroomBusd()).toNumber()

  return (
    <Block>
      <CardValue value={shroomAmount} lineHeight="1.5" />
      <CardBusdValue value={claimAmountBusd} decimals={2} />
    </Block>
  )
}

export default ShroomWinnings
