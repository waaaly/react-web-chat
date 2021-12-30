import { useRequest } from './http';

import { apiIp } from "@/common/constant";
/*
* 保存一个音频
* @param {Object} audio 音频对象
* @requestMethod POST
* */
export const useSaveAudio = () => useRequest(`${apiIp}/api/audio/save`, { method: 'post' });

/**
 * 获取所有音频列表
 */
export const useGetAudioList = () => useRequest(`${apiIp}/api/audio/list`, { method: 'get' });