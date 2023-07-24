import { parseAbi } from 'viem'

/**
 * The id of the current test worker.
 *
 * This is used by the anvil proxy to route requests to the correct anvil instance.
 */
export const pool = Number(process.env.VITEST_POOL_ID ?? 1)

// Test accounts
export const accounts = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
  '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
] as const

export let forkUrl: string
if (process.env.VITE_ANVIL_FORK_URL) forkUrl = process.env.VITE_ANVIL_FORK_URL
else forkUrl = 'https://cloudflare-eth.com'

export let forkBlockNumber: bigint
if (process.env.VITE_ANVIL_BLOCK_NUMBER)
  forkBlockNumber = BigInt(Number(process.env.VITE_ANVIL_BLOCK_NUMBER))
else forkBlockNumber = 16280770n

export let walletConnectProjectId: string
if (process.env.VITE_WC_PROJECT_ID)
  walletConnectProjectId = process.env.VITE_WC_PROJECT_ID
else walletConnectProjectId = 'foobarbaz'

export const typedData = {
  basic: {
    domain: {
      name: 'Ether Mail',
      version: '1',
      chainId: 1,
      verifyingContract: '0x0000000000000000000000000000000000000000',
    },
    types: {
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' },
      ],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
      ],
    },
    message: {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
      },
      contents: 'Hello, Bob!',
    },
  },
  complex: {
    domain: {
      name: 'Ether Mail 🥵',
      version: '1.1.1',
      chainId: 1,
      verifyingContract: '0x0000000000000000000000000000000000000000',
    },
    types: {
      Name: [
        { name: 'first', type: 'string' },
        { name: 'last', type: 'string' },
      ],
      Person: [
        { name: 'name', type: 'Name' },
        { name: 'wallet', type: 'address' },
        { name: 'favoriteColors', type: 'string[3]' },
        { name: 'foo', type: 'uint256' },
        { name: 'age', type: 'uint8' },
        { name: 'isCool', type: 'bool' },
      ],
      Mail: [
        { name: 'timestamp', type: 'uint256' },
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' },
        { name: 'hash', type: 'bytes' },
      ],
    },
    message: {
      timestamp: 1234567890n,
      contents: 'Hello, Bob! 🖤',
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      from: {
        name: {
          first: 'Cow',
          last: 'Burns',
        },
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        age: 69,
        foo: 123123123123123123n,
        favoriteColors: ['red', 'green', 'blue'],
        isCool: false,
      },
      to: {
        name: { first: 'Bob', last: 'Builder' },
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        age: 70,
        foo: 123123123123123123n,
        favoriteColors: ['orange', 'yellow', 'green'],
        isCool: true,
      },
    },
  },
} as const

export const abi = {
  erc20: parseAbi([
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function balanceOf(address account) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function transfer(address recipient, uint256 amount) returns (bool)',
    'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  ]),
  wagmiMintExample: parseAbi([
    'constructor()',
    'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
    'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
    'function approve(address to, uint256 tokenId)',
    'function balanceOf(address owner) view returns (uint256)',
    'function getApproved(uint256 tokenId) view returns (address)',
    'function isApprovedForAll(address owner, address operator) view returns (bool)',
    'function mint()',
    'function name() view returns (string)',
    'function ownerOf(uint256 tokenId) view returns (address)',
    'function safeTransferFrom(address from, address to, uint256 tokenId)',
    'function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)',
    'function setApprovalForAll(address operator, bool approved)',
    'function supportsInterface(bytes4 interfaceId) view returns (bool)',
    'function symbol() view returns (string)',
    'function tokenURI(uint256 tokenId) pure returns (string)',
    'function totalSupply() view returns (uint256)',
    'function transferFrom(address from, address to, uint256 tokenId)',
  ]),
} as const

export const address = {
  wagmiMintExample: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
} as const