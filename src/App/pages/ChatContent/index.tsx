/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-10-20 16:39:07
 * @LastEditTime: 2021-10-21 11:59:02
 */
import React  from "react";
import './index.less';
import {useChatStore} from "@/App/layout/Chat/ChatStore/ChatStore";
import {observer, Observer} from "mobx-react-lite";
import ChatHeader from "@/App/pages/ChatContent/components/ChatHeader";
import ChatSend from "@/App/pages/ChatContent/components/ChatSend";
import ChatRecords from "@/App/pages/ChatContent/components/ChatRecords";

const ChatContent = observer(() => {
  const chatStore = useChatStore();

  return (
    <div className="chat-content-wrapper">
      {
        chatStore.chat.userId ?
          <>
            <ChatHeader />
            <div className="chat-content hidden-scrollbar" id='R_chat_content'>
              <ChatRecords />
            </div>
            <ChatSend />
          </>
          : <div className="chat-content-null">
            <p>欢迎使用 WebChat</p>
          </div>
      }
    </div>
  );
});

export default ChatContent;