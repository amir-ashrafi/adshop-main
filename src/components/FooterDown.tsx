'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MonitorSmartphone,Instagram,Send,Youtube,Linkedin ,Github, MailIcon, PhoneIcon  } from 'lucide-react'
import { Button } from './ui'
function FooterDown() {
    
    const conection = [
        {
          id: 1,
          icon: <Instagram className="hover:text-[#E4405F] transition-colors duration-300 rounded-lg hover:bg-white size-7 md:size-8 p-1" />,
          link: 'https://www.instagram.com/amir.aip/'
        },
        {
          id: 2,
          icon: <Send className="hover:text-[#26A5E4] transition-colors duration-300 rounded-lg hover:bg-white size-7 md:size-8 p-1" />,
          link: 'https://web.telegram.org/k/#@Amiraip'
        },
        {
          id: 3,
          icon: <Youtube className="hover:text-[#FF0000] transition-colors duration-300 rounded-lg hover:bg-white size-7 md:size-8 p-1" />,
          link: 'https://www.youtube.com/'
        },
        {
          id: 4,
          icon: <Linkedin className="hover:text-[#0077B5] transition-colors duration-300 rounded-lg hover:bg-white size-7 md:size-8 p-1" />,
          link: 'https://www.linkedin.com/in/amirreza-ashrafi-2481222ba/'
        },
        {
          id: 5,
          icon: <Github className="hover:text-[#181717] transition-colors duration-300 rounded-lg hover:bg-white size-7 md:size-8 p-1" />,
          link: 'https://github.com/amir-ashrafi'
        },
        {
          id: 6,
          icon: <PhoneIcon className="hover:text-[#10B981] transition-colors duration-300 rounded-lg hover:bg-white size-7 md:size-8 p-1" />,
          link: "tel:09016812518"
        }
      ];
      
    const NImage = [
        {
            id:1,
            src:'/n1.png',
            link:'',
        },
        {
            id:2,
            src:'/n2.svg',
            link:'',
        },
        {
            id:3,
            src:'/n3.webp',
            link:'',
        },
        {
            id:4,
            src:'/n4.webp',
            link:'',
        },
        {
            id:5,
            src:'/n5.webp',
            link:'',
        },
    ]
    const linkSite = [
            {
                id:1,
                text:'بلاگ'
                ,link:'/blog'
            },
            {
                id:2,
                text:'خرید گوشی'
                ,link:'/products?category=MOBILE'
            },
            {
                id:3,
                text:'مانیتور'
                ,link:'/products?category=MONITOR'
            },
            {
                id:4,
                text:'ساعت هوشمند'
                ,link:'/products?category=WATCH'
            },{
                id:5,
                text:'ایرپاد',
                link:'/products?category=AIRPODS',
            },
            {
                id:6,
                text:'لپتاب',
                link:'/products?category=LAPTOP',
            },
            {
                id:7,
                text:'کامپیوتر',
                link:'/products?category=COMPUTER'
            },
            {
                id:8,
                text:"تخفیفات ویژه",
                link:'/products?discount=true'
            }

    ]

const itemsPerColumn = 3
const columnCount = Math.ceil(linkSite.length / itemsPerColumn)

const rawColumns = Array.from({ length: columnCount }, (_, i) =>
  linkSite.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
)

// مرحله 2: آرایه‌ها را "transpose" می‌کنیم تا ستونی نمایش داده بشن
const maxColLength = Math.max(...rawColumns.map(col => col.length))
const columns = Array.from({ length: itemsPerColumn }, (_, rowIndex) =>
  rawColumns.map(col => col[rowIndex]).filter(Boolean)
)

  return (
    <div className='bg-gradient-to-br relative from-blue-900 via-blue-700 to-blue-400 flex justify-center flex-col py-5 rounded-t-3xl'>
        <div className='w-full  flex justify-between gap-10 items-center shadow-md shadow-border px-6 rounded-lg border-none  border-b-2 border-white pb-3'>
            <Link href="" className='basis-1/2 my-7 w-full sm:w-48 sm:basis-auto'>
                <Button className='bg-white w-full text-black font-bold hover:bg-white'>بازگشت به بالا</Button>
            </Link>
            <div className="flex items-center gap-3 h-12">
                <Link href="/" className="font-bold text-2xl text-white">
                  اشرفی‌تک
                </Link>
                <MonitorSmartphone className='text-white' />
            </div>
        </div>
        <div  className='text-white px-7 relative py-9 flex flex-col w-full sm:items-end items-center font-bold text-right shadow-border shadow-md rounded-lg border-b-2 '>
        <div className='hidden md:block lg:left-1/4 absolute z-10 left-10 top-9'>
  <h1 className='translate-x-6 mb-4'>دسترسی سریع</h1>
  <div className='flex flex-row gap-6 lg:gap-10'>
    {columns.map((col, colIndex) => (
      <div key={colIndex} className='flex flex-col gap-2'>
        {col.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className='hover:underline  transition-colors duration-300'
          >
            {item.text}
          </Link>
        ))}
      </div>
    ))}
  </div>
</div>


            <h2 className=''>
                ارتباط با ما
            </h2>
            <div className='flex flex-row justify-between sm:justify-end space-x-3   w-full md:w-2/3 lg:w-1/2 my-5  items-center '>
                {conection.map((item)=>(
                    <Link target="_blank" key={item.id} href={item.link}>
                        {item.icon}
                    </Link>
                ))}
                <h3 className=''>
                    شبکه های اجتماعی
                </h3>
            </div>
            <div className="flex items-center justify-between gap-6 ">
                <Link href="mailto:a.ashrafi.13826@gmail.com" className="text-white hover:underline flex items-center gap-2">
                    <MailIcon className=''/>
                    <span>a.ashrafi.13826@gmail.com</span>
                </Link>
                <h3>ایمیل</h3>
            </div>
        </div>
        <div className='flex flex-col justify-center items-center text-right text-white py-10 font-bold w-full mt-10 lg:mt-12'>

            <h2 className='lg:mx-auto text-xl py-5'>اعتماد شما دارایی ماست</h2>
            
            <div className='flex w-10/12 md:w-2/3 lg:w-1/2 justify-between h-28 space-x-6 border-2 border-t-0 p-5 shadow-border shadow-lg items-center rounded-xl'>
                {NImage.map((item) =>(
                    <Link target='_blank' key={item.id} href={item.link}>
                        <Image alt='image N' src={item.src} height={75} width={75} className='' />
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default FooterDown