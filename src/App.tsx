import { gql, useQuery } from '@apollo/client';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayCEO />
      <Outlet />
    </div>
  );
}

const GET_CEOS = gql`
  query GetCEO {
    company {
      ceo
    }    
  }
`;

function DisplayCEO() {
  const { loading, error, data } = useQuery(GET_CEOS);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error ${error.message}</p>

  return (
    <div>
      <h1>CEO</h1>
      {/* {data.company.map((item:any, index:any) => <p key={index}> {item.ceo} </p>)} */}
      <p>{data.company.ceo}</p>
      <nav style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}>
        <Link to='/launchesPast'>LaunchesPast</Link>
      </nav>
    </div>
  )
}