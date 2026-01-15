interface Accounts {
  id: number;
  username: string;
  funds: number;
}

const accounts: Accounts[] = [
  {
    id: 1,
    username: "Omar",
    funds: 30,
  },
  {
    id: 2,
    username: "Zainab",
    funds: 0,
  },
  {
    id: 3,
    username: "Salwa",
    funds: 100,
  },
];

export default Accounts;
export { accounts };
