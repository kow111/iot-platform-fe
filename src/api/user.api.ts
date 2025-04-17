import { axiosClient, axiosPrivate } from "./Axios";

export interface IUserProfile {
    id: string;
    userName: string;
    email: string;
    displayName: string;
    avatarUrl: string;
    status: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserProfileResponse {
    user: IUserProfile;
}

export class UserApi {

    static getProfile(id: string) {
        return axiosPrivate.get<IBackendResponse<IUserProfileResponse>>(`/users/${id}`);
    }

    static updateProfile(id: string, displayName: string) {
        return axiosPrivate.put<IBackendResponse<any>>(
            "/users", { id, displayName });
    }

}
export default UserApi;
