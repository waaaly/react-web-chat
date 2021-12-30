import React, { useRef, useState } from "react";
import './index.less';
import { Button, Form, Input } from "antd";
import {
  ArrowRightOutlined, SmileOutlined, HeartOutlined
} from '@ant-design/icons';
import { useGlobalStore } from "@/App/store/GlobalStore";
import { useChatStore } from "@/App/layout/Chat/ChatStore/ChatStore";
import { Picker } from "emoji-mart"
import 'emoji-mart/css/emoji-mart.css'
import { ChatFaceBag } from '../ChatFaceBag'
import { SendPicture } from '../ChatTool'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { ContentUtils } from 'braft-utils'
function ChatSend() {
  const globalStore = useGlobalStore();
  const chatStore = useChatStore();
  const socket = globalStore.socket;
  const [form] = Form.useForm();
  const [emojiVisiable, setemojiVisiable] = useState(false)
  const [farVisiable, setfarVisiable] = useState(false)
  const editorRef = useRef(null);
  function onEmojiVisiable() {
    setemojiVisiable(!emojiVisiable)
    setfarVisiable(false)
  }
  function onFarVisiable() {
    setemojiVisiable(false)
    setfarVisiable(!farVisiable)
  }
  
  const sendMessage = () => {
    let message = form.getFieldsValue().message;
    if (validatorEditor(message)) {
      let obj = {
        userId: globalStore.user.userInfo.userId,
        toId: '',
        avatar: globalStore.user.userInfo.avatar,
        nickname: globalStore.user.userInfo.nickname,
        message: BraftEditor.createEditorState(message).toHTML(),
        type: 'text'
      };
      if (chatStore.chat.userId.includes('group')) {
        socket.emit('sendToAll', obj);
      } else {
        obj.toId = chatStore.chat.userId;
        socket.emit('sendToPrivate', obj);
      }
      const e:any=editorRef.current;
      e.clearEditorContent();
    }
  };

  function sendFacebag(e) {
    console.log(e)
    let obj = {
      userId: globalStore.user.userInfo.userId,
      toId: '',
      avatar: globalStore.user.userInfo.avatar,
      nickname: globalStore.user.userInfo.nickname,
      message: e,
      type: 'facebag'
    };
    if (chatStore.chat.userId.includes('group')) {
      socket.emit('sendToAll', obj);
    } else {
      obj.toId = chatStore.chat.userId;
      socket.emit('sendToPrivate', obj);
    }
  }
  function sendPicture(e) {
    console.log(e)
    let obj = {
      userId: globalStore.user.userInfo.userId,
      toId: '',
      avatar: globalStore.user.userInfo.avatar,
      nickname: globalStore.user.userInfo.nickname,
      message: e,
      type: 'img'
    };
    if (chatStore.chat.userId.includes('group')) {
      socket.emit('sendToAll', obj);
    } else {
      obj.toId = chatStore.chat.userId;
      socket.emit('sendToPrivate', obj);
    }
  }
  //检测富文本是否内容为空/空行/空格
  const validatorEditor = (value: any) => {
    let isNull = true;
    let valueRaw = BraftEditor.createEditorState(value).toRAW(true)
    for (let i = 0; i < valueRaw.blocks.length; i++) {
      if (valueRaw.blocks[i].text.trim() || valueRaw.blocks[i].type === "atomic") {
        isNull = false;
        break;
      }
    }
    return !isNull;
  }
  const insertEmojisText = (e: any) => {
    form.setFieldsValue({
      message: ContentUtils.insertText(BraftEditor.createEditorState(form.getFieldsValue().message), e.native)
    })

  }

  const keyHandler = (cmd, state) => {
    if(cmd === 'split-block'){
      sendMessage();
      return 'handled'
    }
    return 'not-handled'
  }

  return (
    <div className="chat-send-wrapper" >
      <div className={emojiVisiable ? 'emoji-pop' : 'pop-none'}>
        <Picker onClick={insertEmojisText} />
      </div>
      <div className={farVisiable ? 'emoji-pop' : 'pop-none'}>
        <ChatFaceBag onSelect={sendFacebag} />
      </div>
      <div className="tool-bar">
        <Button className="btn-icon" onClick={onEmojiVisiable}>
          <SmileOutlined />
        </Button>
        <Button className="btn-icon" onClick={onFarVisiable}>
          <HeartOutlined />
        </Button>
        <SendPicture onUploadSuccess={sendPicture} />
      </div>
      <Form form={form} className="form-row">
        <Form.Item
          className="input-send"
          name="message"
        >
          <BraftEditor ref={editorRef} controls={['media']} handleKeyCommand={keyHandler}  onFocus={() => { setemojiVisiable(false); setfarVisiable(false) }} />
        </Form.Item>
        <Form.Item>
          <button className="btn-send" onClick={sendMessage}>
            <ArrowRightOutlined />
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChatSend