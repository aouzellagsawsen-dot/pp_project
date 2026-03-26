import React, { useState } from 'react'
import { Bell,MessageCircle,Star,Box} from 'lucide-react'

const NotificationCard = (notification) => {
    
    const Utils = () => {
        switch(notification.type){
            case "reminder" : 
                notification.icon = <Bell></Bell>
                break;
            case "borrow" : 
                notification.icon = <Box></Box>
                break;
            case "message" : 
                notification.icon = <MessageCircle></MessageCircle>
                break;
            case "review" : 
                notification.icon = <Star></Star>
                break;            
        }
    }

   
    return (
    <div className='bg-[#f1ead7] min-h-screen flex flex-col justify-center items-center'>
        <h1 className='font-serif font-semibold text-4xl text-[#5C544B] tracking-tight pb-1'>Notifications</h1>
       <div className='max-w-3xl m-auto'> 
        <div className='bg-white/60 w-180 h-10 rounded-2xl cursor-pointer hover:bg-white/50 p-6 gap-4'>
            <div className='rounded-full flex justify-center items-center w-12 h-12 bg-[#5C544B]'>
                <span>{notification.icon}</span>
            </div>
            <h1 className='font-sans mb-1'>{notification.title}</h1>
            <p className='font-sans mb-2'>{notification.text}</p>
        </div>

    </div>

    </div>
  )
}

export default NotificationCard