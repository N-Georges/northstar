import { ClerkAPIError } from "@clerk/types";

export interface APIResponseError {
  errors: ClerkAPIError[];
}

export function parseError(err: APIResponseError): string {
  if (!err) {
    return "";
  }
  const firstError = err.errors?.[0];
  if (firstError) {
    return firstError.longMessage || "";
  }

  throw err;
}
