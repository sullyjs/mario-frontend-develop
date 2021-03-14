import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@marioswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { calculateMushroomEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  mushroomPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  mushroomPrice,
  apy,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()
  const farmApy = apy.times(new BigNumber(100)).toNumber()
  const oneThousandDollarsWorthOfMushroom = 1000 / mushroomPrice.toNumber()

  const mushroomEarnedPerThousand1D = calculateMushroomEarnedPerThousandDollars({ numberOfDays: 1, farmApy, mushroomPrice })
  const mushroomEarnedPerThousand7D = calculateMushroomEarnedPerThousandDollars({ numberOfDays: 7, farmApy, mushroomPrice })
  const mushroomEarnedPerThousand30D = calculateMushroomEarnedPerThousandDollars({ numberOfDays: 30, farmApy, mushroomPrice })
  const mushroomEarnedPerThousand365D = calculateMushroomEarnedPerThousandDollars({ numberOfDays: 365, farmApy, mushroomPrice })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(860, 'Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(858, 'ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(864, 'MUSHROOM per $1000')}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: mushroomEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfMushroom })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{mushroomEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: mushroomEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfMushroom })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{mushroomEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: mushroomEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfMushroom })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{mushroomEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: mushroomEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfMushroom })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{mushroomEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {TranslateString(
          866,
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
      <Flex justifyContent="center">
        <LinkExternal href={addLiquidityUrl}>
          {TranslateString(999, 'Get')} {lpLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
