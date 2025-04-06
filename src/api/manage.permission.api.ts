import { axiosPrivate } from "./Axios";
import { IRole } from "./manage.user.api";

export interface IPermission {
  id: string;
  name: string;
  nameGroup: string;
  description: string;
  urlPattern: null;
  roles: IRole[];
}

export interface ICreatePermission {
  name: string;
  nameGroup: string;
  description: string;
  roles: string[];
}

interface IResponsePermissions {
  permissions: IPermission[];
}

export const GetAllPermissionsAPI = async () => {
  return axiosPrivate.get<IBackendResponse<IResponsePermissions>>(
    "/permissions"
  );
};

export const DeletePermissionAPI = async (permissionName: string) => {
  return axiosPrivate.delete<IBackendResponse<null>>(
    `/permissions/${permissionName}`
  );
};

export const CreatePermissionAPI = async (data: ICreatePermission) => {
  return axiosPrivate.post<IBackendResponse<null>>("/permissions", data);
};
