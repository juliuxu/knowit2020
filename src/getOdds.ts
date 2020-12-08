import fetch from "node-fetch";

type Leaderboard = [number, string[]][]
const main = async () => {
  const res = await fetch('https://julekalender-backend.knowit.no/leaderboard')
  const json: Leaderboard  = await res.json()
  const ticketsPerGroup = json.map(([multiplier, names]) => {
    return names.flatMap(name => [...Array(multiplier).keys()].map(_ => name))
  })
  const allTickets = ticketsPerGroup.flatMap(x => x)
  const myTickets = allTickets.filter(x => x === 'Julian Jark').length

  ticketsPerGroup.forEach((g, i) => console.log(`ticket for group ${ticketsPerGroup.length-i}`, g.length / (ticketsPerGroup.length-i), '->', g.length))
  console.log('total tickets', allTickets.length)

  console.log()
  console.log('my tickets', myTickets)
  console.log('my chance of winning', myTickets / allTickets.length)
  console.log('my chance of winning', `${((myTickets / allTickets.length) * 100).toFixed(2)}%`)
  console.log('my chance of winning', `1:${(allTickets.length / myTickets).toFixed(2)}`)
}
main();