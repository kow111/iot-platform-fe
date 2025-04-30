import { axiosPrivate } from "./Axios";
import { IUser } from "./manage.user.api";


export interface IProjectMember {
    id: string;
    user: IUser;
    role: string;
    projectId: string;
    canControlDevices: boolean;
}

export interface IGetAllProjectMembersResponse {
    content: IProjectMember[];
}

export interface ICreateProjectMember {
    userId: string;
    projectId: string;
    role: string;
    canControlDevices: boolean;
}

export class ProjectMemberApi {
    static getAllProjectMembers(projectId: string) {
        return axiosPrivate.get<IBackendResponse<IGetAllProjectMembersResponse>>(
            "/project-members/search",
            { params: { projectId } }
        );
    }

    static createProjectMember(data: ICreateProjectMember) {
        return axiosPrivate.post<IBackendResponse<IProjectMember>>(
            "/project-members",
            data
        );
    }

    static updateProjectMember(id: string, data: ICreateProjectMember) {
        return axiosPrivate.put<IBackendResponse<IProjectMember>>(
            `/project-members/${id}`,
            data
        );
    }

    static deleteProjectMember(id: string) {
        return axiosPrivate.delete<IBackendResponse<IProjectMember>>(
            `/project-members/${id}`
        );
    }
}