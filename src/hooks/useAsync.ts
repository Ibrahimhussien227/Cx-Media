import { useCallback, useEffect, useState } from "react";

export const useAsync = <
  T extends (...args: Parameters<T>) => Promise<unknown>
>(
  func: T,
  args: Parameters<T>, // arguments of the asynchromous func
  deps?: []
) => {
  const { execute, ...state } = useAsyncInternal(func, deps, true);

  useEffect(() => {
    execute(...args);
  }, [execute, args]);

  return state;
};

export const useLazyAsync = <
  T extends (...args: Parameters<T>) => Promise<unknown>
>(
  func: T,
  deps?: []
): [
  (...params: Parameters<T>) => Promise<void>,
  {
    isLoading: boolean;
    error: string | null;
    data: Awaited<ReturnType<T>> | null;
  },
  () => void
] => {
  const { execute, resetStates, ...state } = useAsyncInternal(
    func,
    deps,
    false
  );
  return [execute, state, resetStates];
};

export const useAsyncInternal = <
  T extends (...args: Parameters<T>) => Promise<unknown>
>(
  func: T,
  deps = [],
  initialLoading = false
) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<null | Awaited<ReturnType<T>>>(null);

  const execute = useCallback(
    (...params: Parameters<T>) => {
      setIsLoading(true);
      return func(...params)
        .then((result) => setData(result as Awaited<ReturnType<T>>))
        .catch((err: { message: string }) => setError(err.message))
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps, func]
  );

  const resetStates = useCallback(() => {
    setIsLoading(false);
    setData(null);
    setError(null);
  }, []);

  return { isLoading, error, data, execute, resetStates };
};
