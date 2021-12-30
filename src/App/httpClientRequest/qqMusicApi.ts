import { useRequest } from './http';

import { QQMusicIP } from "@/common/constant";
/**
 * api文档地址 https://qq-api-soso.vercel.app/#/?id=%e6%90%9c%e7%b4%a2-1
 */

/**
 * 接口：搜索
 * 参数：
 * key: 关键词 必填

 * pageNo: 页码，默认 1

 * pageSize: 一页返回数量，默认 20

 * t: 搜索类型 默认为 0 // 0：单曲，2：歌单，7：歌词，8：专辑，9：歌手，12：mv
 * 示例：/search?key=周杰伦
 */
export const useQQGetSearch = () => useRequest(`${QQMusicIP}/search`, { method: 'get' });

/**
 * 接口: 获取单个歌曲信息，不包含歌词
 * 参数：
 *  songmid ：歌曲id
 */
export const useQQGetSongInfo = () => useRequest(`${QQMusicIP}//song/url`, { method: 'get' });

/**
 * 接口: 获取单个歌曲歌词
 * 参数：
 *  songmid ：歌曲id
 */
 export const useQQGetSongLrc = () => useRequest(`${QQMusicIP}/lyric`, { method: 'get' });

