import { useQuery } from "react-query";
import { users } from "@/services/requests";

const useUsers = () => {
  const { data: usersData, isLoading: usersIsLoading } = useQuery(
    "USERS",
    users.getUsers
  );

  return {
    usersData,
    usersIsLoading,
  };
};

export { useUsers };
