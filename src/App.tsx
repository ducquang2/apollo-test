import { Link, Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LaunchesPast from './routes/LaunchesPast';
import Ships from './routes/Ships';

export default function App() {
  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <br />
      <BrowserRouter>
        <ApolloProvider client={client}>
          <DisplayCEO />
          <Routes>
            <Route path='/launchesPast' element={<LaunchesPast />} />
            <Route path='/ships' element={<Ships />} />
          </Routes>
        </ApolloProvider>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
})


const GET_CEOS = gql`
  query GetCEO {
    company {
      ceo
    }    
  }
`;

function DisplayCEO() {
  const { loading, error, data } = useQuery(GET_CEOS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first'
  });

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
        <Link to='/'>Home</Link> | {" "}
        <Link to='/launchesPast'>LaunchesPast</Link> | {" "}
        <Link to='/ships'>Ships</Link>
      </nav>
    </div>
  )
}