import { axiosPrivate } from "./Axios";


export interface IDeviceType {
    id: string;
    name: string;
}

export class DeviceTypeApi {
    static getAllDeviceTypes() {
        return axiosPrivate.get<IBackendResponse<IDeviceType[]>>("/device-type");
    }
}