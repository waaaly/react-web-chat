import React, { useState, useEffect } from "react"
import { Modal } from 'antd'
import { useGetQrKey, useGetQrBase64, useGetCheckQr, useGetStatus } from '@/App/httpClientRequest/netcloundApi';
import { setNetCloundId } from "@/App/utils/operatorLocalStorage";
import './index.less'
export function NCLogin(props) {

    return (
        <Modal
            title={`登录网易云`}
            centered={true}
            destroyOnClose={true}
            visible={props.visiable}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            width={800}
            onCancel={() => { props.setVisiable() }}
        >
            <QRLogin />
        </Modal>
    )
}

export function QRLogin() {
    const [qrImg, setQrImg] = useState('http://1.12.246.138:4000/picture/loading.gif');
    const [tipMsg, setTipMsg] = useState('使用网易云App扫码登录')
    const { request: getQrkey } = useGetQrKey()
    const { request: getQrBase64 } = useGetQrBase64()
    const { request: getCheckQr } = useGetCheckQr()
    const { request: getStatus } = useGetStatus()
    let timer: any, qrCode: any;

    async function createQr() {
        let keyRes = (await getQrkey({ timerstamp: Date.now() })).data.data;
        console.log(keyRes)
        let qrRes = (await getQrBase64({
            key: keyRes.unikey,
            qrimg: true,
            timerstamp: Date.now()
        })).data.data;
        console.log(qrRes)
        setQrImg(qrRes.qrimg)
        checkQrTimer(keyRes.unikey)
    }

    function checkQrTimer(key) {
        timer = setInterval(async () => {
            let checkRes = (await getCheckQr({ key, timerstamp: Date.now() })).data;
            console.log(checkRes)
            setTipMsg(checkRes.message)
            switch (checkRes.code) {
                // 过期
                case 800:
                    setTipMsg('二维码过期，请点击重新加载')
                    qrCode = 800
                    clearInterval(timer)
                    break;
                // 等待扫码
                case 801:
                    break;
                // 等待确认
                case 802:
                    break;
                // 授权登录成功
                case 803:
                    setTipMsg('授权登录成功')
                    clearInterval(timer)
                    let useInfo = (await getStatus({ timerstamp: Date.now() })).data.data
                    console.log(useInfo)
                    setNetCloundId(useInfo.account.id)
                    break;
            }
        }, 5000)

    }
//     anonimousUser: false
// ban: 0
// baoyueVersion: 0
// createTime: 1489226473866
// donateVersion: 0
// id: 435984810
// paidFee: false
// status: 0
// tokenVersion: 0
// type: 5
// userName: "5_B1F6F86AF7AB70B58481DC3ED0C4180B"
// vipType: 0
// whitelistAuthority: 0
    function onClickQrImg() {
        if (qrCode === 800) {
            createQr()
        }
    }
    useEffect(() => {
        createQr()
        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className="qrlogin-container">
            <h3>扫码登陆</h3>
            <img onClick={() => { onClickQrImg() }} src={qrImg} />
            <div >{tipMsg}</div>
        </div>
    )
}