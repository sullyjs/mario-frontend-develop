import React, {useState} from 'react'
import { Button, useWalletModal } from '@marioswap-libs/uikit'
import useAuth from 'hooks/useAuth'
import useI18n from 'hooks/useI18n'
import Countdown from "react-countdown";


const UnlockButton = (props) => {
  const [completion, setCompletion] = useState(false);
  const Completionist = () => <span>{TranslateString(292, 'Unlock Wallet')}</span>;
  const renderer = ({ hours , days, minutes, completed }) => {
    if (completed)
    {
      setCompletion(true)
      }
    return completed?(<Completionist />):(<span>{`${days} Days `}:{` ${hours} Hrs `}:{` ${minutes} Minutes`}</span>)
};
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button disabled={!completion} onClick={onPresentConnectModal} {...props}>
      <Countdown daysInHours renderer={renderer} date={Date.parse('2021-03-28T00:00:00.000+05:30')} />
    </Button>
  )
}

export default UnlockButton
