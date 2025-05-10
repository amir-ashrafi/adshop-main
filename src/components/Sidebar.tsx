"use client"
import React from 'react'
import { useState } from 'react'
import { Button } from './ui'
import Link from 'next/link'
import { Menu } from 'lucide-react';
import { LayoutDashboard ,UserRound,ShoppingCart,ListOrdered,Settings} from 'lucide-react';
const Sidebar = () => {
  const [showBox,setShowBox] = useState(false)
  function onclick(){
    setShowBox(!showBox)
  }
  const data = [
    {
      id:0,
      name:"Dashboard",
      url:'/dashboard',
      icon:<LayoutDashboard />
    },
    {
      id:1,
      name:"Users",
      url:'/dashboard/usersManagement',
      icon:<UserRound />
    },
    {
      id:2,
      name:"Products",
      url:"/dashboard/products",
      icon:<ShoppingCart />
    },
    {
      id:3,
      name:"Orders",
      url:"/dashboard/orders",
      icon: <ListOrdered />
    },
    {
      id:4,
      name:"Settings",
      url:"/dashboard/settings",
      icon:<Settings />
    }
  ]
  return (
    <>
    <div className='relative flex justify-center'>

    
        <Button onClick={onclick} variant="outline" className="flex fixed top-6 p-2 md:p-4 ml-16 z-50"><Menu /></Button>
        {showBox && 
        <div onClick={onclick} className="w-full fixed top-0 min-h-screen  bg-black/30 z-10 flex items-center justify-center">
          <div className="absolute bg-slate-100  flex-col rounded-2xl w-48 md:w-60 lg:w-80">
            {data.map(item =>(
              <Button variant="outline" key={item.id} asChild className="mt-6 p-5 md:m-4 lg:p-7 m-2 flex rounded-xl items-center">
              <Link href={item.url} className="flex " key={item.id} >{item.icon}{item.name}</Link>
              </Button>
            ))}
          </div>
        </div>
        }
        </div>
    </>
  )
}
{/* <Button asChild className="mt-6">
        <Link href="/user">Go to user</Link>
      </Button> */}
export default Sidebar