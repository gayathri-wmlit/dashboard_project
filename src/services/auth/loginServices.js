import genericFormService, { axiosErrorHelper } from "./generics";


export async function loginProxyService(postData,) {
  return genericFormService('post', '/auth/login', postData);
}

export async function loginService(email, password) {
  try {
    const { data } = await Axios.post('/api/login', { storeUid, email, password });
    return { data };
  } catch (error) {
    return axiosErrorHelper((errors));
  }
}
