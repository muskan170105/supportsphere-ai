import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  startChat,
  sendMessage as sendChatMessage,
  getHistory,
  getTimeline,
} from "../api/chatApi";

import {
  getConversations,
} from "../api/conversationApi";

import {
  getCustomer,
} from "../api/customerApi";


const ChatContext = createContext(null);


export function ChatProvider({ children }) {


  const [sessionId, setSessionId] =
    useState(null);


  const [conversations, setConversations] =
    useState([]);


  const [selectedConversation, setSelectedConversation] =
    useState(null);


  const [customer, setCustomer] =
    useState(null);


  const [messages, setMessages] =
    useState([]);


  const [timeline, setTimeline] =
    useState([]);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState(null);



  // =====================================================
  // INITIALIZATION
  // =====================================================

  useEffect(() => {

    initialize();

  }, []);



  async function initialize() {

    try {

      setError(null);


      const session =
        await startChat();


      setSessionId(
        session.session_id
      );


      const data =
        await getConversations();


      setConversations(
        data
      );


      if(data.length > 0){

        await selectConversation(
          data[0],
          session.session_id
        );

      }


    }
    catch(err){

      console.error(err);

      setError(
        "Unable to initialize chat"
      );

    }

  }





  // =====================================================
  // CHANGE CONVERSATION
  // =====================================================


  async function selectConversation(
    conversation,
    currentSession = sessionId
  ){

    setSelectedConversation(
      conversation
    );


    setMessages([]);

    setTimeline([]);


    try {


      const customerData =
        await getCustomer(
          conversation.customer_id
        );


      setCustomer(
        customerData
      );


      if(currentSession){


        const history =
          await getHistory(
            currentSession
          );


        setMessages(
          history.messages || []
        );


        const timelineData =
          await getTimeline(
            currentSession
          );


        setTimeline(
          timelineData || []
        );


      }


    }
    catch(err){

      console.error(
        "Conversation loading failed",
        err
      );

    }

  }





  // =====================================================
  // SEND MESSAGE
  // =====================================================


  async function sendMessage(message){


    if(!sessionId)
      return;


    try{


      setLoading(true);

      setError(null);



      setMessages(prev => [

        ...prev,

        {
          sender:"Customer",
          message,
        }

      ]);



      const response =
        await sendChatMessage(
          sessionId,
          message
        );



      setMessages(prev => [

        ...prev,

        {
          sender:"AI",
          message: response.response,
        }

      ]);



      setTimeline(
        response.timeline || []
      );


    }
    catch(err){


      console.error(err);


      setMessages(prev => [

        ...prev,

        {
          sender:"AI",
          message:
          "Sorry, I was unable to process your request.",
        }

      ]);


      setError(
        "Message failed"
      );


    }
    finally{


      setLoading(false);


    }

  }





  // =====================================================
  // REFRESH TIMELINE
  // =====================================================


  async function refreshTimeline(){

    if(!sessionId)
      return;


    try{


      const data =
        await getTimeline(
          sessionId
        );


      setTimeline(
        data
      );


    }
    catch(err){

      console.error(err);

    }

  }





  const value = {


    // state

    sessionId,

    conversations,

    selectedConversation,

    customer,

    messages,

    timeline,

    loading,

    error,


    // actions

    selectConversation,

    sendMessage,

    refreshTimeline,


  };



  return (

    <ChatContext.Provider
      value={value}
    >

      {children}

    </ChatContext.Provider>

  );

}





export function useChat(){


  const context =
    useContext(
      ChatContext
    );


  if(!context){

    throw new Error(
      "useChat must be used inside ChatProvider"
    );

  }


  return context;


}