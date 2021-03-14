import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@marioswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import MushroomStats from 'views/Home/components/MushroomStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'
import TwitterCard from './components/TwitterCard'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/mario-bg-mobile.png'); 
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/mario-bg5.png'), url('/images/mario-bg6.png');
    background-position: left top, right center;
    background-size: 23% auto;
    height: 165px;
    padding-top: 0;    
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`
const CustomHeading = styled(Heading)`
  font-size: 60px;
  color: #8873f6;
font-family: "Super Mario 256"`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <CustomHeading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'MARIOSWAP')}
        </CustomHeading>
        <Text>{TranslateString(578, 'The fast growing DeFi based on Binance Smart Chain (BSC)')}</Text>
      </Hero>
      <div
    //     style={{
    //     backgroundImage: "url('./images/mario-background.png')",
    // backgroundRepeat: "repeat",
    //     backgroundSize: "80px 80px",
    //     backgroundOrigin: "padding-box",
    //     }}
      >
        <Cards>
          <FarmStakingCard />
          {/* <LotteryCard /> */}
          <TwitterCard />
        </Cards>
        <CTACards>
          <EarnAPYCard />
          <EarnAssetCard />
          <WinCard />
        </CTACards>
        <Cards>
          <MushroomStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
