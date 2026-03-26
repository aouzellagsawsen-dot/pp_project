import React from 'react'
import NotificationCard from './NotificationCard'
import { Bell,MessageCircle,Star,Box} from 'lucide-react'

const NotificationPanel = () => {
    const ListofNotifs = [
        {
            id:1,
            type:"borrow",
            title:"Borrow Request Approved",
            text:"Your request to borrow ? has been approved.",
            isNew:true,
            icon:<Box></Box>
        },
        {
            id:2,
            type:"reminder",
            title:"Return Reminder",
            text:"Please return ? by ?",
            isNew:true,
            icon:<Bell></Bell>
        },
        {
            id:3,
            type:"message",
            title:"New Message",
            text:"? sent you a message.",
            isNew:true,
            icon:<MessageCircle></MessageCircle>
        },
        {
            id:4,
            type:"review",
            title:"New Review",
            text:"Someone left a review on your book.",
            isNew:true,
            icon:<Star></Star>
        }
    ]
  return (
    <div>
     {ListofNotifs.map((notification)=>{
        return <NotificationCard notification={notification}/>
     })}   
    </div>
  )
}

export default NotificationPanel