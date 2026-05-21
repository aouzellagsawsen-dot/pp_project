import React, { useEffect, useState } from 'react'
import NotificationCard from './NotificationCard'
import { Check } from 'lucide-react'
import api from "../../api/axios"; 

const NotificationPanel = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    
useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/api/notify");
        if (response.data.success) {
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.error("Erreur récup notifications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      // Optionnel : appel API pour tout mettre à jour en bdd ici
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error(error);
    }
  };

    return (
    <div className='bg-[#f1ead7] min-h-screen flex flex-col items-center pt-10 pb-20'>
      <div className='w-full max-w-3xl px-4 flex justify-between items-center mb-8'> 
        <h1 className='font-serif font-semibold text-4xl text-[#5C544B]'>Notifications</h1>
        <button onClick={markAllAsRead} className='px-4 py-2 border rounded-full border-[#8D7B68] text-[#8D7B68] hover:bg-[#8D7B68] hover:text-white flex items-center gap-2 cursor-pointer transition-all text-sm font-medium'>
          <Check className='w-4 h-4' />
          <span>Mark all as read</span>
        </button>
      </div> 
    
      <div className='w-full max-w-3xl px-4 space-y-4'>
        {loading ? (
          <p className="text-center italic opacity-60 font-serif">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-center italic opacity-60 font-serif">No notifications.</p>
        ) : (
          notifications.map((notification) => (
            <NotificationCard key={notification._id} notification={notification} />
          ))
        )}   
      </div>
    </div>
  )
}

export default NotificationPanel