import React, { useState, useEffect, useCallback } from "react"
import { Modal, List, Avatar, Button, Table, Input, message, Tabs } from 'antd'
import {
    useGetSongList,
    useGetSongUrl,
    useGetSongLrc,
    useGetCloundSearch,
    useGetSongDetail,

} from '@/App/httpClientRequest/netcloundApi';
import { useMgGetSearch } from "@/App/httpClientRequest/miguMusicApi";
import { useQQGetSearch } from "@/App/httpClientRequest/qqMusicApi";
import { useSaveAudio } from "@/App/httpClientRequest/audioApi";
import { CaretRightOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { getNetCloundId } from "@/App/utils/operatorLocalStorage";
import { useGlobalStore } from "@/App/store/GlobalStore";
import { SongTool } from "../SongTool";
import './index.less'
export function NCSongList(props) {

    return (
        <Modal
            title={props.child === 'daily' ? '每日推荐' : `歌曲搜索`}
            centered={true}
            destroyOnClose={true}
            visible={props.visiable}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            width={800}
            bodyStyle={{ minHeight: '400px', maxHeight: '600px', overflowY: 'scroll' }}
            onCancel={() => { props.setVisiable() }}
        >
            {
                props.child === 'daily' &&
                <DailySong player={props.player} />
            }
            {
                props.child === 'search' &&
                <SearchSong player={props.player} />
            }

        </Modal>
    )
}

function DailySong(props) {
    const [list, setList] = useState<any>([])
    const { request: getSongList } = useGetSongList()
    const { request: getSongUrl } = useGetSongUrl()
    const { request: getSongLrc } = useGetSongLrc()


    useEffect(() => {
        (
            async () => {
                let res = (await getSongList({ uid: getNetCloundId(), timerstamp: Date.now() })).data.data
                console.log(res)
                if (res.code === 301) {
                    message.warn('需要重新扫码登录')
                } else {
                    setList(res.dailySongs)
                }
            }
        )()

        return () => {

        }
    }, [])

    function createAudio(song) {
        return {
            name: song.name,
            artist: song.ar[0].name,
            url: '',
            cover: song.al.picUrl,
            lrc: '',
            theme: ''
        }
    }
    async function getUrl(id: string) {

        let res = (await getSongUrl({ id: id })).data.data
        console.log(res)
        return res[0].url
    }
    async function getLrc(id: string) {
        let res = (await getSongLrc({ id: id })).data
        console.log(res)
        return res.lrc.lyric;
    }
    async function onClickPlay(song) {
        onClickAddList(song)
        setTimeout(() => {
            let index = props.player.list.audios.length - 1;
            console.log(props.player.list.audios, index)
            props.player.list.switch(index)
            props.player.play()
        }, 1000)
    }
    async function onClickAddList(song) {
        console.log(props)
        let url = await getUrl(song.id),
            lrc = await getLrc(song.id),
            audio = createAudio(song);
        audio.url = url;
        audio.lrc = lrc;
        props.player.list.add(audio);
    }
    return (
        <List
            className="daily-song"
            itemLayout="horizontal"
            dataSource={list}
            header={
                <div className="daily-song-header">
                    <div className="header-name">音乐标题</div>
                    <div className="header-artist">歌手</div>
                    <div className="header-action">操作</div>
                </div>
            }
            renderItem={(item: any) => {
                return (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.al.picUrl} />}
                            title={
                                <div className="song-title-bar">
                                    <div className="song-name">{item.name}</div>
                                    <div className="song-artist">{item.ar[0].name}</div>
                                    <div className="song-action-right">
                                        <Button onClick={() => { onClickPlay(item) }}>播放</Button>
                                        <Button onClick={() => { onClickAddList(item) }}>加入列表</Button>
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )
            }}
        />
    )
}

function SearchSong(props) {
    const { request: getCloundSearch } = useGetCloundSearch();
    const { request: getQQSerach } = useQQGetSearch();
    const { request: getMgSearch } = useMgGetSearch();
    const { request: getSongUrl } = useGetSongUrl();
    const { request: getSongLrc } = useGetSongLrc();
    const { request: getSongDetail } = useGetSongDetail();
    const { request: saveAudio } = useSaveAudio();
    const globalStore = useGlobalStore();
    const [holderText, setHolderText] = useState("在网易云搜索");
    const [searchKey, setSearchKey] = useState('1');
    const SongToolRef = React.createRef<any>()
    const columns = [
        {
            title: '音乐标题',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '歌手',
            key: 'artist',
            dataIndex: 'artist',
        },
        {
            title: '专辑',
            key: 'albumname',
            dataIndex: 'albumname',
        },
        // {
        //     // 
        //     title: '时长',
        //     key: 'duration',
        //     render: (item) => {
        //         let min = parseInt((item.dt % 3600) / 60 + ''),
        //             sec = Math.ceil(item.dt % 60)
        //         return (
        //             <div key={'duration'}>{min}:{sec}</div>
        //         )
        //     }
        // },
        {
            title: '操作',
            key: 'action',
            width:'100px',
            render: (item) => {
                return (
                    <div key={'duration'}>
                        <CaretRightOutlined onClick={() => onClickPlay(item)} />
                        <VerticalAlignBottomOutlined onClick={() => onClickDownload(item.id)} />
                    </div>
                )
            }
        }
    ];

    const [songList, setSongList] = useState([])
    async function onSearch(value) {
        let songList = await SongToolRef.current.SearchSong(searchKey, value)

        // console.log(songList)
        setSongList(songList)
    }
    async function onClickPlay(item) {
        let url = await SongToolRef.current.SongUrl(searchKey, item.id);
        let lrc = await SongToolRef.current.SongLrc(searchKey, item.id);
        item.url = url;
        item.lrc = lrc;
        props.player.list.add(item);
    }
    async function onClickDownload(id) {
        // let audio = await getAudio(id)
        // audio.url = await getUrl(id)
        // audio.lrc = await getLrc(id)
        // let res = (await saveAudio({ audio })).data.data;
        // console.log(res)
        message.info("小哥正在努力加班开发😷😷~~~")
    }
    function onTabChange(key: string) {
        let text = ''
        switch (key) {
            case '1':
                text = '在网易云搜索';
                break;
            case '2':
                text = '在咪咕音乐搜索';
                break;
            case '3':
                //text = '在QQ音乐搜索';
                message.info("暂不支持老马🤪🤪~~~")
                return;
        }
        setHolderText(text);
        setSearchKey(key);
    }
    return (
        <div >
            <SongTool ref={SongToolRef} />
            <Tabs onChange={onTabChange} defaultActiveKey="1" type="card" size={"middle"}>
                <Tabs.TabPane tab="网易云" key="1" />
                <Tabs.TabPane tab="咪咕音乐" key="2" />
                <Tabs.TabPane tab="QQ音乐" key="3" />
            </Tabs>
            <Input.Search placeholder={holderText} onSearch={onSearch} enterButton />
            <Table rowKey='id' columns={columns} dataSource={songList} />

        </div>
    )
}