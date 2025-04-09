import { axiosPrivate } from "./Axios";

export interface IRoom {
    id: string;
    name: string;
    position: number;
}

export interface ICreateRoom {
    name: string;
    position: number;
}

export class RoomApi {
    static createRoom(data: ICreateRoom) {
        return axiosPrivate.post<IBackendResponse<IRoom>>(
            "/rooms",
            data
        );
    }
}

