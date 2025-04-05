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
