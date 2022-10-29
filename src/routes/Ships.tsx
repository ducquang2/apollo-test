import { gql } from "@apollo/client"

export default function Ships() {
  return (
    <div>
      <h2>Ships</h2>
    </div>
  )
}

const GET_SHIPS = gql`
  query GetShips {
    launchesPast(limit: 10) {
      ships {
        name
        home_port
        image
      }
    }
  }
`