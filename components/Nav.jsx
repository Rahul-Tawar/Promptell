'use client'

import Link from "next/link"
import Image from "next/image"
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

  const {data: session} = useSession()
  const [toggleDropDown, setToggleDropDown] = useState(true)
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  },[])

  
  return (
    <nav className="w-[80vw] mb-16 flex justify-between pt-4">
      <Link href='/' className="flex gap-2 flex-center">
        <Image
           src='/assets/images/logo.svg'
           width={30}
           height={30}
           className="object-contain"
           alt="profile"
        />
      <p className="logo-text flex justify-center">Promptell</p>
      </Link>

    {/* desktop navigation */}
    <div className="sm:flex hidden">
    {session?.user? (
      <div className="flex gap-6 items-center justify-center">
        <Link href='/create-prompts' className="btn-grad">
          Create Prompt
        </Link>
        <button 
          type="button" 
          onClick={() => {
            setToggleDropDown(true)
            signOut()
          }}
          className="outline_btn">
            Sign Out
        </button>
        <Link href='/profile'>
          <Image
            src={session?.user.image}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
          />
        </Link>
      </div>
    ):(<>
        {providers && 
          Object.values(providers).map(provider => (
            <button
              type="button"
              key={provider.name}
              onClick={() => {
                signIn(provider.id)
              }}
              className="outline_btn"
            >
                Sign In
            </button>
          ))
           
          }
      </>)}

    </div>
          
    {/* mobile navigation */}
    <div className="sm:hidden flex gap-2 relative">
      {session?.user?(
        <div>
         <Image
            src={session?.user.image}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
            onClick={() => {setToggleDropDown(prev => {
              !prev
            })}}
          />
          {toggleDropDown && (
            <div className="dropdown">
              <Link
                href='/profile'
                className="dropdown_link"
                onClick={() => setToggleDropDown(false)}
              >
                My Profile
              </Link>
              <Link
                href='/profile'
                className="bg-[pink_gradient] dropdown_link"
                onClick={() => setToggleDropDown(false)}
              >
                Create Prompt
              </Link>
              <Link
                href='/profile'
                className="dropdown_link"
                onClick={() => setToggleDropDown(false)}
              >
                <button 
                  className="black_btn"
                  type="button"
                  onClick={() => {
                      setToggleDropDown(false)
                      signOut()
                  }}
                  >
                  Sign Out  
                </button>
              </Link>
            </div>
          )}
        </div>
      ):(
        <>
         {providers && 
          Object.values(providers).map((provider) => {
            <button
            type="button"
            key={provider.name}
            onClick={() => {
              signIn(provider.id)
            }}
            className="outline_btn"
          >
              Sign In
          </button>
          })
           
          }
        </>
      )}
    </div>

    </nav>
  )
}

export default Nav
