import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Heading, Text } from '@marioswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useMushroom, useToadFactory } from 'hooks/useContract'
import useHasMushroomBalance from 'hooks/useHasMushroomBalance'
import nftList from 'config/constants/nfts'
import SelectionCard from '../components/SelectionCard'
import NextStepButton from '../components/NextStepButton'
import ApproveConfirmButtons from '../components/ApproveConfirmButtons'
import useProfileCreation from './contexts/hook'
import { MINT_COST, STARTER_TOAD_IDS } from './config'

const nfts = nftList.filter((nft) => STARTER_TOAD_IDS.includes(nft.toadId))
const minimumMushroomBalanceToMint = new BigNumber(MINT_COST).multipliedBy(new BigNumber(10).pow(18))

const Mint: React.FC = () => {
  const [toadId, setToadId] = useState(null)
  const { actions, minimumMushroomRequired, allowance } = useProfileCreation()

  const { account } = useWeb3React()
  const mushroomContract = useMushroom()
  const toadFactoryContract = useToadFactory()
  const TranslateString = useI18n()
  const hasMinimumMushroomRequired = useHasMushroomBalance(minimumMushroomBalanceToMint)
  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      // TODO: Move this to a helper, this check will be probably be used many times
      try {
        const response = await mushroomContract.methods.allowance(account, toadFactoryContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gte(minimumMushroomRequired)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return mushroomContract.methods
        .approve(toadFactoryContract.options.address, allowance.toJSON())
        .send({ from: account })
    },
    onConfirm: () => {
      return toadFactoryContract.methods.mintNFT(toadId).send({ from: account })
    },
    onSuccess: () => actions.nextStep(),
  })

  return (
    <>
      <Text fontSize="20px" color="textSubtle" bold>
        {TranslateString(999, `Step ${1}`)}
      </Text>
      <Heading as="h3" size="xl" mb="24px">
        {TranslateString(776, 'Get Starter Collectible')}
      </Heading>
      <Text as="p">{TranslateString(786, 'Every profile starts by making a “starter” collectible (NFT).')}</Text>
      <Text as="p">{TranslateString(788, 'This starter will also become your first profile picture.')}</Text>
      <Text as="p" mb="24px">
        {TranslateString(790, 'You can change your profile pic later if you get another approved Mario Collectible.')}
      </Text>
      <Card mb="24px">
        <CardBody>
          <Heading as="h4" size="lg" mb="8px">
            {TranslateString(792, 'Choose your Starter!')}
          </Heading>
          <Text as="p" color="textSubtle">
            {TranslateString(794, 'Choose wisely: you can only ever make one starter collectible!')}
          </Text>
          <Text as="p" mb="24px" color="textSubtle">
            {TranslateString(999, `Cost: ${MINT_COST} MUSHROOM`, { num: MINT_COST })}
          </Text>
          {nfts.map((nft) => {
            const handleChange = (value: string) => setToadId(parseInt(value, 10))

            return (
              <SelectionCard
                key={nft.toadId}
                name="mintStarter"
                value={nft.toadId}
                image={`/images/nfts/${nft.images.md}`}
                isChecked={toadId === nft.toadId}
                onChange={handleChange}
                disabled={isApproving || isConfirming || isConfirmed || !hasMinimumMushroomRequired}
              >
                <Text bold>{nft.name}</Text>
              </SelectionCard>
            )
          })}
          {!hasMinimumMushroomRequired && (
            <Text color="failure" mb="16px">
              {TranslateString(1098, `A minimum of ${MINT_COST} MUSHROOM is required`)}
            </Text>
          )}
          <ApproveConfirmButtons
            isApproveDisabled={toadId === null || isConfirmed || isConfirming || isApproved}
            isApproving={isApproving}
            isConfirmDisabled={!isApproved || isConfirmed || !hasMinimumMushroomRequired}
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
          />
        </CardBody>
      </Card>
      <NextStepButton onClick={actions.nextStep} disabled={!isConfirmed}>
        {TranslateString(798, 'Next Step')}
      </NextStepButton>
    </>
  )
}

export default Mint