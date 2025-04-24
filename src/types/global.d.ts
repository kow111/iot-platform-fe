export {};

declare global {
  interface IBackendResponse<T> {
    code: number;
    success: boolean;
    message: string | string[];
    timestamp: string;
    path: string;
    data?: T;
  }

  type IBackendResponseMessage<T> = IBackendResponse<{ message: T }>;
}
