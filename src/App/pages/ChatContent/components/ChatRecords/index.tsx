import React, { useEffect } from "react";
import './index.less';
import { useChatStore } from "@/App/layout/Chat/ChatStore/ChatStore";
import { useGlobalStore } from "@/App/store/GlobalStore";
import { observer } from "mobx-react-lite";
import { Image } from 'antd';
import UIPreview from "@/App/components/UIPreview";
import BraftEditor from "braft-editor";
const ChatRecords = observer(() => {
  const globalStore = useGlobalStore();
  const chatStore = useChatStore();

  useEffect(() => {
    let node = document.querySelector("#R_chat_content");
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  });
  const getImgSrcList = (htmlText: string) => {
    let srcs: string[] = [];
    const valueRaw = BraftEditor.createEditorState(htmlText).toRAW(true)
    for (let key in valueRaw.entityMap) {
      if (valueRaw.entityMap[key].type === 'IMAGE') {
        srcs.push(valueRaw.entityMap[key].data.url);
      }
    }
    return srcs;
  }

  return (
    <div className="chat-records-wrapper">
      {chatStore.chat.currentRecords.map((item) =>
        <div className={`message${item.fromId === globalStore.user.userInfo.userId ? ' self' : ''}`} key={item._id}>
          <div className="message-wrapper">
            <div className="message-content">
              {item.fromId !== globalStore.user.userInfo.userId && chatStore.chat.userId.includes('group') ?
                <h6>{item.nickname}</h6> : null}
              {
                ['img', 'facebag'].includes(item.type)
                  ? <Image src={item.message} alt={item.message} />
                  : <UIPreview srcList={getImgSrcList(item.message)}>
                    <div dangerouslySetInnerHTML={{ __html: item.message }} />
                  </UIPreview>
              }
            </div>
          </div>
          <div className="message-options">
            <div className="avatar">
              <img src={item.avatar} alt={item.nickname} />
            </div>
            <span className="message-date">{item.time}</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default ChatRecords;
