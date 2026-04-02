import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, User } from 'lucide-react';

const MessagesPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const targetUserId = searchParams.get('userId');
  const targetUserName = searchParams.get('userName');
  const bookTitle = searchParams.get('bookTitle');

  // 1. Liste des discussions (À charger depuis ta DB plus tard)
  const [conversations, setConversations] = useState([
    { id: "1", name: "Sarah", lastMessage: "Thanks for lending me the book!", time: "10:30" },
    { id: "2", name: "Ilyes", lastMessage: "Is the book still available?", time: "14:20" }
  ]);

  // 2. Stockage des messages par ID de conversation
  const [allMessages, setAllMessages] = useState({
    "1": [{ id: 101, text: "Thanks for lending me the book!", time: "10:30", sender: "other" }],
    "2": [],
  });

  const [activeConvId, setActiveConvId] = useState(targetUserId || "1");
  const [inputValue, setInputValue] = useState("");

  // Gestion de l'arrivée depuis un bouton "Contact"
  useEffect(() => {
    if (targetUserId && targetUserName) {
      const exists = conversations.find(c => c.id === targetUserId);
      if (!exists) {
        const newContact = {
          id: targetUserId,
          name: targetUserName,
          lastMessage: bookTitle ? `Inquiry: ${bookTitle}` : "New conversation",
          time: "Now"
        };
        setConversations([newContact, ...conversations]);
        setAllMessages(prev => ({ ...prev, [targetUserId]: [] }));
      }
      setActiveConvId(targetUserId);
      if (bookTitle) {
        setInputValue(`Hi ${targetUserName}, I'm interested in "${bookTitle}". Is it still available?`);
      }
    }
  }, [targetUserId]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "me"
    };

    // --- ICI : APPEL BASE DE DONNÉES ---
    // ex: await db.collection('messages').add({ ...newMessage, to: activeConvId })

    // Mise à jour locale (UI)
    setAllMessages(prev => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMessage]
    }));

    setConversations(prev => prev.map(c => 
      c.id === activeConvId ? { ...c, lastMessage: inputValue, time: "Now" } : c
    ));
    
    setInputValue("");
  };

  const currentChatUser = conversations.find(c => c.id === activeConvId);

  return (
    <div className="min-h-screen bg-[#F2E8D9] p-12 font-serif text-[#5D4037]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl mb-10 opacity-90 font-medium tracking-tight">Messages</h2>

        <div className="grid grid-cols-12 gap-8 h-[750px]">
          
          {/* LISTE GAUCHE */}
          <div className="col-span-4 bg-[#FDFBF7] rounded-[2.5rem] border border-[#D7C9B8] overflow-hidden flex flex-col shadow-sm">
            <div className="p-6 border-b border-[#D7C9B8]/50 text-[11px] font-bold tracking-[0.2em] uppercase opacity-50">Conversations</div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div 
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-6 flex items-start gap-4 cursor-pointer transition-all ${activeConvId === conv.id ? 'bg-[#EFE3D2]' : 'hover:bg-[#EFE3D2]/40'}`}
                >
                  <div className="w-14 h-14 bg-stone-200 rounded-full flex items-center justify-center border border-[#D7C9B8] shrink-0">
                    <User size={28} className="text-stone-400" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h4 className="font-bold text-base truncate">{conv.name}</h4>
                    <p className="text-sm opacity-60 truncate">{conv.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ZONE CHAT DROITE */}
          <div className="col-span-8 bg-[#FDFBF7] rounded-[2.5rem] border border-[#D7C9B8] flex flex-col shadow-sm overflow-hidden">
            
            <div className="p-5 border-b border-[#D7C9B8]/50 bg-[#EFE3D2]/20 flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center border border-[#D7C9B8]">
                <User size={24} className="text-stone-400" />
              </div>
              <h4 className="text-base font-bold">{currentChatUser?.name}</h4>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-8 flex flex-col">
              {(allMessages[activeConvId] || []).map((msg) => (
                <div key={msg.id} className={`max-w-[75%] flex flex-col ${msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'}`}>
                  <div className={`p-5 rounded-[1.8rem] text-[15px] shadow-sm border ${
                    msg.sender === 'me' ? 'bg-[#8D7B68] text-[#FDFBF7] border-[#7A6959] rounded-tr-none' : 'bg-[#D6B88D]/30 text-[#4A3F35] border-[#D7C9B8] rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] mt-3 opacity-40 uppercase tracking-widest px-2">{msg.time}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-[#EFE3D2]/10 border-t border-[#D7C9B8]/50">
              <div className="relative flex items-center gap-4">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="w-full bg-[#FDFBF7] border border-[#D7C9B8] rounded-full py-4 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all shadow-inner"
                />
                <button onClick={handleSendMessage} className="p-4 bg-[#8D7B68] text-white rounded-full hover:bg-[#7A6959] shadow-lg active:scale-95">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;