import React, { useState } from 'react'
import Image from 'next/image'
import HeaderItem from './HeaderItem'
import {
    BadgeCheckIcon,
    CollectionIcon,
    HomeIcon,
    LightningBoltIcon,
    SearchIcon,
    UserIcon,
    LogoutIcon
} from '@heroicons/react/outline'
import { useRouter } from "next/router";

function Header() {

    const router = useRouter();
    function signOut ()  {
        localStorage.clear();
        router.push("/login")
    }
    return (
        <header className="flex flex-col 
                            items-center 
                            m-5 justify-between
                            sm:flex-row"
        >
            <div className="flex flex-grow
                            justify-evenly
                            max-w-2xl"
            >
                <HeaderItem title="HOME" Icon={HomeIcon} />
                <HeaderItem title="TRENDING" Icon={LightningBoltIcon} />
                <HeaderItem title="VERIFIED" Icon={BadgeCheckIcon} />
                <HeaderItem title="COLLECTIONS" Icon={CollectionIcon} />
                <HeaderItem title="SEARCH" Icon={SearchIcon} />
                <HeaderItem title="ACCOUNT" Icon={UserIcon} />
                <button onClick={signOut}><HeaderItem title='LOG OUT' Icon={LogoutIcon}  /></button>

            </div>


            {/* This is a nexxt js Image aand by default would be lazy loading */}
            <Image
                className='object-contain'
                src='https://links.papareact.com/ua6'
                width={200}
                height={100}
            />
        </header>
    )
}

export default Header
