/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-10-20 16:39:07
 * @LastEditTime: 2021-10-25 09:51:10
 */
import { useRequest } from './http';

import { apiIp } from "@/common/constant";

/*
* 用户登录
* @param {Object} params 登录参数
* @requestMethod POST
* */
export const useLogin = () => useRequest(`${apiIp}/api/login`, { method: 'post' });

/*
* 用户注册
* @param {Object} params 注册参数
* @requestMethod POST
* */
export const useRegister = () => useRequest(`${apiIp}/api/register`, { method: 'post' });

/*
* 获取用户注册时所需头像
* @requestMethod POST
* */
export const useGetAvatar = () => useRequest(`${apiIp}/api/getAvatar`, { method: 'get' });

/**
 * 修改用户头像
 * @requestMethod POST
 */

export const useSetAvatar = () => useRequest(`${apiIp}/api/setavatar`, { method: "post" })

/**
 * 用户上传头像
 * @requestMethod POST
 */

 export const useUploadAvatar = () => useRequest(`${apiIp}/api/uploadAvatar`, { method: "post" })

/*
* 获取个人信息
* @requestMethod GET
* */
export const useMyInfo = () => useRequest(`${apiIp}/api/getUserInfo`, { method: 'get' });

/*
* 获取所有用户信息
* @requestMethod GET
* */
export const useUserInfo = () => useRequest(`${apiIp}/api/getAllUser`, { method: 'get' });


/*
* 获取群聊天记录
* @requestMethod GET
* */
export const useRoomRecords = () => useRequest(`${apiIp}/api/getRoomRecords`, { method: 'get' });

/*
* 获取私人聊天记录
* @requestMethod GET
* */
export const usePrivateRecords = () => useRequest(`${apiIp}/api/getPrivateRecords`, { method: 'get' });

/**
 * 获取表情包
 */
export const useGetFacebag = () => useRequest(`${apiIp}/api/getFacebag`, { method: 'get' });

/**
 * 删除单个表情包
 */
export const useDeleteFacebag = () => useRequest(`${apiIp}/api/deleteFacebag`, { method: 'delete' });

/**
 * 获取服务器本地歌曲
 */
export const useGetMusic = () => useRequest(`${apiIp}/api/getMusic`, { method: 'get' });