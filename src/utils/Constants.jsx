export const Const = {
  Token: "token",
  Session: "Session",
  LoggedInRolePermission: "Role",
  User: "User",
  LoggedIn: "LoggedIn",
  LoggedInUser: "LoggedInUser",
  STrue: true,
  SFalse: false,
  Success200: 200,
  Created201: 201,
  Invalid400: 400,
  UnAuth401: 401,
  Forbidden403: 403,
  NotFound404: 404,
  ServerError500: 500,
  BadGateway502: 502,
  ServiceUnavailable503: 503,
  GatewayTimeout504: 504,
  Redirect302: 302,
  Inactive: 0,
  Active: 1,
  Trash: 2,
  Draft: 3,
  Scheduled: 4,
  Limit: 20,
  Offset: 0,
  Brand: "The Vyu",
  ClientLink: process.env.NEXT_PUBLIC_CLIENT_URL,
};

export const ProcessAPI = async (res) => {
  if (res.status === Const.Success200 || res.status === Const.Created201) {
    const data = await res.json();
    return data;
  } else if (res.status === Const.Redirect302) {
  } else if (res.status === Const.Invalid400) {
  } else if (res.status === Const.UnAuth401) {
    localStorage.clear();
    window.location.href = "/signin";
  } else if (res.status === Const.NotFound404) {
    const data = await res.json();
    return data;
    // return {
    //   notFound: true,
    // };
  } else {
    throw new Error("Some error occurred");
  }
};
