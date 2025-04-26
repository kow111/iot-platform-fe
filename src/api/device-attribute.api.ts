import { axiosPrivate } from "./Axios";

export interface IDeviceAttribute {
    id: string;
    name: string;
    unit: string;
    deviceTypeId: {
        id: string;
        name: string;
    };
}
export interface ICreateDeviceAttribute {
    name: string;
    unit: string;
    deviceTypeId: string;
}

export interface IDeviceAttributeResponse {
    message: {
        attributes: IDeviceAttribute[];
    }
}

export class DeviceAttributeApi {
    static getAllDeviceAttributes(deviceTypeId?: string) {
        return axiosPrivate.get<IBackendResponse<IDeviceAttributeResponse>>(`/device-attributes?deviceType=${deviceTypeId}`);
    }
    static createDeviceAttribute(data: ICreateDeviceAttribute) {
        return axiosPrivate.post<IBackendResponse<ICreateDeviceAttribute>>("/device-attributes", data);
    }
    static updateDeviceAttribute(id: string, data: ICreateDeviceAttribute) {
        return axiosPrivate.put<IBackendResponse<ICreateDeviceAttribute>>(`/device-attributes/${id}`, data);
    }
    static deleteDeviceAttribute(id: string) {
        return axiosPrivate.delete<IBackendResponse<IDeviceAttribute>>(`/device-attributes/${id}`);
    }
    static getDeviceAttributeById(id: string) {
        return axiosPrivate.get<IBackendResponse<IDeviceAttribute>>(`/device-attributes/${id}`);
    }
}

