import React, { useImperativeHandle } from 'react'
import {
    useGetSongUrl,
    useGetSongLrc,
    useGetCloundSearch

} from '@/App/httpClientRequest/netcloundApi';
import { useMgGetSearch, useMgGetSongInfo, useMgGetSongLrc } from "@/App/httpClientRequest/miguMusicApi";
import { useQQGetSearch, useQQGetSongInfo, useQQGetSongLrc } from "@/App/httpClientRequest/qqMusicApi";
interface Song {
    id: String,
    name: String,
    albumname: String,
    artist: String,
    cover: String
}

export const SongTool = React.forwardRef((props, ref) => {
    const { request: getNcSearch } = useGetCloundSearch();
    const { request: getMgSearch } = useMgGetSearch();
    const { request: getQQSearch } = useQQGetSearch();

    const { request: getNcUrl } = useGetSongUrl();
    const { request: getMgUrl } = useMgGetSongInfo();
    const { request: getQQUrl } = useQQGetSongInfo();

    const { request: getNcLrc } = useGetSongLrc();
    const { request: getMgLrc } = useMgGetSongLrc();
    const { request: getQQLrc } = useQQGetSongLrc();

    async function SearchSong(type: string, value: string): Promise<Array<Song>> {
        let songList: Array<Song> = [], res: any, song: any = {};
        switch (type) {
            case '1':
                res = (await getNcSearch({ keywords: value })).data.result;
                if (res !== {}) {
                    res.songs.forEach(item => {
                        song.albumname = item.al.name;
                        song.artist = item.ar[0].name;
                        song.id = item.id;
                        song.name = item.name;
                        song.cover = item.al.picUrl;
                        songList.push(song);
                        song = {};
                    });
                }
                break;
            case '2':
                res = (await getMgSearch({ keyword: value })).data.data;
                res.list.forEach(item => {
                    song.albumname = item.album.name;
                    song.artist = item.artists[0].name;
                    song.id = item.id;
                    song.name = item.name;
                    song.cover = item.album.picUrl;
                    songList.push(song);
                    song = {};
                });
                break;
            case '3':
                res = (await getQQSearch({ key: value })).data.data;
                res.list.forEach(item => {
                    song.albumname = item.albumname;
                    song.artist = item.singer[0].name;
                    song.id = item.songmid;
                    song.name = item.songname;
                    song.cover = ''
                    songList.push(song);
                    song = {};
                });
                break;
        }
        return songList
    }
    async function SongUrl(type: string, value: string): Promise<string> {
        let url: string = ''
        switch (type) {
            case '1':
                url = (await getNcUrl({ id: Number(value) })).data.data[0].url;
                break;
            case '2':
                url = (await getMgUrl({ cid: value })).data.data['320'];
                break;
            case '3':
                url = (await getQQUrl({ id: value })).data.data
                break;
        }
        return url
    }
    async function SongLrc(type: string, value: string): Promise<string> {
        let lrc: string = ''
        switch (type) {
            case '1':
                lrc = (await getNcLrc({ id: Number(value) })).data.data.lrc.lyuic;
                break;
            case '2':
                lrc = (await getMgUrl({ cid: value })).data.data.lyric;
                break;
            case '3':
                lrc = (await getQQLrc({ songmid: value })).data.data.lyric;
                break;
        }
        return lrc
    }
    useImperativeHandle(ref, () => ({
        SearchSong,
        SongUrl,
        SongLrc,
    }))
    return null
})