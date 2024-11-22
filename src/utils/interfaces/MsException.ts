export interface MsException {
    code: string; // Error code for identification
    message: string; // Descriptive error message
    details?: any; // Optional additional information about the error
  }