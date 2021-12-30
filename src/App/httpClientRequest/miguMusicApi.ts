import { useRequest } from './http';

import { MiGuMusicIP } from "@/common/constant";

/**
 * api文档地址 https://jsososo.github.io/MiguMusicApi/#/?id=node-%e6%9c%8d%e5%8a%a1
 */

/**
 * 接口：搜索
 * 参数：
 * keyword: 搜索关键词 必填

 * type: 默认 song，支持：song, playlist, mv, singer, album, lyric

 * 0：单曲，2：歌单，7：歌词，8：专辑，9：歌手，12：mv
 * pageNo: 默认 1
 */
 export const useMgGetSearch = () => useRequest(`${MiGuMusicIP}/search`, { method: 'get' });

 /**
  * 接口: 获取单个歌曲信息，包含url 和 lrc
  * 参数：
  *  cid ：歌曲id
  */
 export const useMgGetSongInfo = () => useRequest(`${MiGuMusicIP}/song`, { method: 'get' });
 
 /**
  * 接口: 获取单个歌曲歌词
  * 参数：
  *  cid ：歌曲id
  */
  export const useMgGetSongLrc = () => useRequest(`${MiGuMusicIP}/lyric`, { method: 'get' });