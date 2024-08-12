import {
  IBackendRes,
  IAccount,
  IUser,
  IModelPaginate,
  IGetAccount,
  IPermission,
  IRole,
  IProfile,
  IBlog,
  ISend,
} from "@/types/backend";
import axios from "config/axios-customize";

/**
 * 
Module Auth
 */
export const callRegister = (
  name: string,
  email: string,
  password: string,
  age: number,
  gender: string,
  address: string
) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/auth/register", {
    name,
    email,
    password,
    age,
    gender,
    address,
  });
};

export const callLogin = (username: string, password: string) => {
  return axios.post<IBackendRes<IAccount>>("/api/v1/auth/login", {
    username,
    password,
  });
};

export const callFetchAccount = () => {
  return axios.get<IBackendRes<IGetAccount>>("/api/v1/auth/account");
};

export const callRefreshToken = () => {
  return axios.get<IBackendRes<IAccount>>("/api/v1/auth/refresh");
};

export const callLogout = () => {
  return axios.post<IBackendRes<string>>("/api/v1/auth/logout");
};

/**
 * Upload single file
 */
export const callUploadSingleFile = (file: any, folderType: string) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileUpload", file);
  return axios<IBackendRes<{ url: string }>>({
    method: "post",
    url: "/api/v1/files/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      folder_type: folderType,
    },
  });
};

/**
 * 
Module User
 */
export const callCreateUser = (user: IUser) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/users", { ...user });
};

export const callUpdateUser = (user: IUser) => {
  return axios.patch<IBackendRes<IUser>>(`/api/v1/users`, { ...user });
};

export const callDeleteUser = (id: string) => {
  return axios.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`);
};

export const callFetchUser = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IUser>>>(
    `/api/v1/users?${query}`
  );
};

/**
 * 
Module Permission
 */
export const callCreatePermission = (permission: IPermission) => {
  return axios.post<IBackendRes<IPermission>>("/api/v1/permissions", {
    ...permission,
  });
};

export const callUpdatePermission = (permission: IPermission, id: string) => {
  return axios.patch<IBackendRes<IPermission>>(`/api/v1/permissions/${id}`, {
    ...permission,
  });
};

export const callDeletePermission = (id: string) => {
  return axios.delete<IBackendRes<IPermission>>(`/api/v1/permissions/${id}`);
};

export const callFetchPermission = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IPermission>>>(
    `/api/v1/permissions?${query}`
  );
};

export const callFetchPermissionById = (id: string) => {
  return axios.get<IBackendRes<IPermission>>(`/api/v1/permissions/${id}`);
};

/**
 * 
Module Role
 */
export const callCreateRole = (role: IRole) => {
  return axios.post<IBackendRes<IRole>>("/api/v1/roles", { ...role });
};

export const callUpdateRole = (role: IRole, id: string) => {
  return axios.patch<IBackendRes<IRole>>(`/api/v1/roles/${id}`, { ...role });
};

export const callDeleteRole = (id: string) => {
  return axios.delete<IBackendRes<IRole>>(`/api/v1/roles/${id}`);
};

export const callFetchRole = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IRole>>>(
    `/api/v1/roles?${query}`
  );
};

export const callFetchRoleById = (id: string) => {
  return axios.get<IBackendRes<IRole>>(`/api/v1/roles/${id}`);
};

/**
 * 
Module Profile
 */

export const callCreateProfile = (profile: IProfile) => {
  return axios.post<IBackendRes<IProfile>>("/api/v1/profile", {
    ...profile,
  });
};

export const callUpdateProfile = (profile: IProfile, id: string) => {
  return axios.patch<IBackendRes<IProfile>>(`/api/v1/profile/${id}`, {
    ...profile,
  });
};

export const callDeleteProfile = (id: string) => {
  return axios.delete<IBackendRes<IProfile>>(`/api/v1/profile/${id}`);
};

export const callFetchProfile = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IProfile>>>(
    `/api/v1/profile?${query}`
  );
};

export const callFetchProfileById = (id: string) => {
  return axios.get<IBackendRes<IProfile>>(`/api/v1/profile/${id}`);
};

export const callFetchFontEnd = () => {
  return axios.get<IBackendRes<IProfile>>(`/api/v1/profile/fontend`);
};

/**
 * 
Module Blog
 */

export const callCreateBlog = (blogs: IBlog) => {
  return axios.post<IBackendRes<IBlog>>("/api/v1/blogs", {
    ...blogs,
  });
};

export const callUpdateBlog = (blogs: IBlog, id: string) => {
  return axios.patch<IBackendRes<IBlog>>(`/api/v1/blogs/${id}`, {
    ...blogs,
  });
};

export const callDeleteBlog = (id: string) => {
  return axios.delete<IBackendRes<IBlog>>(`/api/v1/blogs/${id}`);
};

export const callFetchBlog = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IBlog>>>(
    `/api/v1/blogs?${query}`
  );
};

export const callFetchBlogAdmin = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IBlog>>>(
    `/api/v1/blogs/admin?${query}`
  );
};

export const callFetchBlogById = (id: string) => {
  return axios.get<IBackendRes<IBlog>>(`/api/v1/blogs/${id}`);
};

/**
 * 
Module Send
 */

export const callCreateSend = (send: ISend) => {
  return axios.post<IBackendRes<ISend>>("/api/v1/send", {
    ...send,
  });
};

export const callDeleteSend = (id: string) => {
  return axios.delete<IBackendRes<ISend>>(`/api/v1/send/${id}`);
};

export const callFetchSend = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<ISend>>>(`/api/v1/send?${query}`);
};

export const callFetchSendById = (id: string) => {
  return axios.get<IBackendRes<ISend>>(`/api/v1/send/${id}`);
};
