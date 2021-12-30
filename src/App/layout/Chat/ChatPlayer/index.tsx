import React, { useEffect, useState } from 'react';
import APlayer from 'aplayer'
import { useGetMusic } from "@/App/httpClientRequest/useApi";
import { useGetAudioList } from '@/App/httpClientRequest/audioApi';
import { NCLogin } from '@/App/pages/NetClound/NCLogin'
import { NCPlayList } from '@/App/pages/NetClound/NCPlayList'
import { NCSongList } from '@/App/pages/NetClound/NCSongList'
import { getNetCloundId } from "@/App/utils/operatorLocalStorage";
import './index.less'
import { Button, message } from 'antd';
import ColorThief from './color-thief'
export function ChatPlayer() {
    const option = {
        mini: false,
        autoplay: false,
        theme: '#90EE90',
        loop: 'all',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: '100px',
        lrcType: 1, // 1：js字符串；3：lrc文件
    }
    const { request: getMusic } = useGetMusic()
    const { request: getAudioList } = useGetAudioList()
    const [ncLogin, setNclogin] = useState(false)
    const [ncPlayList, setNcPlayList] = useState(false)
    const [ncSongList, setNcSongList] = useState(false)
    const [songListChild, setSongListChild] = useState("")
    const [player, setPlayer] = useState<any>(null)

    function setTheme(ap, index) {
        const colorThief = new ColorThief()

        let img = process.env.NODE_ENV === 'development' ? '' : ap.list.audios[index].cover
        colorThief.getColorFromUrl(img, 'hex').then(res => {
            console.log(res)
            ap.theme(res, index);
        }).catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        const ap = new APlayer({ ...option, container: document.getElementById('player') });
        ap.on("listswitch", (e) => {
            let { index } = e
            // console.log(index, ap)
            if (ap.list.audios[index].cover) {
                setTheme(ap, index)
            }
        })
        setPlayer(ap);
        (
            async () => {
                let { musicList } = (await getMusic()).data.data;

                let { audioList } = (await getAudioList()).data.data;
                ap.list.add([...musicList, ...audioList])
            }
        )();

    }, [])

    return (
        <div className="chat-player">
            <div className="net-clound-bar" >
                <Button onClick={() => { setNclogin(true) }}>登录</Button>
                <Button onClick={() => {
                    if (!getNetCloundId()) {
                        message.info('请先进行登录')
                        return
                    }
                    setNcPlayList(true)
                }}>我的歌单</Button>
                <Button onClick={() => {
                    if (!getNetCloundId()) {
                        message.info('请先进行登录')
                        return
                    }
                    setNcSongList(true); setSongListChild('daily')
                }}>日推歌曲</Button>
                <Button onClick={() => { setNcSongList(true); setSongListChild('search') }}>搜索</Button>
            </div >
            <div id="player"></div>

            <NCLogin visiable={ncLogin} setVisiable={() => { setNclogin(false) }} />
            <NCPlayList player={player} visiable={ncPlayList} setVisiable={() => { setNcPlayList(false) }} />
            <NCSongList player={player} child={songListChild} visiable={ncSongList} setVisiable={() => { setNcSongList(false) }} />

        </div >
    )
}