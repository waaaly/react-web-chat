/*
 * @Description: 
 * @Author: waaaly
 * @Github: https://github.com/waaaly
 * @Date: 2021-10-20 16:39:07
 * @LastEditTime: 2021-10-21 15:02:51
 */
import React from 'react';
import {useLocalStore} from 'mobx-react-lite';
import {getToken, removeToken} from "@/App/utils/operatorLocalStorage";
import io from 'socket.io-client';
import {socketIp} from "@/common/constant";


interface userInfo {
  userId: string,
  nickname: string,
  avatar: string
}

interface userState {
  token: string,
  userInfo: userInfo,
  allUserList: any[],
}

let state: userState = {
  token: getToken(),
  userInfo: {
    userId: '',
    nickname: '',
    avatar: ''
  },
  allUserList: [],
};

interface userStore {
  user: userState,
  socket: any,

  logout(): void
}

function createStore(): userStore {
  return {
    user: state,
    socket: io(socketIp),
    logout(): void {
      removeToken();
      this.user.token = '';
    }
  };
}

const storeContext = React.createContext<userStore>({} as any);


export const StoreProvider = ({children}: { children: any }) => {
  const store = useLocalStore(createStore);
  return <storeContext.Provider value={store}> {children}</storeContext.Provider>;
};

export const useGlobalStore = (): userStore => {
  const store: any = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};


