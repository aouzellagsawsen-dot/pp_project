import React, { useEffect, useState } from 'react'
import NotificationCard from './NotificationCard'
import { Check } from 'lucide-react'

const NotificationPanel = () => {
useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const [notifications, setNotifications] = useState([
        {
            id:1,
            type:"borrow",
            title:"Borrow Request Approved",
            text:'Your request to borrow "Pride and prejudice" has been approved.',
            date:"2026-02-17 08:00",
            isNew:false,
            },
        {
            id:2,
            type:"reminder",
            title:"Return Reminder",
            text:'Please return "1984" by February 20, 2026.',
            date:"Yesterday 8:32",
            isNew:false,
            },
        {
            id:3,
            type:"message",
            title:"New Message",
            text:"Sarah Johnson sent you a message.",
            date:"Today 10:30",
            isNew:true,
            },
        {
            id:4,
            type:"review",
            title:"New Review",
            text:"Someone left a review on your book.",
            date:"2026-02-16 12:00",
            isNew:true,
            }
    ])

     const markAllAsRead = () => {
        const updateNotifs = () => notifications.map(n=>({ ...n,isNew:false}))
            setNotifications(updateNotifs)
     }

    return (
    <>
    <div className='bg-[#f1ead7] min-h-screen flex flex-col justify-center items-center'>

       <div className='w-full max-w-3xl px-1 pt-10 flex justify-between'> 
        <h1 className='pl-5 font-serif font-semibold text-4xl text-[#5C544B] pb-1'>Notifications</h1>
        
        <button onClick={markAllAsRead} className='p-auto mr-5 border rounded-full text-[#8D7B68] hover:bg-[#8D7B68] hover:text-white flex justify-center items-center cursor-pointer'>
            <Check className='w-4 h-4 mr-px'></Check>
            <span className='p-2'>Mark all as read</span>
        </button>
        </div> 
    
    <div className='max-w-3xl m-auto space-y-4'>
        {notifications.map((notification)=>{
            return <NotificationCard key={notification.id} notification={notification}/>
        })}   
        </div>

    </div>

    </>
  )
}

export default NotificationPanel