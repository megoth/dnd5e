import useSWR, { responseInterface } from "swr";

export function createSWRResponse<T, U>(data): responseInterface<T, U> {
  return {
    data,
    error: null,
    revalidate: jest.fn(),
    mutate: jest.fn(),
    isValidating: false,
  };
}

export function createSWRErrorResponse<T, U>(error): responseInterface<T, U> {
  return {
    data: null,
    error,
    revalidate: jest.fn(),
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
