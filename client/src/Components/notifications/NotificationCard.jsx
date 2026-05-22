import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Bell,MessageCircle,Star,Box,Check} from 'lucide-react'
import api from "../../api/axios"; 

const NotificationCard = ({notification}) => {
    const navigate = useNavigate();
    
    if(!notification) return null 

    const getNotifTitle = () => {
        switch(notification.type){
            case "loan_request": return "New Loan Request";
            case "loan_approved": return "Request Approved!";
            case "loan_rejected": return "Request Declined";
            case "message": return "New Message";
            case "review": return "New Review";
            default: return "Notification";     
        }
    }
    const GetNotifIcon = () => {
        switch(notification.type){
            case "loan_request": return <Bell className='text-amber-500' />;
            case "loan_approved": return <Check className='text-emerald-600' />;
            case "loan_rejected": return <Box className='text-rose-600' />;
            case "message": return <MessageCircle className='text-blue-500' />;
            case "review": return <Star className='text-amber-700' />;
            default: return <Bell className='text-[#8D7B68]' />;
        }
    }

    const handleNotificationClick = async () => {
    let destination = "";

  switch (notification.type) {
    case "loan_request":
      destination = '/adminpanel';
      break;
      
    case "message":
      const senderId = notification.sender?._id;
      const senderName = notification.sender?.username;
      if (senderId && senderName) {
        destination = `/messages?userId=${senderId}&userName=${senderName}`;
      } else {
        destination = '/messages';
      }
      break;
      
    case "loan_approved":
    case "loan_rejected":
      destination = '/catalog'; 
      break;
      
    default:
      destination = '/';
  }

  if (destination) {
    navigate(destination);
  }

   if (!notification.isRead) {
    try {
      await api.patch(`/api/notify/${notification._id}/read`);
    } catch (error) {
      console.error("Erreur API (Notification marquée lue) :", error);
    }
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
          <h1 className='font-sans font-semibold text-[#4A3F35]'>{getNotifTitle()}</h1>
          {!notification.isRead && (
            <span className='bg-[#8D7B68] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full'>
              New
            </span>
          )}
        </div>    
        <p className='font-sans text-[#7A6A5A] text-sm mb-2 leading-relaxed'>
          {notification.sender && <span className="font-semibold">{notification.sender.username} </span>}
            {notification.content}
        </p>
        <p className='font-sans text-[#A09080] text-xs'>
          {new Date(notification.createdAt || notification.date).toLocaleDateString()}
        </p>
      </div>
    </div>
    
  )
}

export default NotificationCard