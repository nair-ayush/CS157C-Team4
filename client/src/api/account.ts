import api from "./api";


export const getUsername = (username: string, config = {}) =>
 api.get("/account/${username}", config);

export const updateUser = (updatedUsername: string, config = {}) =>
 api.put("/account/${updatedUsername}", config);

export const getBio = (bio: string, config = {}) =>
 api.get("/account/${bio}", config);

export const updateBio = (updatedBio: string, config = {}) =>
 api.get("/account/${updatedBio}", config);

export const getEmail = (email: string, config = {}) =>
 api.get("/account/${email}", config);

export const updateEmail = (updatedEmail: string, config = {}) =>
 api.get("/account/${updatedEmail}", config);

export const getPassword = (password: string, config = {}) =>
 api.get("/account/${password}", config);

export const updatePassword = (updatedPassword: string, config = {}) =>
 api.get("/account/${updatedPassword}", config);
