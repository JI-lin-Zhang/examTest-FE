import { auth, callback } from "./api";
import { adminRoutes } from "./router";

export const numToChar = (num: number): string => {
  if (num >= 0) return String.fromCharCode(65 + num);
  return '';
};

export const getToken = () => {
  if (localStorage.getItem('userInfo')) {
    return JSON.parse(localStorage.userInfo).access_token;
  }
  return '';
};

export const isLogin = (): boolean => {
  return !!getToken();
}

export const isInAdminRoute = () => {
  return adminRoutes.children.some(child => child.path === location.pathname.split('/admin/')[1]) || location.pathname === adminRoutes.path;
}

export const verify = async () => {

  const session_state = new URLSearchParams(location.search).get("session_state");

  const code = new URLSearchParams(location.search).get("code");

  if (!code || !session_state) {
    const url = await auth();
    location.replace(url);
  } else {
    const userInfo = await callback({
      session_state,
      code,
    })

    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    location.replace(location.origin + '/admin');
  }
};
