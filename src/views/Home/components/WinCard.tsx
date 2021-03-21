import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@marioswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import useLotteryTotalPrizesUsd from 'hooks/useLotteryTotalPrizesUsd'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
   background-image: url('/images/lottery-card-bg.png');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: auto 80%;



  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const WinCard = () => {
  const lotteryPrize = Math.round(useLotteryTotalPrizesUsd()).toLocaleString()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Lottery with
        </Heading>
        <CardMidContent color="#499DF5">${lotteryPrize}</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            up for grabs
          </Heading>
          <NavLink exact activeClassName="active" to="/lottery" id="lottery-pot-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default WinCard
