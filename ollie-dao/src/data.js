let daos = [
  {
    name: "Ollie's Audition Tapes",
    members: 7024,
    funds: "500 ETH",
    created: "12/01/2022",
  },
  {
    name: "Ollie's Rehearsal",
    members: 2440,
    funds: "10 ETH",
    created: "10/31/2021",
  },
  {
    name: "Red Eye",
    members: 20,
    funds: "2 ETH",
    created: "07/22/2021",
  },
  {
    name: "Ape King",
    members: 10,
    funds: "1 ETH",
    created: "09/01/2021",
  },
];

export function getDaosData() {
  return daos;
}

export function getDao(members) {
  return daos.find((dao) => dao.members === members);
}
