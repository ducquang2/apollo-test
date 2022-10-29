import { gql, useQuery } from "@apollo/client"

export default function LaunchesPast() {
  return (
    <div>
      <h2>LaunchesPast</h2>
      <DisplayLaunchesPast />
    </div>
  )
}

const GET_LAUNCHESPAST = gql`
  query GetLaunchesPast {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
    }
  }
`

function DisplayLaunchesPast() {
  const { loading, error, data } = useQuery(GET_LAUNCHESPAST);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: ${error.message}</p>

  return (
    <div>
      <ul>
        {/* <p>Misstion name:</p> */}
        {data.launchesPast.map((item: any, index: any) =>
          <li key={index}>
            <p><b>Misson name:</b> {item.mission_name}</p>
            <p><b>Launch date local:</b> {item.launch_date_local}</p>
            <p><b>Launch site name:</b> {item.launch_site.site_name_long}</p> 
            <p><b>See more at:</b> <a href={item.links.article_link}>article</a> <a href={item.links.video_link}>video</a></p>
          </li>)}
      </ul>
    </div>
  )
}