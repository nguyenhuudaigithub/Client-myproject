export const ALL_PERMISSIONS = {
  PERMISSIONS: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/api/v1/permissions",
      module: "PERMISSIONS",
    },
    CREATE: {
      method: "POST",
      apiPath: "/api/v1/permissions",
      module: "PERMISSIONS",
    },
    UPDATE: {
      method: "PATCH",
      apiPath: "/api/v1/permissions/:id",
      module: "PERMISSIONS",
    },
    DELETE: {
      method: "DELETE",
      apiPath: "/api/v1/permissions/:id",
      module: "PERMISSIONS",
    },
  },
  ROLES: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/roles", module: "ROLES" },
    CREATE: { method: "POST", apiPath: "/api/v1/roles", module: "ROLES" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/roles/:id", module: "ROLES" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/roles/:id", module: "ROLES" },
  },
  USERS: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/users", module: "USERS" },
    CREATE: { method: "POST", apiPath: "/api/v1/users", module: "USERS" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/users/:id", module: "USERS" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/users/:id", module: "USERS" },
  },
  PROFILES: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/api/v1/profile",
      module: "PROFILES",
    },
    CREATE: { method: "POST", apiPath: "/api/v1/profile", module: "PROFILES" },
    UPDATE: {
      method: "PATCH",
      apiPath: "/api/v1/profile/:id",
      module: "PROFILES",
    },
    DELETE: {
      method: "DELETE",
      apiPath: "/api/v1/profile/:id",
      module: "PROFILES",
    },
  },
};

export const ALL_MODULES = {
  AUTH: "AUTH",
  FILES: "FILES",
  PERMISSIONS: "PERMISSIONS",
  ROLES: "ROLES",
  USERS: "USERS",
  PROFILES: "PROFILES",
};
