import React, { useState } from 'react'
import NotificationCard from './NotificationCard'
import { Check } from 'lucide-react'

const NotificationPanel = () => {

    const [notifications, setNotifications] = useState([
        {
            id:1,
            type:"borrow",
            title:"Borrow Request Approved",
            text:"Your request to borrow ? has been approved.",
            isNew:false,
            },
        {
            id:2,
            type:"reminder",
            title:"Return Reminder",
            text:"Please return ? by ?",
            isNew:false,
            },
        {
            id:3,
            type:"message",
            title:"New Message",
            text:"? sent you a message.",
            isNew:true,
            },
        {
            id:4,
            type:"review",
            title:"New Review",
            text:"Someone left a review on your book.",
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

       <div className='w-full max-w-3xl px-1 mb-10 pt-5 flex justify-between'> 
        <h1 className='font-serif font-semibold text-4xl text-[#5C544B] pb-1'>Notifications</h1>
        
        <button onClick={markAllAsRead} className='p-auto border rounded-full text-[#8D7B68] hover:bg-[#8D7B68] hover:text-white flex justify-center items-center cursor-pointer'>
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