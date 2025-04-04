export {};

declare global {
  interface IBackendResponse<T> {
    code: number;
    success: boolean;
    message: string;
    timestamp: string;
    path: string;
    data?: T;
  }
}
