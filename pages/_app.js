import parseCookies from '@/libs/cookies/parseCookie';
import { loginFailed, updateUser } from '@/libs/slices/LoginSlice';
import getHeaders from '@/libs/utils/getHeaders';
import { Provider } from 'react-redux';
import axios from 'axios';
import '@/styles/globals.css'

export default function MainAPP({ Component, pageProps }) {
  if (isServer) {
    const {
      userData, userData: { isLoggedIn, mode },
    } = initialProps;
    if (isLoggedIn) {
      store.dispatch(updateUser(userData));
    } else {
      store.dispatch(loginFailed());
      if (typeof window !== 'undefined') {
        if (!window.location.pathname.includes('login')) {
          window.location.replace('/admin/login/');
        }
      }
    }
  }
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}


MainAPP.getInitialProps = async ({ ctx }) => {
  const isServer = typeof window === 'undefined';
  const { req, res } = ctx;

  if (isServer) {
    const { headers: { host } } = req;
    const cookies = parseCookies(req);
    const cookieName = process.env.COOKIE_NAME || 'hawk-eye-token';
    const accessToken = cookies[cookieName] || '';

    const headers = getHeaders(accessToken);
    try {
      const { data: userData } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/user/`, { headers });
      return {
        isServer, userData: { ...userData, isLoggedIn: true },
      };
    } catch (error) {
      return { isServer, userData: { isLoggedIn: false } };
    }
  }
  return { isServer, userData: { isLoggedIn: false } };
};
