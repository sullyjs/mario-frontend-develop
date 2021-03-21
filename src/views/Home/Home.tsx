import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@marioswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import ShroomStats from 'views/Home/components/ShroomStats'
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
  min-height: calc(90vh - 64px);

  ${({ theme }) => theme.mediaQueries.sm} {
    background-image: url('/images/header-bg.png');
    background-size: cover;
    margin-left: -24px;
    margin-right: -24px;
    margin-top: -24px;
    background-position: center center;
      min-height: calc(80vh - 64px);


  }

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/header-bg.png');
    background-size: cover;
    padding-top: 0;
    margin-left: -24px;
    margin-right: -24px;
    margin-top: -32px;
    background-position: center center;

  }
`
    // background-image: url('/images/mario-bg5.png'), url('/images/mario-bg6.png');
    // background-position: left top, right center;
    // background-size: 23% auto;
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
const CustomText = styled(Text)`
  background: rgba(0, 0, 0, 0.2);
  color: white;
  border: solid;
  border-width: 1px;
  border-radius: 30px;
  padding-left:2px;
  padding-right:2px;
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
          
<img src="https://fontmeme.com/permalink/210321/efb74c0a596f5e6a83d13527aae6651a.png" alt="super-mario-font" />
        </CustomHeading>
        <CustomText>{TranslateString(578, 'The fast growing DeFi based on Binance Smart Chain (BSC)')}</CustomText>
      </Hero>
     
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
          <ShroomStats />
          <TotalValueLockedCard />
        </Cards>
    </Page>
  )
}

export default Home
