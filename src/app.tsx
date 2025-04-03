import { notification } from 'antd';
import { RequestConfig, history } from 'umi';

const codeMessage: any = {
  200: 'Success',
  201: 'Created / Updated',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Not Acceptable',
  410: 'Gone',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

const errorHandler = (error: { response: Response; data: any }) => {
  const { response, data } = error;
  if (response && response.status) {
    const { status } = response;
    if (status === 401) {
      history.replace('/');
      return {
        success: false,
        code: 401,
        message: 'Your session has expired.',
      };
    }
    return data;
  } else {
    notification.error({
      description: 'Failed to connect to the server',
      message: 'Connection Error',
    });
  }
  return data;
};

export const request: RequestConfig = {
  timeout: 99000,
  prefix: API_SERVER_URL,
  errorHandler,
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
};
