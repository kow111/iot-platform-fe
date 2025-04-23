import { axiosPrivate } from "./Axios";
import { IProject } from "./project.api";

export interface IRoom {
    id: string;
    name: string;
    position: number;
    project: IProject;
}

export interface ICreateRoom {
    name: string;
    position: number;
    project_id?: string; // Optional property for project ID
}

export interface IBackendResponseMessage<T> {
    message: T;
}

export interface IPaginationRoom {
    totalPages: number;
    page: number;
    limit: number;
    totalElements: number;
    rooms: IRoom[];
}

export class RoomApi {
    static createRoom(data: ICreateRoom) {
        return axiosPrivate.post<IBackendResponse<IRoom>>(
            "/room",
            data
        );
    }

    static getAllRooms(params: { page: number; limit: number }) {
        return axiosPrivate.get<IBackendResponse<IBackendResponseMessage<IPaginationRoom>>>(
            "/room",
            { params }
        );
    }

    static deleteRoom(id: string) {
        return axiosPrivate.delete<IBackendResponse<IRoom>>(
            `/room/${id}`
        );
    }

    static getRoomById(id: string) {
        return axiosPrivate.get<IBackendResponse<IBackendResponseMessage<IRoom>>>(
            `/room/${id}`
        );
    }

    static updateRoom(id: string, data: ICreateRoom) {
        return axiosPrivate.put<IBackendResponse<IBackendResponseMessage<IRoom>>>(
            `/room/${id}`,
            data
        );
    }
}

