import { useGetStudentsQuery } from "@/services";
import { useAppSelector } from "@/store";

const useStudents = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);

  const {
    data: studentData,
    isLoading,
    isFetching,
    refetch,
  } = useGetStudentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !loggedIn,
  });

  return {
    studentData,
    loading: isLoading || isFetching,
    refetch,
  };
};

export default useStudents;
