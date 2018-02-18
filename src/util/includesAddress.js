const includesAddress = (arr, { address }) => {
  return arr.map(({ address }) => { return address }).includes(address)
}

export default includesAddress
