
import React, { useState, useEffect, useRef } from 'react';
import { conversationsData } from '../../data/dashboardMessagesMockData';
import type { Conversation, Message } from '../../types';

// ChatList component on the right
const ChatList: React.FC<{
    conversations: Conversation[];
    selectedConversationId: number | null;
    onSelectConversation: (id: number) => void;
}> = ({ conversations, selectedConversationId, onSelectConversation }) => (
    <div className="w-1/3 h-full bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">الرسائل</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
            {conversations.map(convo => (
                <div
                    key={convo.id}
                    onClick={() => onSelectConversation(convo.id)}
                    className={`flex items-start gap-4 p-4 cursor-pointer border-r-4 transition-all duration-200 ${selectedConversationId === convo.id ? 'bg-blue-50 border-[var(--primary)]' : 'border-transparent hover:bg-gray-50'}`}
                >
                    <div className="relative flex-shrink-0">
                        <img src={convo.clientAvatar} alt={convo.clientName} className="w-12 h-12 rounded-full" />
                        <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white ${convo.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 truncate">{convo.clientName}</h3>
                            <p className="text-xs text-gray-500 flex-shrink-0">{convo.lastMessageTime}</p>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
                            {convo.unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">{convo.unreadCount}</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isMyMessage = message.senderId === 'freelancer';
    const isFile = typeof message.content !== 'string';

    const statusIcon = {
        sent: 'fa-check',
        delivered: 'fa-check-double',
        read: 'fa-check-double text-blue-400',
    };
    
    return (
         <div className={`flex items-end gap-3 max-w-[75%] ${isMyMessage ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className={`p-3 rounded-2xl ${isMyMessage ? 'bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                 {isFile ? (
                    <div className="flex items-center gap-3">
                        <i className={`fas fa-file-alt text-3xl ${isMyMessage ? 'text-blue-200' : 'text-gray-500'}`}></i>
                        <div>
                            <div className="font-bold truncate">{(message.content as {name: string}).name}</div>
                            <div className="text-xs opacity-80">{(message.content as {size: string}).size}</div>
                        </div>
                    </div>
                ) : (
                    <p>{message.content as string}</p>
                )}
            </div>
            <div className="text-xs text-gray-400 mb-1 flex-shrink-0">
                {message.timestamp}
                {isMyMessage && <i className={`fas ${statusIcon[message.status]} ml-1`}></i>}
            </div>
        </div>
    );
};


// ChatWindow component on the left
const ChatWindow: React.FC<{ conversation: Conversation | null }> = ({ conversation }) => {
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [conversation]);
    
    if (!conversation) {
        return (
            <div className="flex-grow h-full flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-500">
                    <i className="fas fa-comments text-5xl mb-4"></i>
                    <p>اختر محادثة لعرض الرسائل</p>
                </div>
            </div>
        );
    }
    
    const projectStatusConfig = {
      active: { label: 'نشط', color: 'text-green-600 bg-green-100' },
      completed: { label: 'مكتمل', color: 'text-gray-600 bg-gray-200' },
    };
    const projConf = projectStatusConfig[conversation.projectStatus];

    return (
        <div className="flex-grow h-full bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b bg-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src={conversation.clientAvatar} alt={conversation.clientName} className="w-12 h-12 rounded-full" />
                    <div>
                         <h3 className="text-lg font-bold text-gray-800">{conversation.clientName}</h3>
                         <div className="text-xs text-gray-500">{conversation.isOnline ? 'متصل الآن' : 'غير متصل'}</div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700">{conversation.projectTitle}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${projConf.color}`}>{projConf.label}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-lg">
                    <i className="fas fa-search cursor-pointer hover:text-[var(--primary-dark)]"></i>
                    <i className="fas fa-ellipsis-v cursor-pointer hover:text-[var(--primary-dark)]"></i>
                </div>
            </div>

            {/* Messages */}
            <div ref={chatBodyRef} className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
                {conversation.messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex items-center gap-4">
                <input 
                    type="text" 
                    placeholder="اكتب رسالتك هنا..." 
                    className="w-full bg-gray-100 rounded-full px-5 py-3 border-2 border-transparent transition-all duration-200 focus:bg-white focus:border-[var(--primary)] outline-none"
                />
                <div className="flex items-center gap-4 text-gray-500 text-xl">
                    <i className="fas fa-microphone cursor-pointer hover:text-[var(--primary-dark)]"></i>
                    <i className="fas fa-smile cursor-pointer hover:text-[var(--primary-dark)]"></i>
                    <i className="fas fa-paperclip cursor-pointer hover:text-[var(--primary-dark)]"></i>
                </div>
                <button className="btn bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)] text-white rounded-full w-12 h-12 flex-shrink-0 text-xl">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};

interface DashboardMessagesProps {
    selectedConversationId: number | null;
    onMessageSelected: () => void;
}

const DashboardMessages: React.FC<DashboardMessagesProps> = ({ selectedConversationId, onMessageSelected }) => {
    const [conversations, setConversations] = useState<Conversation[]>(conversationsData);
    const [internalSelectedId, setInternalSelectedId] = useState<number | null>(conversationsData[0]?.id || null);

    useEffect(() => {
        if (selectedConversationId !== null) {
            setInternalSelectedId(selectedConversationId);
            // Mark messages as read and reset the prop in the parent
            setConversations(prev => prev.map(c => c.id === selectedConversationId ? { ...c, unreadCount: 0 } : c));
            onMessageSelected(); 
        }
    }, [selectedConversationId, onMessageSelected]);

    const handleSelectConversation = (id: number) => {
        setInternalSelectedId(id);
        setConversations(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
    };

    const selectedConversation = conversations.find(c => c.id === internalSelectedId) || null;

    return (
        <div className="h-[calc(100vh-160px)] min-h-[600px] bg-white rounded-2xl shadow-sm border border-gray-200 flex overflow-hidden">
            <ChatWindow conversation={selectedConversation} />
            <ChatList 
                conversations={conversations} 
                selectedConversationId={internalSelectedId} 
                onSelectConversation={handleSelectConversation}
            />
        </div>
    );
};

export default DashboardMessages;
