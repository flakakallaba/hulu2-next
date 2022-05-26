import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { forwardRef, useState, useEffect } from 'react';
import { db } from '../firebase-config';
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    documentId,
    updateDoc,
} from 'firebase/firestore';
import request from '../utils/request';
require('firebase/database');
import { fetchUser } from '../utils/fetchUserDetails';


const Thumbnail = forwardRef(({ result, movie, userActivity }, ref) => {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';

    var [count, setCount] = useState(null);
    var [hasLiked, setLiked] = useState(false);
    

    
    const [user, setUser] = useState([])

    useEffect(() => {
        if (movie) setCount(movie.total_votes);
        else setCount(0);
        if (userActivity) setLiked(userActivity.user_upvote);
        // else setLiked(false);
        const [userInfo] = fetchUser();
    }, [movie]);

    const increaseCount = async (id) => {
        setCount((prevCount) => prevCount + 1);
      
        const [userInfo] = fetchUser();
        setUser(userInfo)
        const docRef = doc(db, 'movies', id);
        const userRef = doc(db, 'userActivity',id);
    
        const upVote = {
            tmdb_id: result.id,
            tmdb_title: result.title || result.original_name,
            total_votes: count + 1,
        };
        // setLiked((prevLiked) => true);
        const activity = {
            user_id: userInfo.uid,
            user_movie_id: id,
            user_upvote: true
        };
        await setDoc(docRef, upVote);
        await setDoc(userRef, activity);
        setLiked((prevLiked) => true);
        
    };
    const decreaseCount = async (id) => {
        setCount((prevCount) => prevCount - 1);
        // setLiked((prevLiked) => false);
        const [userInfo] = fetchUser();
        const docRef = doc(db, 'movies', id);
        const userRef = doc(db, 'userActivity', id);
        // const upVote = {tmdb_id: result.id, tmdb_title: result.title,total_votes: result.vote_count-=1 };
        const upVote = {
            tmdb_id: result.id,
            tmdb_title: result.title || result.original_name,
            total_votes: count - 1,
        };
        const activity = {
            user_id: userInfo.uid,
            user_movie_id: id,
            user_upvote: false
        };
     
        await setDoc(docRef, upVote);
        await setDoc(userRef, activity);
        setLiked((prevLiked) => false);  
    };
    return (
        <div
            className='p-2 group 
                        cursor-pointer 
                        transition 
                        duration-200
                        ease-in transform 
                        sm:hover:scale-105 
                        hover:z-50'
            ref={ref}>
            <Image
                layout='responsive'
                src={`${BASE_URL}${result.backdrop_path || result.poster_path}`}
                height={1080}
                width={1920}
            />
            <div className='p-2'>
                <p className='truncate max-w-md'>{result.overview}</p>
                <h2
                    className='mt-1 text-2xl
                              text-white 
                              transition-all
                              duration-100 
                              ease-in-out 
                              group-hover:font-bold'>
                    {result.title || result.original_name}
                </h2>
                <p
                    className='flex items-center 
                              opacity-0 
                              group-hover:opacity-100'>
                    {result.release_date} {'  '}
                    {hasLiked === false ? (
                        <ThumbUpIcon
                            className='h-5 mx-2'
                            onClick={() => increaseCount(`${result.id}`)}
                        />
                    ) : (
                        <ThumbDownIcon
                            className='h-5 mx-2'
                            onClick={() => decreaseCount(`${result.id}`)}
                        />
                    )}
                    {count === null ? 'loading...' : count}
                </p>
            </div>
        </div>
    );
});
export default Thumbnail;
