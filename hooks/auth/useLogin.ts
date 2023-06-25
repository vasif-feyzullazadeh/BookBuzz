import { auth } from "@/services/requests";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

const useLogin = () => {
  const router = useRouter();

  const {
    mutate: loginMutate,
    data: loginData,
    isLoading: loginIsLoading,
    error: loginError,
  } = useMutation("LOGIN", auth.login, {
    onSuccess: (data) => {
      setCookie(null, "auth", data.result.jwt, {
        maxAge: 300,
        path: "/",
      });

      router.push({ pathname: "/" });
    },
  });

  return {
    loginMutate,
    loginData,
    loginIsLoading,
    loginError,
  };
};

export default useLogin;
