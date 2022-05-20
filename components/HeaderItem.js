import React from 'react'

function HeaderItem({ Icon, title }) {
    return (
        <div className="flex flex-col
                        cursor-pointer 
                        items-center 
                        group w-12 
                        hover:text-white
                        sm:w-20"
        >
            <Icon className="h-8 mb-1 
                             group-hover:animate-bounce"
            />

            {/* This when we hover paragraph, will show the text */}
            {/* <p className=:"opacity-0 hover:opacity-100 tracking-widest">{title}</p> */}

            {/* When we hover the parent of this, so the div, the text will show */}
            <p className="opacity-0 
                          group-hover:opacity-100 
                          tracking-widest"
            >
                {title}
            </p>
        </div>
    )
}

export default HeaderItem


