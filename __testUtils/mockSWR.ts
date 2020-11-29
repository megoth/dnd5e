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

export default function mockSWR(mock) {
  return mock.mockImplementation(async (key, fn) => {
    try {
      const data = await fn();
      return createSWRResponse(data);
    } catch (error) {
      return createSWRErrorResponse(error);
    }
  });
}
