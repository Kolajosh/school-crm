import { useGetAdminDashboardQuery } from "@/services";
import { useAppSelector } from "@/store";

const useAdminDashboard = () => {
  const { loggedIn } = useAppSelector((state) => state?.auth);

  const {
    data: dashboardData,
    isFetching,
    isLoading,
    refetch,
  } = useGetAdminDashboardQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !loggedIn,
  });
  return {
    dashboardData,
    loading: isFetching || isLoading,
    refetch,
  };
};

export default useAdminDashboard;
