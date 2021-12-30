import { useRequest } from './http';

import { netcloundIP } from "@/common/constant";


/** 
 * 获取一个二维码登录的key  
 */
export const useGetQrKey = () => useRequest(`${netcloundIP}/login/qr/key`, { method: 'get' });

/**
 * 根据key生成二维码
 */
export const useGetQrBase64 = () => useRequest(`${netcloundIP}/login/qr/create`, { method: 'get' });

/**
 * 检查二维码是否过期
 */
export const useGetCheckQr = () => useRequest(`${netcloundIP}/login/qr/check`, { method: 'get' });

/**
 * 获取登录状态
 */
export const useGetStatus = () => useRequest(`${netcloundIP}/login/status`, { method: 'get' });

/**
 * 获取用户详情 /user/playlist
 */
export const useGetUserDetail = () => useRequest(`${netcloundIP}/user/detail`, { method: 'get' });

/**
 * 获取用户歌单
 */
export const useGetUserPlayList = () => useRequest(`${netcloundIP}/user/playlist`, { method: 'get' });


/**
 * 获取歌单详情
 */
 export const useGetPlayListDetail = () => useRequest(`${netcloundIP}/playlist/detail`, { method: 'get' });
/**
 * 获取用户用户日推列表
 */
export const useGetSongList = () => useRequest(`${netcloundIP}/recommend/songs`, { method: 'get' });

/**
 * 获取歌曲url
 */

export const useGetSongUrl = () => useRequest(`${netcloundIP}/song/url`, { method: 'get' });

/**
 * 获取歌曲/lyric
 */
export const useGetSongLrc = () => useRequest(`${netcloundIP}/lyric`, { method: 'get' });

/**
 * 默认单曲搜索 cloudsearch
 */
export const useGetCloundSearch = () => useRequest(`${netcloundIP}/cloudsearch`, { method: 'get' });

/**
 * 获取歌曲详情
 */
export const useGetSongDetail = () => useRequest(`${netcloundIP}/song/detail`, { method: 'get' });

/**
 * 批量请求接口
 */
 export const useBatchRequest = () => useRequest(`${netcloundIP}/batch`, { method: 'post' });