// 保存在 localStorage 中的 token 字段名
const TokenKey: string = 'authorization';
// 保存在 localStorage 中的 active 字段名
const ActiveKey: string = 'chatUserActive';
const netcloundUserId:string = 'netclounduserid'
/**
 * 获取 token
 */
export function getToken(): string {
  return localStorage.getItem(TokenKey) as string;
}

/**
 * 设置 token
 * @param token:string
 */
export function setToken(token: string): void {
  return localStorage.setItem(TokenKey, token);
}

/**
 * 移除 token
 */
export function removeToken(): void {
  return localStorage.removeItem(TokenKey);
}

/**
 * 设置当前聊天用户的 id
 * @param active
 */
export function setChatUserActive(active: string): void {
  return localStorage.setItem(ActiveKey, active);
}

/**
 * 获取当前聊天用户的 id
 */
export function getChatUserActive(): string {
  return localStorage.getItem(ActiveKey) as string;
}

/**
 * 设置网易云账号id
 */
 export function setNetCloundId(uid: string): void {
  return localStorage.setItem(netcloundUserId, uid);
}
/**
 * 获取网易云账号id
 */
 export function getNetCloundId(): string {
  return localStorage.getItem(netcloundUserId) as string;
}