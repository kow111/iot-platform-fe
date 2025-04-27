import { axiosPrivate } from "./Axios";
import { IDeviceType } from "./device-type.api";
import { IRoom } from "./room.api";


export interface IDevice {
    id: string;
    name: string;
    position: number;
    device_type_id: IDeviceType;
    room_id: IRoom;
}

export interface ICreateDevice {
    name: string;
    position: number;
    deviceTypeId: string;
    roomId: string | null;
}

export interface IPaginationDevice {
    totalPages: number;
    page: number;
    limit: number;
    totalElements: number;
    devices: IDevice[];
}

export interface IGetAllDevices {
    page: number;
    limit: number;
    roomId?: string;
}

export class DeviceApi {
    static createDevice(data: ICreateDevice) {
        return axiosPrivate.post<IBackendResponseMessage<IDevice>>("/device", data);
    }

    static getAllDevices(params: IGetAllDevices) {
        return axiosPrivate.get<IBackendResponseMessage<IPaginationDevice>>(
            "/device",
            { params }
        );
    }

    static deleteDevice(id: string) {
        return axiosPrivate.delete<IBackendResponseMessage<IDevice>>(`/device/${id}`);
    }

    static updateDevice(id: string, data: ICreateDevice) {
        return axiosPrivate.put<IBackendResponseMessage<IDevice>>(`/device/${id}`, data);
    }
}