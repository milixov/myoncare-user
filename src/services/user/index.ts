import { useMutation, useQuery } from "react-query";
import { MutationResult, QueryResult } from "global";
import { http } from "utils/http";
import { RegisterResponse, LoginResponse, UserListParams, User } from "./types";

export const useRegister: MutationResult<RegisterResponse> = () =>
  useMutation("register", (payload) => http.post("/register", payload));

export const useLogin: MutationResult<LoginResponse> = () =>
  useMutation("login", (payload) => http.post("/login", payload));

export const useList: QueryResult<User> = (params: UserListParams) =>
  useQuery(["list", params?.page], () => http.get("/users", { params }), {
    keepPreviousData: true,
    enabled: !!params.page,
  });
