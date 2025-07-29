import {
  useGetTeacherQualificationAndSpecializationQuery,
  useGetTeachersQuery,
} from "@/services/teachers";
import { useAppSelector } from "@/store";
import { useMemo } from "react";

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

  const {
    data: dropdownOptions,
    isLoading: dropdownLoading,
    isFetching: dropdownFetching,
    refetch: dropdownRefetch,
  } = useGetTeacherQualificationAndSpecializationQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !loggedIn,
  });

  const { specialties, qualifications } = useMemo(() => {
    const specialties = dropdownOptions?.data?.subject_specialties
      ? Object.entries(dropdownOptions?.data?.subject_specialties).map(
          ([key, value]) => ({
            label: value,
            value: key,
          })
        )
      : [];

    const qualifications = dropdownOptions?.data?.qualifications
      ? Object.entries(dropdownOptions?.data?.qualifications).map(
          ([key, value]) => ({
            label: value,
            value: key,
          })
        )
      : [];

    return { specialties, qualifications };
  }, [dropdownOptions]);

  return {
    teachersData,
    loading: isFetching || isLoading || dropdownFetching || dropdownLoading,
    refetch,
    dropdownRefetch,
    dropdownOptions,
    specialties,
    qualifications,
  };
};

export default useTeachers;
