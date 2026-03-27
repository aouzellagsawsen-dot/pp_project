import React, { useState } from 'react'
import { Bell,MessageCircle,Star,Box,Check} from 'lucide-react'

const NotificationCard = ({notification}) => {
    
    if(!notification) return null 

    const GetNotifIcon = () => {
        switch(notification.type){
            case "borrow" : 
                return <Bell className='text-[orange]'></Bell>
            case "reminder" : 
                return <Box className='text-[green]'></Box>
            case "message" : 
               return <MessageCircle className='text-[blue]'></MessageCircle>
            case "review" : 
                return <Star className='text-[brown]'></Star>
            default:
                return <Bell></Bell>;
                         
        }
    }

   return (
    
    <div className='flex items-start bg-white/60 w-180 h-35 rounded-2xl cursor-pointer hover:bg-white/50 p-6 gap-4 shadow-sm'>
             
        <div className='rounded-full flex justify-center items-center w-12 h-12 bg-[#a78e76] shrink-0'>{GetNotifIcon()}</div>
        <div className='flex flex-col flex-1 w-full'>
            <div className='flex justify-between items-center w-full'>
             <h1 className='font-sans mb-1 pt-3 align-baseline'>{notification.title}</h1>
             {notification.isNew && <span className='p-auto h-9 w-auto bg-[#8D7B68] rounded-full text-white text-bold font-sans flex justify-center items-center text-xs'>
                 <span className='px-2'>New</span>
                 </span>}
        </div>    
            
        <p className='w-full font-sans mb-2 text-[#7A6A5A]'>{notification.text}</p>
        </div>
    </div>

   

    
  )
}

export default NotificationCard