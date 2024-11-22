//import { ServiceResult } from "../interfaces/ServiceResult";

  /**
   * Utility function to prepare a success response.
   * @param data - The successful result data.
   * @returns ServiceResult containing the data.
   */
  export function prepareSuccess<T>(data: T): {data: T} {
    return {data: data}
  }
  