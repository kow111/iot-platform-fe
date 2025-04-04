import { axiosPrivate } from "./Axios";

export const GetAllUsersAPI = async (params: {
  page?: number;
  limit?: number;
}) => {
  return axiosPrivate.get<IBackendResponse<any[]>>("/users", { params });
};
