import axios, { AxiosRequestConfig } from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const subkeyApiKey = import.meta.env.VITE_SUBKEY_API_KEY;

export const axiosRequest = async <T>(url: string, method: string, data?: object, headers?: object): Promise<T> => {
  try {
    const fullUrl = `${backendUrl}${url}`;

    const config: AxiosRequestConfig = {
      url: fullUrl,
      data,
      method,
      xsrfHeaderName: 'X-CSRF-TOKEN',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-subkey': subkeyApiKey,
        ...headers,
      },
      withCredentials: false,
    };

    const response = await axios(config);
    return response.data as T;
  } catch (error) {
    console.log(error);
    throw new Error(`Request failed: ${error}`);
  }
};
