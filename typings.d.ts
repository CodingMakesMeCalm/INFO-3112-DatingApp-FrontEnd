declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare let API_SERVER_URL: string;
declare let API_PORTAL_URL: string;
declare let GOOGLE_API_KEY: string;

interface ResponseData {
  success: boolean;
  message: string;
  data: any;
  code?: number;
}

interface FormLayout {
  labelCol?: { span: number; offset?: number };
  wrapperCol?: { span: number; offset?: number };
}

interface Router {
  id: number;
  name: string;
  path: string;
}

interface StandardError {
  code?: number;
  message: string;
}
