import { axiosPrivate } from "./Axios";


export interface IDeviceType {
    id: string;
    name: string;
}

export class DeviceTypeApi {
    static getAllDeviceTypes() {
        return axiosPrivate.get<IBackendResponse<IDeviceType[]>>("/device-type");
    }
    static createDeviceType(name: string) {
        return axiosPrivate.post<IBackendResponse<IDeviceType>>("/device-type", { name });
    }
    static updateDeviceType(id: string, name: string) {
        return axiosPrivate.put<IBackendResponse<IDeviceType>>(`/device-type/${id}`, { name });
    }
    static deleteDeviceType(id: string) {
        return axiosPrivate.delete<IBackendResponse<IDeviceType>>(`/device-type/${id}`);
    }
    static getDeviceTypeById(id: string) {
        return axiosPrivate.get<IBackendResponse<IDeviceType>>(`/device-type/${id}`);
    }
}

