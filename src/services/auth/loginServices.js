import axios from "axios";
import genericFormService, { axiosErrorHelper } from "./generics";


export async function loginProxyService(postData) {
  return genericFormService('post', '/auth/login/','', postData);
}

export async function loginService(email, password) {
  try {
    const { data } = await axios.post('/api/login/', { email, password });
    return { data };
  } catch (errors) {
    console.log('errors', errors);
    return {errors: errors.response.data}
    // return axiosErrorHelper((errors));
  }
}
