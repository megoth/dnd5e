import useSWR, { SWRResponse } from "swr";

export function createSWRResponse<T, U>(data): SWRResponse<T, U> {
  return {
    data,
    error: null,
    mutate: jest.fn(),
    isValidating: false,
  };
}

export function createSWRErrorResponse<T, U>(error): SWRResponse<T, U> {
  return {
    data: null,
    error,
    mutate: jest.fn(),
    isValidating: false,
  };
}

export function mockSWRAsPromise(mock) {
  return mock.mockImplementation(async (key, fn) => fn());
}

export default function mockSWR(
  mock,
  { data, error }: Partial<ReturnType<typeof useSWR>> = {}
) {
  return mock.mockImplementation((key, fn) => {
    if (error) {
      return createSWRErrorResponse(error);
    }
    try {
      return createSWRResponse(data || fn());
    } catch (err) {
      return createSWRErrorResponse(err);
    }
  });
}
