import { axiosClient, axiosPrivate } from "./Axios";

export class AuthApi {
    static login(userName: string, password: string) {
        return axiosClient.post("/auths/login", { userName, password });
    }

    static register(formData: any) {
        return axiosClient.post("/auths/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    static verify(email: string, otp: string) {
        return axiosClient.post("/auths/verify", { email, otp });
    }

    static sendOTP(userName: string) {
        return axiosClient.post("/auths/resend", { userName });
    }


    static forgotPW(userName: string) {
        return axiosClient.post("/auths/forgot", { userName });
    }

    static resetPassword(token: string, newPassword: string) {
        return axiosClient.post("/auths/reset", { token, newPassword });
    }

    static logout() {
        return axiosPrivate.post("/auths/logout");
    }

}