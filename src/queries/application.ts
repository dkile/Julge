import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { getApplicationList } from "@/apis/application";
import { UserContext } from "@/providers/UserProvider";

interface ApplicationListQueryProps {
  offset?: number;
  limit?: number;
}

export const useApplicationListQuery = ({
  offset = 0,
  limit = 4,
}: ApplicationListQueryProps) => {
  const user = useContext(UserContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["application", user?.id, offset],
    queryFn: () => getApplicationList(user!.id, { offset, limit }),
    enabled: !!user,
  });

  return { data, isLoading, error };
};
