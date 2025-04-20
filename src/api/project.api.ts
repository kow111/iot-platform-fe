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

    static getAllProjects() {
        return axiosPrivate.get<IBackendResponse<IProject[]>>("/projects");
    }

    static deleteProject(id: string) {
        return axiosPrivate.delete<IBackendResponse<IProject>>(
            `/projects/${id}`
        );
    }

    static getProjectById(id: string) {
        return axiosPrivate.get<IBackendResponse<IProject>>(
            `/projects/${id}`
        );
    }

    static updateProject(id: string, data: ICreateProject) {
        return axiosPrivate.put<IBackendResponse<IProject>>(
            `/projects/${id}`,
            data
        );
    }
}