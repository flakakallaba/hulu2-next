import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { forwardRef, useState } from "react"



const Thumbnail = forwardRef(({ result }, ref) => {
   
    const BASE_URL = "https://image.tmdb.org/t/p/original/";

    const [count, setCount] = useState(result.vote_count)
    var [hasLiked, setLiked] = useState(false);

    function increaseCount() {
        setCount(prevCount => prevCount + 1);
        setLiked(prevLiked => true)
    }
    function decreaseCount() {
        setCount(prevCount => prevCount - 1)
        setLiked(prevLiked => false)
    }

    return (
        <div className="p-2 group 
                        cursor-pointer 
                        transition 
                        duration-200
                        ease-in transform 
                        sm:hover:scale-105 
                        hover:z-50"
            ref={ref}
        >
            <Image
                layout="responsive"
                src={`${BASE_URL}${result.backdrop_path || result.poster_path}`}
                height={1080}
                width={1920}
            />


            <div className="p-2">
                <p className="truncate max-w-md">{result.overview}</p>

                <h2 className="mt-1 text-2xl
                              text-white 
                              transition-all
                              duration-100 
                              ease-in-out 
                              group-hover:font-bold"
                >
                    {result.title || result.original_name}
                </h2>

                <p className="flex items-center 
                              opacity-0 
                              group-hover:opacity-100">
                    {result.release_date}. {"  "}
                    {hasLiked === false ?
                        (
                            <ThumbUpIcon className="h-5 mx-2" onClick={increaseCount} />
                        )
                        :
                        (
                            <ThumbDownIcon className="h-5 mx-2" onClick={decreaseCount} />
                        )
                    }
                    {count}
                </p>

            </div>
        </div>
    );
}
)
export default Thumbnail;