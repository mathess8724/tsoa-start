import { MsException } from "./MsException";

export interface ServiceResult<T, E = MsException> {
    data?: T; // Holds the success response
    error?: E; // Holds the error object
  }