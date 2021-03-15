import { MenuEntry } from '@marioswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://wizardly-leavitt-20ca43.netlify.app',
      },
      {
        label: 'Liquidity',
        href: 'https://wizardly-leavitt-20ca43.netlify.app/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
  },
  {
    label: 'Collectibles',
    icon: 'NftIcon',
    href: '/collectibles',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://marioswap.info',
      },
      {
        label: 'Tokens',
        href: 'https://marioswap.info/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://marioswap.info/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://marioswap.info/accounts',
      },
    ],
  },
  {
    label: 'IFO',
    icon: 'IfoIcon',
    href: '/ifo',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Voting',
        href: 'https://voting.marioswap.finance',
      },
      {
        label: 'Github',
        href: 'https://github.com/marioswap',
      },
      {
        label: 'Docs',
        href: 'https://docs.marioswap.finance',
      },
      {
        label: 'Blog',
        href: 'https://marioswap.medium.com',
      },
    ],
  },
]

export default config
