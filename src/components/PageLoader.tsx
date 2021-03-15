import React from 'react'
import styled from 'styled-components'
// import { Spinner } from '@marioswap-libs/uikit'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
    <img src="/images/mario-running.gif" alt="Loading.." width="128px" />
    </Wrapper>
  )
}

export default PageLoader
