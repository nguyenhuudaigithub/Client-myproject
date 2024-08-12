export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
}

export interface IPermission {
  _id?: string;
  name?: string;
  apiPath?: string;
  method?: string;
  module?: string;
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRole {
  _id?: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions: IPermission[] | string[];
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  age: number;
  gender: string;
  address: string;
  role?: {
    _id: string;
    name: string;
  };
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAccount {
  access_token: string;
  user: {
    _id: string;
    email: string;
    name: string;
    role: {
      _id: string;
      name: string;
    };
    permission: {
      _id: string;
      name: string;
      apiPath: string;
      method: string;
      module: string;
    }[];
  };
}

export interface IGetAccount extends Omit<IAccount, "access_token"> {}

export interface INavLink {
  title: string;
  path: string;
}

export interface IHeroInfo {
  title: string;
  time: number;
}

export interface IHeroSection {
  image: string;
  text: string;
  myCv: string;
  infor: IHeroInfo[];
}

export interface IAchievement {
  prefix: string;
  metric: string;
  value: string;
  postfix: string;
}

export interface IAbout {
  title: string;
  imageAbout: string;
  detail: string;
}

export interface ITabData {
  title: string;
  id: string;
  content: string;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
}

export interface IProjectsData {
  title: string;
  data: IProject[];
}

export interface ISocialMedia {
  name: string;
  image: string;
  link: string;
}

export interface IContact {
  title: string;
  detail: string;
  socialMedia: ISocialMedia[];
}

export interface IProfile {
  _id?: string;
  title: string;
  logo: string;
  description: string;
  navLink: INavLink[];
  heroSection: IHeroSection;
  achievementsList: IAchievement[];
  about: IAbout;
  tabData: ITabData[];
  projectsData: IProjectsData;
  contact: IContact;
  createBy?: IUser;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
  updateBy?: IUser;
  deletecBy?: IUser;
}

export interface IBlog {
  _id?: string;
  title: string;
  img: string;
  description: string;
  detail: string;
  createBy?: IUser;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  isActive: boolean;
  updateBy?: IUser;
  deletecBy?: IUser;
}

export interface ISend {
  _id?: string;
  email: string;
  subject: string;
  message: string;
  isDeleted?: boolean;
  createdAt?: string;
  deletedAt?: string | null;
  deletecBy?: IUser;
}
