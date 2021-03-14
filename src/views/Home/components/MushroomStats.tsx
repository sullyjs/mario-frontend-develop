import React from 'react'
import { Card, CardBody, Heading, Text } from '@marioswap-libs/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getMushroomAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledMushroomStats = styled(Card)`
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

const MushroomStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getMushroomAddress()))
  const mushroomSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledMushroomStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Mushroom Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total MUSHROOM Supply')}</Text>
          {mushroomSupply && <CardValue fontSize="14px" value={mushroomSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total MUSHROOM Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New MUSHROOM/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={25} />
        </Row>
      </CardBody>
    </StyledMushroomStats>
  )
}

export default MushroomStats
