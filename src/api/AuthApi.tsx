import { axiosClient, axiosPrivate } from "./Axios";

export class AuthApi {
    static login(userName: string, password: string) {
        return axiosClient.post("/auths/login", { userName, password });
    }

    static logout() {
        return axiosPrivate.post("/auths/logout");
    }

}