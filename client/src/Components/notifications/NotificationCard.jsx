import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Bell,MessageCircle,Star,Box,Check} from 'lucide-react'
import api from "../api/axios"; 

const NotificationCard = ({notification}) => {
    const navigate = useNavigate();
    
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
                return <Bell />;
                         
        }
    }

    const handleNotificationClick = async () => {
    try {
      // Étape 1 : Marquer la notification comme lue dans le backend via l'instance 'api'
            await api.patch(`/api/notifications/${notification._id}/read`);
            
            // Étape 2 : Redirection ciblée si c'est une demande d'emprunt
            if (notification.type === "borrow") {
                navigate('/admin'); 
            }
    } catch (error) {
      console.error("Erreur lors du traitement du clic notification", error);
    }
  };

   return (
    
    <div 
      onClick={handleNotificationClick}
      className={`flex items-start bg-white/70 w-full rounded-2xl cursor-pointer hover:bg-white/90 p-6 gap-4 shadow-sm border border-[#E8DCD1]/40 transition-all ${!notification.isRead ? 'border-l-4 border-l-[#8D7B68]' : ''}`}
    >
      <div className='rounded-full flex justify-center items-center w-12 h-12 bg-[#e8dcd1] shrink-0'>
        {GetNotifIcon()}
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex justify-between items-center w-full mb-1'>
          <h1 className='font-sans font-semibold text-[#4A3F35]'>{notification.title || "Notification"}</h1>
          {!notification.isRead && (
            <span className='bg-[#8D7B68] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full'>
              New
            </span>
          )}
        </div>    
        <p className='font-sans text-[#7A6A5A] text-sm mb-2 leading-relaxed'>
          {notification.text} 
          {notification.sender && ` (Par: ${notification.sender.username})`}
        </p>
        <p className='font-sans text-[#A09080] text-xs'>
          {new Date(notification.createdAt || notification.date).toLocaleDateString()}
        </p>
      </div>
    </div>
    
  )
}

export default NotificationCard