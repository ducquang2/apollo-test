import { gql, useQuery } from "@apollo/client"

export default function Ships() {
  return (
    <div>
      <h2>Ships</h2>
      <DisplayShips />
    </div>
  )
}

const GET_SHIPS = gql`
  query GetShips {
    launchesPast(limit: 10) {
      mission_name
      ships {
        name
        home_port
        image
      }
    }
  }
`

function DisplayShips() {
  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading) return <p>Loading ...</p>
  if (error) return <p>Error: ${error.message}</p>

  return (
    <div>
      <ul>
        {data.launchesPast.map((item: any, index: any) =>
          <li key={index}>
            <p><b>Misson name:</b> {item.mission_name}</p>
            <p><b>Ships:</b></p>
            <ul>{item.ships.map((ship: any, idx: any) =>
              <li key={idx}>
                <p>{ship.name}</p>
                <p>{ship.home_port}</p>
                <img style={{width: "500px"}} src={ship.image} alt={ship.home_port} />
              </li>
            )}</ul>
          </li>
        )}
      </ul>
    </div>
  )
}