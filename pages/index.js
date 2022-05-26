import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import requests from '../utils/request';
import { db } from '../firebase-config'
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from "next/router";


import Head from 'next/head';
import Header from '../components/Header.js';
import Nav from '../components/Nav.js';
import Results from '../components/Result.js';





//Client render
export default function Home({ results }) {
  const router = useRouter();
  const [user, setUser] = useState({})
  // second
  const [movies, setMovies] = useState([])//
  const [userActivity, setActivity] = useState([]);

  useEffect(() => {
    const accessToken = userAccessToken();
    // console.log(A)
    if (accessToken === null) {
      router.push("/login");
    }

    const [userInfo] = fetchUser();
    setUser(userInfo)

    const userCollec = collection(db, "userActivity")
    const usersubscribe = onSnapshot(userCollec, (querySnapshot) => {
      setActivity(querySnapshot.docs.map(doc => ({ ...doc.data() })))
    });
    // second
    const collectionRef = collection(db, "movies")
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      setMovies(querySnapshot.docs.map(doc => ({ ...doc.data() })))
    });
    return unsubscribe, usersubscribe;
    //
  }, []);

  return (
    <div>

      <Head>
        <title>Hulu 2.9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} movies={movies} userActivity={userActivity} />


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
      results: request.results
    },
  };
}