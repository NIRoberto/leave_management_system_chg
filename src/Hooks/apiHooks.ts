import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import api from "../Config/axiosConfig";
import { StorageKeys } from "../Config/StorageKeys";
import { Notify } from "notiflix";

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    nextToken?: string;
  };
}

export const useFetchPaginatedData = <T>(
  key: string,
  endpoint: string,
  initialNextToken?: string
) => {
  const queryClient = useQueryClient();

  const allData = React.useRef<T[]>([]);
  const [nextToken, setNextToken] = React.useState<string | undefined>(
    initialNextToken
  );
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const query = useQuery<PaginatedResponse<T>>({
    queryKey: [key, nextToken],
    queryFn: async () => {
      const url = nextToken
        ? `${endpoint}${
            endpoint.includes("?") ? "&" : "?"
          }nextToken=${nextToken}`
        : endpoint;

      const response = await api.get(url);
      return response.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      if (nextToken === initialNextToken) {
        allData.current = query.data.data;
      } else {
        allData.current = [...allData.current, ...query.data.data];
      }

      setHasMore(!!query.data.meta.nextToken);
      setNextToken(query.data.meta.nextToken);
    }
  });

  const loadMore = useCallback(() => {
    if (nextToken && hasMore) {
      queryClient.invalidateQueries({
        queryKey: [key, nextToken],
      });
    }
  }, [queryClient, key, nextToken, hasMore]);

  const reset = React.useCallback(() => {
    allData.current = [];
    setNextToken(initialNextToken);
    setHasMore(true);
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  }, [queryClient, key, initialNextToken]);

  return {
    ...query,
    data: allData.current,
    hasMore,
    nextToken,
    loadMore,
    reset,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

// Original hooks remain unchanged
export const useFetchData = <T>(key: string, endpoint: string) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const response = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            StorageKeys.ACCESS_TOKEN
          )}`,
        },
      });
      return response.data;
    },
  });
};

export const useFetchDataBotBackend = <T>(key: string, endpoint: string) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const response = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            StorageKeys.ACCESS_TOKEN
          )}`,
        },
      });
      return response.data;
    },
  });
};

export const useFetchDataById = <T>(
  key: string,
  endpoint: string,
  id: number | string
) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const response = await api.get(`${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            StorageKeys.ACCESS_TOKEN
          )}`,
        },
      });
      return response.data;
    },
  });
};

export const useCreateData = <T>(endpoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: T) => {
      const response = await api.post(endpoint, data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
export const useCreateWithAuthData = <T>(endpoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: T) => {
      const response = await api.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            StorageKeys.ACCESS_TOKEN
          )}`,
        },
      });
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useUpdateData = <T>(endpoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: T }) => {
      const response = await api.patch(`${endpoint}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useUpdateWithTwoParameters = <T>(endpoint: string) => {
  return useMutation({
    mutationFn: async ({
      userId,
      roleId,
      data,
    }: {
      userId: number;
      roleId: number;
      data?: T; //
    }) => {
      const response = await api.patch(
        `${endpoint}/${userId}/assign-role/${roleId}`,
        data || {}, //
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              StorageKeys.ACCESS_TOKEN
            )}`,
          },
        }
      );
      return response.data;
    },
  });
};

export const useUpdateStatusData = <T>(endpoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: { data: T }) => {
      const response = await api.put(`${endpoint}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useDeleteData = (endpoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            StorageKeys.ACCESS_TOKEN
          )}`,
        },
        data: { id },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useDeleteById = (endpoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            StorageKeys.ACCESS_TOKEN
          )}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useCreateFormData = <T>(endpoint: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: T) => {
      const response = await api.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            StorageKeys.ACCESS_TOKEN
          )}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
