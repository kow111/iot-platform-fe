import { axiosPrivate } from "./Axios";
import { IDeviceAttribute } from "./device-attribute.api";
import { IDevice } from "./device.api";

export interface ILog {
  id: string;
  deviceId: IDevice;
  actionType: string;
  changedAttribute: IDeviceAttribute;
  oldValue: string;
  newValue: string;
  createdAt: Date;
}

export interface IPaginationLogs {
  size: number;
  totalPages: number;
  page: number;
  logs: ILog[];
  totalElements: number;
}

export interface wtf {
  message: IPaginationLogs;
  status: number;
}

export const GetDeviceLogAPI = async (params: {
  deviceId?: string;
  page?: number;
  size?: number;
}) => {
  return axiosPrivate.get<IBackendResponse<wtf>>("/device-logs", {
    params,
  });
};
