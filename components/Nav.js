import { useRouter } from 'next/router'
import React from 'react'
import requests from '../utils/request'


function Nav() {
    console.log(Object.entries(requests).map((page) => page.map(key => key.URL)))
    const router = useRouter()
    return (
        <nav className="relative">
            <div className="flex px-10
                            text-2xl whitespace-nowrap
                            overflow-x-scroll
                            space-x-10
                            sm:px-20
                            sm:space-x-20
                            scrollbar-hide"
            >
                {/*my method */}
                {/* {Object.entries(request).map((page) => (
                     page.map(item => (
                        <h2>{item.title}</h2>
                     ))
                 ))} */}
                {
                    Object.entries(requests).map(([key, { title, URL }]) => (
                        <h2 className="last:pr-24
                                       cursor-pointer 
                                       transition duration-100
                                       transform hover:scale-125 
                                       hover:text-white
                                       active:text-red-500"
                            key={key}
                            onClick={()=>router.push(`/?genre=${key}`)}
                        >
                            {title}
                        </h2>
                    ))
                }
            </div>
            <div  className="absolute
                             top-0 right-0
                             bg-gradient-to-l
                             from-[#06202A]
                             h-10 w-1/12"
            />
        </nav>
    )
}

export default Nav
