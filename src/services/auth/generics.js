import getHeaders from "@/libs/utils/getHeaders";
import axiosInstance from "./config";


export const parseObjToQuery = (queryObj) => {
  if (queryObj && Object.keys(queryObj).length) {
    const parsedQuery = Object.keys(queryObj).map((mapItem) => {
      if (!queryObj[mapItem]) {
        return null;
      }
      return `&${mapItem}=${queryObj[mapItem]}`;
    });
    return parsedQuery.join('').slice(1);
  }
  return '';
};

export function axiosErrorHelper(error) {
  const err = error;
  const response = err.response ;
  const { data, status, statusText } = response;
  let errors = {};
  if (status === 400 && data && Object.keys(data).length > 0) {
    errors = data;
  } else {
    errors.nonFieldErrors = [statusText, 'Please try later'];
  }
  return errors;
}

export async function genericGetService(APIEndpoint, accessToken) {
  const headers = getHeaders(accessToken);
  try {
    return { data: await axiosInstance.get(APIEndpoint, { headers }) };
  } catch (error) {
    return { errors: axiosErrorHelper(error) };
  }
}

const genericFormService = async (
  action,
  APIEndpoint,
  accessToken,
  postData,
) => {
  const headers = getHeaders(accessToken);
  try {
    return {
      data: await axiosInstance[action](APIEndpoint, postData, { headers }),
    };
  } catch (errors) {
    console.log('errors in generics', errors);
    return { errors: axiosErrorHelper(errors) };
  }
};
export const genericDeleteService = async (APIEndpoint, accessToken) => {
  const headers = getHeaders(accessToken);
  try {
    return {
      data: await axiosInstance.delete(APIEndpoint, { headers }),
    };
  } catch (errors) {
    return { errors: axiosErrorHelper(errors) };
  }
};

export function getPagesService(APIEndPoint) {
  return genericGetService(APIEndPoint);
}

export default genericFormService;
