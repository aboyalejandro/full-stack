import Image from 'next/image'
import {useRouter} from "next/router"
import React, {useRef, useEffect, useState} from "react"
import XIcon from "@heroicons/react/solid/XIcon"
import {MicrophoneIcon} from "@heroicons/react/solid"
import {SearchIcon} from "@heroicons/react/outline"
import Avatar from "../components/Avatar"
import HeaderOptions from "../components/HeaderOptions"

function Header() {
    const router = useRouter();
    const searchInputRef = useRef(null)

    const search = (e) => {
        e.preventDefault();
        const term = searchInputRef.current.value;
    
        //console.log(term)
    
        if (!term) return;
    
        router.push(`/search?term=${term}`);
    
      }

    return (
        <header className="sticky top-0 bg-white">
            <div className="flex w-full p-6 items-center">
                <Image
                    src="https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                    height={40}
                    width={120}
                    className="cursor-pointer"
                    onClick={() => router.push("/")}
                />
                <form className="flex flex-grow px-6 
                py-3 ml-10 mr-5 border border-gray-200 
                rounded-full shadow-lg max-w-3xl items-center">
                    <input 
                        ref={searchInputRef}
                        type="text"
                        defaultValue={router.query.term}
                        className="flex-grow w-full focus:outline-none"
                    />
                    <XIcon 
                        className="h-7 sm:mr-3 cursor-pointer 
                        text-gray-500 transition duration-100 
                        transform hover:scale-125"
                        onClick={() => {searchInputRef.current.value = ""}}
                    />
                    <MicrophoneIcon className="text-blue-500 border-l-2 pl-4 border-gray-300 h-6 mr-3 hidden sm:inline-flex"/>   
                    <SearchIcon className="text-blue-500 hidden sm:inline-flex h-6"/>
                    <button 
                        hidden
                        type="submit"
                        onClick={search}
                    >
                        Search
                    </button>
                </form>
                <Avatar
                    className="ml-auto"
                    url="https://coaching.papareact.com/ai9"
                />
            </div> 
            <HeaderOptions/>
        </header>
    )
}

export default Header
