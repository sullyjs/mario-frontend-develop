import React, { useState, useCallback } from 'react'
import { FallingToads, FallingToadsProps, useKonamiCheatCode } from '@marioswap-libs/uikit'

const EasterEgg: React.FC<FallingToadsProps> = (props) => {
  const [show, setShow] = useState(false)
  const startFalling = useCallback(() => setShow(true), [setShow])
  useKonamiCheatCode(startFalling)

  if (show) {
    return (
      <div onAnimationEnd={() => setShow(false)}>
        <FallingToads {...props} />
      </div>
    )
  }
  return null
}

export default EasterEgg
