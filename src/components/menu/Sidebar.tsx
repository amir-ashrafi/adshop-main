"use client"
import React, { useState } from 'react'
import { Button } from '../ui'
import Link from 'next/link'
import { Menu, LayoutDashboard, UserRound, ShoppingCart, ListOrdered, BookOpen, Store } from 'lucide-react';
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
        <Button onClick={onclick} variant="outline" className="flex fixed top-6 p-4 border-blue-500 hover:bg-blue-600 hover:text-white  md:p-4 right-3 z-50"><Menu /></Button>
        {showBox && 
        <div onClick={onclick} className="w-full fixed top-0 min-h-screen  bg-black/30 z-10 flex items-center justify-center">
          <div className="absolute bg-slate-100  flex-col rounded-2xl w-48 md:w-60 lg:w-80">
            {data.map(item =>(
              <Button variant="outline" key={item.id} asChild className="mt-6 p-5 md:m-4 lg:p-7 m-2 flex rounded-xl items-center">
              <Link href={item.url} className="flex " key={item.id} >{item.name}{item.icon}</Link>
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