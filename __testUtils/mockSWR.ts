import { responseInterface } from "swr";

export function createSWRResponse(data) {
  return {
    data,
    error: null,
  };
}

export function createSWRErrorResponse(error) {
  return {
    data: null,
    error,
  };
}

export function mockSWRAsPromise(mock) {
  return mock.mockImplementation(async (key, fn) => fn());
}

export default function mockSWR(
  mock,
  { data, error }: Partial<responseInterface<any, any>> = {}
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
