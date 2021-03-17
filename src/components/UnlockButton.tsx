import React from 'react'
import { Button, useWalletModal } from '@marioswap-libs/uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'
import Countdown from "react-countdown";


const UnlockButton = (props) => {
  const Completionist = () => <span>{TranslateString(292, 'Unlock Wallet')}</span>;

  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      <Countdown daysInHours date={Date.parse('2021-03-20T00:00:00.000+05:30')}>
      <Completionist />
    </Countdown>
    </Button>
  )
}

export default UnlockButton
