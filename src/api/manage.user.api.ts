import { axiosPrivate } from "./Axios";

interface IRole {
  id: number;
  name: string;
}

export interface IUser {
  id: string;
  userName: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  status: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  roles: IRole[];
}

interface IPaginationUsers {
  totalPages: number;
  currentPage: number;
  users: IUser[];
  totalElements: number;
}

export const GetAllUsersAPI = async (params: {
  page?: number;
  limit?: number;
}) => {
  return axiosPrivate.get<IBackendResponse<IPaginationUsers>>("/users", {
    params,
  });
};

export const BanUserAPI = async (userId: string) => {
  return axiosPrivate.put<IBackendResponse<null>>(`/users/${userId}/ban`);
};
