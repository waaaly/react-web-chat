import React, { useState, useEffect, useCallback } from "react"
import { Modal, Card, Avatar, Table, PageHeader, message } from 'antd'
import {
    useGetUserPlayList,
    useGetPlayListDetail,
    useGetSongDetail,
    useGetSongUrl,
    useGetSongLrc
} from '@/App/httpClientRequest/netcloundApi';
import { getNetCloundId } from "@/App/utils/operatorLocalStorage";
import { CaretRightOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import './index.less'
export function NCPlayList(props) {
    const { request: getUserPlayList } = useGetUserPlayList();

    const { request: getSongDetail } = useGetSongDetail();
    const [playList, setPlayList] = useState<any>([]);
    const [curPlayList, setCurPlayList] = useState<any>(null)


    useEffect(() => {

        if (props.visiable) {
            (
                async () => {
                    let res = (await getUserPlayList({ uid: getNetCloundId() })).data
                    console.log(res)
                    setPlayList(res.playlist)
                }
            )();
        }

        return () => {

        }
    }, [props.visiable])

    return (
        <Modal
            title={`我的歌单`}
            centered={true}
            destroyOnClose={true}
            visible={props.visiable}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            width={750}
            bodyStyle={{ minHeight: '400px', maxHeight: '600px', overflowY: 'scroll' }}
            onCancel={() => { props.setVisiable() }}
        >
            {
                curPlayList === null &&
                <div className="play-list-container">
                    {
                        playList.map(item => {
                            return (
                                <Card key={item.id}
                                    hoverable
                                    className="play-list-card"
                                    cover={<img onClick={() => { setCurPlayList(item.id) }} src={item.coverImgUrl} />}
                                    actions={[
                                        <div className="card-action-item">标签：{item.tags}</div>,
                                        <div className="card-action-item">歌曲：{item.trackCount}</div>,
                                        <div className="card-action-item">播放：{item.playCount}</div>,
                                    ]}
                                >
                                    <Card.Meta
                                        avatar={<Avatar src={item.creator.avatarUrl} />}
                                        title={item.name}
                                        description={item.description}
                                    />
                                </Card>
                            )
                        })
                    }
                </div>
            }

            {
                curPlayList !== null &&
                <PlayListDetail {...props} curPlayListId={curPlayList} onBack={() => setCurPlayList(null)} />
            }
        </Modal>
    )
}

function PlayListDetail(props) {
    const columns = [
        {
            title: '音乐标题',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '歌手',
            key: 'artist',
            render: (item) => {
                return (
                    <div key={'artist'}>{item.ar[0].name}</div>
                )
            }
        },
        {
            title: '专辑',
            key: 'album',
            render: (item) => {
                return (
                    <div key={'album'}>{item.al.name}</div>
                )
            }
        },
        {
            // 
            title: '时长',
            key: 'duration',
            render: (item) => {
                let min = parseInt((item.dt % 3600) / 60 + ''),
                    sec = Math.ceil(item.dt % 60)
                return (
                    <div key={'duration'}>{min}:{sec}</div>
                )
            }
        },
        {
            title: '操作',
            key: 'action',
            width: '80px',
            render: (item) => {
                return (
                    <div key={'duration'}>
                        <CaretRightOutlined onClick={() => onClickPlay(item.id)} />
                        <VerticalAlignBottomOutlined onClick={() => onClickDownload(item.id)} />
                    </div>
                )
            }
        }
    ];

    const { request: getSongDetail } = useGetSongDetail()
    const { request: getPlayListDetail } = useGetPlayListDetail();
    const { request: getSongUrl } = useGetSongUrl()
    const { request: getSongLrc } = useGetSongLrc()
    const [playListDetail, setPlayListDetail] = useState<any>(null)
    async function getUrl(id: string) {

        let res = (await getSongUrl({ id })).data.data
        console.log(res)
        return res[0].url
    }
    async function getLrc(id: string) {
        let res = (await getSongLrc({ id })).data
        console.log(res)
        return res.lrc.lyric;
    }
    async function getAudio(id) {
        let song = (await getSongDetail({ ids: id })).data.songs[0]
        return {
            name: song.name,
            artist: song.ar[0].name,
            url: '',
            cover: song.al.picUrl,
            lrc: '',
            theme: ''
        }
    }
    async function onClickPlay(id) {
        let audio = await getAudio(id)
        audio.url = await getUrl(id)
        audio.lrc = await getLrc(id)
        props.player.list.add(audio);
        console.log(audio)
    }
    async function onClickDownload(id) {

    }

    useEffect(() => {
        (
            async () => {
                let res = (await getPlayListDetail({ id: props.curPlayListId })).data
                setPlayListDetail(res)
            }
        )()

    }, [props.curPlayListId])

    return (
        <div className="play-list-detail">
            <PageHeader
                onBack={() => { props.onBack() }}
                title={playListDetail?.playlist.name}
                subTitle={playListDetail?.playlist.description}
            />
            {
                playListDetail !== null &&
                <Table rowKey='id' columns={columns} dataSource={playListDetail.playlist.tracks} />
            }
        </div>
    )
}

