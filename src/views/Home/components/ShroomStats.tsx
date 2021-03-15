import React from 'react'
import { Card, CardBody, Heading, Text } from '@marioswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getShroomAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledShroomStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const ShroomStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getShroomAddress()))
  const shroomSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledShroomStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Shroom Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total SHROOM Supply')}</Text>
          {shroomSupply && <CardValue fontSize="14px" value={shroomSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total SHROOM Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New SHROOM/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={25} />
        </Row>
      </CardBody>
    </StyledShroomStats>
  )
}

export default ShroomStats
