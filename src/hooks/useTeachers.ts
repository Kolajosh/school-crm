import { useGetTeachersQuery } from "@/services/teachers";
import { useAppSelector } from "@/store";

const useTeachers = () => {
  const { loggedIn } = useAppSelector((state) => state?.auth);

  const {
    data: teachersData,
    isFetching,
    isLoading,
    refetch,
  } = useGetTeachersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !loggedIn,
  });
  return {
    teachersData,
    loading: isFetching || isLoading,
    refetch,
  };
};

export default useTeachers;
