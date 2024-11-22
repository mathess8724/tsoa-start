import { MsException } from "./interfaces";
import { ServiceResult } from "./interfaces/ServiceResult";


  /**
   * Utility function to prepare an error response.
   * @param code - The error code.
   * @param message - A descriptive error message.
   * @param details - Optional additional error details.
   * @returns ServiceResult containing the error.
   */

  export function prepareError(
    code: string,
    message: string,
    details?: any
  ): {error: MsException} {
    return {
      error: {
        code,
        message,
        details,
      },
    };
  }