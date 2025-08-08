"use client"
import React, { useState } from 'react'
import { Button } from '../ui'
import Link from 'next/link'
import { Menu, X ,ArrowLeft, LayoutDashboard, UserRound, ShoppingCart, ListOrdered, BookOpen, Store } from 'lucide-react';
const Sidebar = () => {
  const [showBox,setShowBox] = useState(false)
  function onclick(){
    setShowBox(!showBox)
  }
  const data = 
    [
      {
        id: 0,
        name: "داشبورد",
        url: "/dashboard/original",
        icon: <LayoutDashboard />
      },
      {
        id: 1,
        name: "کاربران",
        url: "/dashboard/users",
        icon: <UserRound />
      },
      {
        id: 2,
        name: "محصولات",
        url: "/dashboard/products",
        icon: <ShoppingCart />
      },
      {
        id: 3,
        name: "سفارش‌ها",
        url: "/dashboard/orders",
        icon: <ListOrdered />
      },
      {
        id: 4,
        name: "مدیریت وبلاگ",
        url: "/dashboard/blog",
        icon: <BookOpen />
      },
      {
        id: 5,
        name: "فروشگاه",
        url: "/",
        icon: <Store />
      },
    ]
    
  return (
    <>
    <div className='relative flex justify-center'>
        <Button onClick={onclick} variant={showBox ? "destructive" : "outline"}
 className={`${showBox?'hover:bg-none border-none':'hover:bg-black hover:text-white'} flex text fixed top-4 right-3 z-50  border-2  border-white border-b-slate-500  hover:border-white duration-500 size-11`}>{showBox ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</Button>
        {showBox && 
        <div onClick={onclick} className="w-full inset-0 bg-black/30 backdrop-blur-md z-40  fixed top-0 min-h-screen   flex items-center justify-center">
          <div className="absolute space-y-4 flex-col w-1/2 max-w-[320px] md:w-2/6 lg:w-80">
            {data.map(item =>(
              <Button variant="outline" key={item.id} asChild className="m-2 group flex justify-between items-center py-5 border-2 border-white border-b-slate-500  hover:border-white duration-500 hover:bg-black hover:text-white">
              <Link href={item.url} className="flex " key={item.id} >
                <ArrowLeft className="w-4 h-4 text-black group-hover:text-white  transition duration-200" />
                <div className='flex gap-4'>
                  {item.name}
                {item.icon}
                </div>
                
              </Link>
              </Button>
            ))}
          </div>
        </div>
        }
        </div>
    </>
  )
}

export default Sidebar