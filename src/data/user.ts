export const loggedInUser = {
  data: {
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM2MjU4MTg0LCJleHAiOjE3MzYyNjE3ODQsIm5iZiI6MTczNjI1ODE4NCwianRpIjoia2hQZEIwdUJGU000cFJTMCIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.77IFJ0MaEPeE9vtI0w29ocEB3Nvd1aIoJ1WSW4TKx14",
    user: {
      id: 2,
      uuid: "e9b6a434-0b5f-4117-b6e2-db676af11e1e",
      email: "user1@email.com",
      username: "user1",
      status: "activated",
      options: [],
      created_at: "2025-01-05T06:24:57.000000Z",
      updated_at: "2025-01-05T06:24:57.000000Z",
      roles: ["user"],
    },
  },
};

export const loggedInAdmin = {
  success: true,
  error: false,
  message: "auth.logged_in",
  data: {
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM2MjY2ODYxLCJleHAiOjE3MzYyNzA0NjEsIm5iZiI6MTczNjI2Njg2MSwianRpIjoiaFdURGR3YjE1QXpJaWRpRCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.94qdMTJei_xLefh2fWdQkrdiah01xbHIIumyP0aAXOQ",
    user: {
      id: 1,
      uuid: "b247ea54-8d30-4c9d-823e-fddf9b537bbb",
      email: "admin@admin.com",
      username: "admin",
      status: "activated",
      options: [],
      created_at: "2024-12-27T15:34:13.000000Z",
      updated_at: "2024-12-27T15:34:13.000000Z",
      roles: ["admin"],
    },
  },
};
