import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header.js';
import Nav from '../components/Nav.js';
import Results from '../components/Result.js';
import requests from '../utils/request';

import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from "next/router";



//Client render
export default function Home({ results }) {
  console.log(results)
  const router = useRouter();
  const [user, setUser] = useState({})
  useEffect(() => {
    const accessToken = userAccessToken();
    // console.log(accessToken)   
    if (accessToken === null) {
     
        router.push("/login");

    }
  }, []);
  
  return (
    <div>
      <Head>
        <title>Hulu 2.9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  )
}
//Server side render
export async function getServerSideProps(databaseconn) {
  const genre = databaseconn.query.genre;
  console.log(genre)
  const request = await fetch(
    `
    https://api.themoviedb.org/3${requests[genre]?.URL || requests.fetchTrending.URL
    }`).then((res) => res.json());

  return {
    props: {
      results: request.results,

    },
  };
}