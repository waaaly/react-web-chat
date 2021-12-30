/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-10-20 16:39:07
 * @LastEditTime: 2021-10-21 15:09:07
 */
const siteName: string = 'WebChat';
const footerText: string = 'WebChat 版权所有 © 2021 由 waaaly 支持';
const apiIp: string = 'http://1.12.246.138:3000';
const socketIp: string = 'http://1.12.246.138:4000';
const netcloundIP: string =
    process.env.NODE_ENV === 'development' ?
        'http://localhost:3000/netclound'
        : 'http://1.12.246.138:3000/netclound';
const MiGuMusicIP: string =
    process.env.NODE_ENV === 'development' ?
        'http://localhost:3000/migumusic'
        : 'http://1.12.246.138:3000/migumusic';
const QQMusicIP: string =
    process.env.NODE_ENV === 'development' ?
        'http://localhost:3000/qqmusic'
        : 'http://1.12.246.138:3000/qqmusic';
const sideWidth: number = 400;

export { siteName, footerText, apiIp, socketIp, sideWidth, netcloundIP, MiGuMusicIP, QQMusicIP };