import { axiosPrivate } from "./Axios";

export interface IProject {
    id: string;
    name: string;
    description: string;
}

export interface ICreateProject {
    name: string;
    description: string;
}

export class ProjectApi {
    static createProject(data: ICreateProject) {
        return axiosPrivate.post<IBackendResponse<IProject>>(
            "/projects",
            data
        );
    }
}