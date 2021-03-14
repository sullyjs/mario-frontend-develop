import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@marioswap-libs/uikit'
import PastLotteryRoundViewer from './components/PastLotteryRoundViewer'
import PastDrawsHistoryCard from './components/PastDrawsHistory/PastDrawsHistoryCard'

const Cards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 12;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const SecondCardColumnWrapper = styled.div<{ isAWin?: boolean }>`
  display: flex;
  flex-direction: column;
`

const ToadImageWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: center;
`

const PastDrawsPage: React.FC = () => {
  return (
    <Cards>
      <PastLotteryRoundViewer />
      <SecondCardColumnWrapper>
        <PastDrawsHistoryCard />
        <ToadImageWrapper>
          <img src="/images/mario-lottery.png" alt="lottery toad" />
        </ToadImageWrapper>
      </SecondCardColumnWrapper>
    </Cards>
  )
}

export default PastDrawsPage
