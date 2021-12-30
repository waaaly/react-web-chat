import React, { useState } from 'react';
import { Upload, Button, message, Modal, Tooltip } from 'antd';
import { PictureOutlined, SettingOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getToken } from "@/App/utils/operatorLocalStorage";
import { useDeleteFacebag } from "@/App/httpClientRequest/useApi";
import './index.less'
const uploadProp = {
    showUploadList: false,
    action: "http://1.12.246.138:3000/api/",
    headers: {
        Authorization: getToken(),
    },
}

export function SendPicture(props) {
    const upload = {
        ...uploadProp,
        name: 'picture',
        action: uploadProp.action + 'savePicture',
        maxCount: 1,
        beforeUpload: file => {
            console.log(file)
            var reg = /\/(png|jpg|gif|jpeg|webp)$/;
            if (!reg.test(file.type)) {
                message.error(`暂不支持的文件格式`);
                return false
            }
            return true
        },
        onChange: (e) => {
            var { file } = e
            if (file.status === 'done') {
                var { filename } = file.response
                console.log(filename)
                return props.onUploadSuccess(`http://1.12.246.138:4000/picture/${filename}`)
            }
        }
    }

    return (
        <Upload {...upload}>
            <Button className="chat-tool-btn">
                <PictureOutlined />
            </Button>
        </Upload>
    )
}

export function ManageFaceBag(props) {
    const [visiable, setVisiable] = useState(false)
    const { request: deleteFacebag } = useDeleteFacebag();

    async function deleteRequest(addr: string) {
        var addSplit = addr.split('/')
        var filename = addSplit[addSplit.length - 1]

        var res = (await deleteFacebag({ filename })).data
        console.log(res)
        if (res.data) {
            props.onDeleteSuccess(addr)
            message.success(res.message)
        }
    }
    return (
        <div>
            <Button className="chat-tool-btn" onClick={() => { setVisiable(true) }}>
                <SettingOutlined />
            </Button>
            <Modal
                title={`表情管理(${props.facebagList.length})`}
                centered
                visible={visiable}
                onOk={() => { setVisiable(false) }}
                cancelButtonProps={{ style: { display: 'none' } }}
                width={1000}
            >
                <div>
                    {
                        props.facebagList.map(item => {
                            return (
                                <Tooltip key={item} placement="topRight" color={"red"}
                                    title={
                                        <div onClick={() => { deleteRequest(item) }}>
                                            <CloseCircleOutlined />
                                        </div>
                                    }>
                                    <img className="facebag-img" src={item} />
                                </Tooltip>
                            )
                        })
                    }
                </div>
            </Modal>
        </div>
    )
}

export function SendFile() {

}

