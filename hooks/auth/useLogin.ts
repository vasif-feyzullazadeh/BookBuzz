import { auth } from "@/services/requests";
import { useMutation } from "react-query";

const useLogin = () => {
    const {
        mutate: loginMutate,
        data: loginData,
        isLoading: loginIsLoading,
    } = useMutation("LOGIN", auth.login, {
        onSuccess(data, variables, context) {
            console.log(data);
        },
    });

    return {
        loginMutate,
        loginData,
        loginIsLoading,
    };
};

export default useLogin;
