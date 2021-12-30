/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-10-20 16:39:07
 * @LastEditTime: 2021-10-25 13:51:58
 */
import React, { useState ,useEffect} from 'react';
import './index.less';
import { useHistory } from 'react-router';
import { useGlobalStore } from "@/App/store/GlobalStore";
import { useGetAvatar, useSetAvatar } from "@/App/httpClientRequest/useApi";
import { Observer } from 'mobx-react-lite';
import { message, Modal, Avatar, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { getToken } from '@/App/utils/operatorLocalStorage';
/**
 * 公共头部
 *
 */

function WeChatHeader(props) {
    const globalStore = useGlobalStore();
    const router = useHistory();
    const [visible, setVisible] = useState(false);
    const [avatarList, setAvatarList] = useState<string[]>([]);
    const [curAvatar, setCurAvatar] = useState(globalStore.user.userInfo.avatar)
    const { request: getAvatar } = useGetAvatar();
    const { request: setAvatar } = useSetAvatar();
    
    const uploadProp = {
        name: 'avatar',
        multiple: true,
        showUploadList: false,
        action: "http://1.12.246.138:3000/api/uploadAvatar",
        headers: {
            Authorization: getToken(),
        },
        onChange: (e: { file: any; }) => {
            console.log(e)
            let { file } = e
            if (file.status === 'done') {
                let { filename } = file.response
                console.log(filename)
                let list: string[] = [...avatarList]
                list.push(`http://1.12.246.138:4000/avatar/${filename}`)
                setAvatarList(list)
            }
        }
    }


    function onClickAvatar(src:string) {
        setCurAvatar(src)
    }
    async function openModal() {
        let list = (await getAvatar()).data.data;
        setAvatarList(list.avatarList)
        setVisible(true)
    }
    async function setAvatarRequest() {
        console.log(curAvatar, globalStore.user.userInfo.nickname)
        if (curAvatar !== '' && curAvatar !== globalStore.user.userInfo.avatar) {
            let res = await setAvatar({
                nickName: globalStore.user.userInfo.nickname,
                avatar: curAvatar
            })
            props.method(res)
            message.success(res.data.message)
        }
        setVisible(false)
    }

    return (
        <Observer>
            {() =>
                <div className="chat-header-wrapper">
                    <Modal
                        title="头像选择"
                        centered
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        onOk={() => setAvatarRequest()}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        width={1000}
                    >
                        <div>
                            {
                                avatarList.map(item => {
                                    return (
                                        <div style={{ cursor: 'pointer', display: 'inline-block', margin: '10px', border: `2px solid ${curAvatar === item ? '#1890ff' : 'transparent '}` }} key={item} onClick={() => onClickAvatar(item)}>
                                            <Avatar size={80} src={item} />
                                        </div>
                                    )
                                })
                            }
                            <Upload {...uploadProp}>
                                <div style={{cursor: 'pointer', display: 'inline-block', margin: '10px', border: '2px solid transparent' }}>
                                    <Avatar size={80} icon={<PlusOutlined  />} />
                                </div>
                            </Upload>
                        </div>
                    </Modal>
                    <div className="user-info-show">
                        <div className="user-info">
                            <img className='user-avatar' onClick={() => { openModal() }} src={globalStore.user.userInfo.avatar} alt="" />
                            <span className="nickname">{globalStore.user.userInfo.nickname}</span>
                        </div>
                        <div className="user-operator">
                            <ul className="operator-list">
                                <li className="operator-item" onClick={async () => {
                                    globalStore.logout();
                                    router.push("/");
                                    message.success('退出成功');
                                }
                                }>退出登录
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </Observer>

    );
}

export default WeChatHeader;