export const prepareResponse = <T>(type: string, data: T) => JSON.stringify({ type, id: 0, data });
