import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, User } from 'lucide-react';
import api from "../api/axios.js"

const MessagesPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const targetUserId = searchParams.get('userId');
  const targetUserName = searchParams.get('userName');
  const bookTitle = searchParams.get('bookTitle');

  // Récupération de l'ID de l'utilisateur connecté depuis le localStorage
  const currentUserId = localStorage.getItem('userId');

  // États du composant
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]); // Messages de la conversation active
  const [activeConvId, setActiveConvId] = useState(null); // ID de la conversation MongoDB active
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Réf pour scroller automatiquement en bas de la discussion
  const messagesEndRef = useRef(null);

  // Formatage de l'heure
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ==========================================
  // 1. CHARGEMENT INITIAL DES CONVERSATIONS
  // ==========================================
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadInbox = async () => {
      try {
        const response = await api.get('/api/messages/conversations');
        if (response.data.success) {
          const fetchedConvs = response.data.data;
          setConversations(fetchedConvs);

          // Gestion du bouton "Contact" depuis une autre page
          if (targetUserId && targetUserName) {
            // On regarde si une conversation existe déjà avec cet utilisateur
            const existingConv = fetchedConvs.find(c => 
              c.participants.some(p => p._id === targetUserId)
            );

            if (existingConv) {
              setActiveConvId(existingConv._id);
            } else {
              // Si elle n'existe pas, on crée une conversation "virtuelle" temporaire dans l'état
              const mockConv = {
                _id: `temp_${targetUserId}`, // ID temporaire
                participants: [
                  { _id: currentUserId },
                  { _id: targetUserId, username: targetUserName }
                ],
                isTemp: true
              };
              setConversations(prev => [mockConv, ...prev]);
              setActiveConvId(mockConv._id);
            }

            // Pré-remplir l'input avec le titre du livre
            if (bookTitle) {
              setInputValue(`Hi ${targetUserName}, I'm interested in "${bookTitle}". Is it still available?`);
            }
          } else if (fetchedConvs.length > 0) {
            // Par défaut, on ouvre la première conversation de la liste
            setActiveConvId(fetchedConvs[0]._id);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des conversations :", error);
      } finally {
        setLoading(false);
      }
    };

    loadInbox();
  }, [targetUserId, targetUserName, bookTitle]);

  // ==========================================
  // 2. CHARGEMENT DES MESSAGES AU SÉLECTION
  // ==========================================
  useEffect(() => {
    if (!activeConvId) return;

    // Si c'est une conversation temporaire, il n'y a pas encore de messages dans la DB
    if (activeConvId.startsWith('temp_')) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      try {
        const response = await api.get(`/api/messages/${activeConvId}`);
        if (response.data.success) {
          setMessages(response.data.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des messages :", error);
      }
    };

    loadMessages();
  }, [activeConvId]);

  // ==========================================
  // 3. ENVOYER UN MESSAGE
  // ==========================================
 // ==========================================
  // 3. ENVOYER UN MESSAGE (VERSION CORRIGÉE)
  // ==========================================
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeConvId) return;

    // Trouver le destinataire (l'autre participant)
    const currentChat = conversations.find(c => c._id === activeConvId);
    
    // On ajoute un "?" sécuritaire au cas où participants serait indéfini
    const receiver = currentChat?.participants?.find(p => p._id !== currentUserId);

    if (!receiver) {
      console.error("Destinataire introuvable dans la conversation actuelle.");
      return;
    }

    try {
      const textToSend = inputValue;
      setInputValue(""); // On vide l'input immédiatement pour une UI fluide

      const response = await api.post(`/api/messages/send/${receiver._id}`, { text: textToSend });

      if (response.data.success) {
        const newMsg = response.data.data;

        // Si on était sur une conversation temporaire, il faut recharger l'inbox
        if (activeConvId.startsWith('temp_')) {
          const inboxResponse = await api.get('/api/messages/conversations');
          if (inboxResponse.data.success) {
            setConversations(inboxResponse.data.data);
            setActiveConvId(newMsg.conversationId); // On bascule sur le vrai ID
          }
        } else {
          // Sinon, on ajoute simplement le message à l'écran
          setMessages(prev => [...prev, newMsg]);
          
          // On remonte cette conversation en haut de la liste de gauche (AVEC SÉCURITÉ)
          setConversations(prev => {
            const updated = prev.map(c => 
              c._id === activeConvId ? { ...c, updatedAt: new Date().toISOString() } : c
            );
            
            // Tri sécurisé avec .getTime() et une valeur par défaut de 0
            return updated.sort((a, b) => {
              const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
              const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
              return dateB - dateA;
            });
          });
        }
      }
    } catch (error) {
      // Affichage exact de l'erreur dans la console pour le debug
      console.error("Erreur lors de l'envoi du message :", error);
      alert("Impossible d'envoyer le message.");
    }
  };

  // Récupérer les infos de la personne avec qui on parle actuellement
  const activeChat = conversations.find(c => c._id === activeConvId);
  const otherParticipant = activeChat?.participants.find(p => p._id !== currentUserId);

  if (loading) {
    return <div className="min-h-screen bg-[#F2E8D9] flex justify-center items-center text-2xl font-serif">Loading conversations...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F2E8D9] p-12 font-serif text-[#5D4037]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl mb-10 opacity-90 font-medium tracking-tight">Messages</h2>

        <div className="grid grid-cols-12 gap-8 h-[750px]">
          
          {/* LISTE GAUCHE (Conversations) */}
          <div className="col-span-4 bg-[#FDFBF7] rounded-[2.5rem] border border-[#D7C9B8] overflow-hidden flex flex-col shadow-sm">
            <div className="p-6 border-b border-[#D7C9B8]/50 text-[11px] font-bold tracking-[0.2em] uppercase opacity-50">Conversations</div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => {
                const other = conv.participants.find(p => p._id !== currentUserId) || { username: "User" };
                return (
                  <div 
                    key={conv._id}
                    onClick={() => setActiveConvId(conv._id)}
                    className={`p-6 flex items-start gap-4 cursor-pointer transition-all ${activeConvId === conv._id ? 'bg-[#EFE3D2]' : 'hover:bg-[#EFE3D2]/40'}`}
                  >
                    <div className="w-14 h-14 bg-stone-200 rounded-full flex items-center justify-center border border-[#D7C9B8] shrink-0">
                      {other.avatar ? (
                        <img src={other.avatar} alt={other.username} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={28} className="text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h4 className="font-bold text-base truncate">{other.username}</h4>
                      <p className="text-sm opacity-60 truncate">
                        {conv.isTemp ? "Nouvelle discussion..." : "Cliquer pour voir la discussion"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ZONE CHAT DROITE (Messages) */}
          <div className="col-span-8 bg-[#FDFBF7] rounded-[2.5rem] border border-[#D7C9B8] flex flex-col shadow-sm overflow-hidden">
            {activeConvId ? (
              <>
                <div className="p-5 border-b border-[#D7C9B8]/50 bg-[#EFE3D2]/20 flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center border border-[#D7C9B8]">
                    <User size={24} className="text-stone-400" />
                  </div>
                  <h4 className="text-base font-bold">{otherParticipant?.username}</h4>
                </div>

                {/* Bulles de Messages */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 flex flex-col">
                  {messages.map((msg) => {
                    // On détermine si le message vient de moi en comparant les IDs
                    const isMe = (msg.sender._id || msg.sender) === currentUserId;
                    return (
                      <div key={msg._id} className={`max-w-[75%] flex flex-col ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                        <div className={`p-5 rounded-[1.8rem] text-[15px] shadow-sm border ${
                          isMe ? 'bg-[#8D7B68] text-[#FDFBF7] border-[#7A6959] rounded-tr-none' : 'bg-[#D6B88D]/30 text-[#4A3F35] border-[#D7C9B8] rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[10px] mt-3 opacity-40 uppercase tracking-widest px-2">
                          {formatTime(msg.createdAt || new Date())}
                        </span>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input de saisie */}
                <div className="p-8 bg-[#EFE3D2]/10 border-t border-[#D7C9B8]/50">
                  <div className="relative flex items-center gap-4">
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full bg-[#FDFBF7] border border-[#D7C9B8] rounded-full py-4 px-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all shadow-inner"
                    />
                    <button onClick={handleSendMessage} className="p-4 bg-[#8D7B68] text-white rounded-full hover:bg-[#7A6959] shadow-lg active:scale-95">
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex justify-center items-center text-xl opacity-50">
                Sélectionnez une conversation pour commencer à discuter.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MessagesPage;