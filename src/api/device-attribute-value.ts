import { axiosPrivate } from "./Axios";
import { IDeviceAttribute } from "./device-attribute.api";
import { IDevice } from "./device.api";

export interface IDeviceAttributeValue {
    id: string;
    deviceId: IDevice;
    deviceAttributeId: IDeviceAttribute;
    value: string;
}

export interface ICreateDeviceAttributeValue {
    deviceId: string;
    deviceAttributeId: string;
    value: string;
}

export interface IPaginationDeviceAttributeValue {
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    items: IDeviceAttributeValue[];
}

export class DeviceAttributeValueApi {
    static getAllDeviceAttributeValues(deviceId: string) {
        return axiosPrivate.get<IBackendResponseMessage<IPaginationDeviceAttributeValue>>(
            "/device-attribute-values",
            { params: { deviceId } }
        );
    }

    static createDeviceAttributeValue(data: ICreateDeviceAttributeValue) {
        return axiosPrivate.post<IBackendResponseMessage<IDeviceAttributeValue>>(
            "/device-attribute-value",
            data
        );
    }

    static updateDeviceAttributeValue(
        id: string,
        data: ICreateDeviceAttributeValue
    ) {
        return axiosPrivate.put<IBackendResponseMessage<IDeviceAttributeValue>>(
            `/device-attribute-value/${id}`,
            data
        );
    }
}
