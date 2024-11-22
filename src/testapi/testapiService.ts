
    import { prepareError, prepareSuccess, ServiceResult } from "../utils"
    import { TestapiResponse } from "./interfaces"

    
    export class TestapiService {
      public get(id: number, name?: string): Promise<ServiceResult<TestapiResponse>> {
        const resp =  prepareSuccess<TestapiResponse>(
          {token: "", expiresIn: 3500}
        )
        return Promise.resolve(resp)
      }
    
      public create(TestapiCreationParams: any): Promise<ServiceResult<TestapiResponse>>{
        const resp = prepareSuccess<TestapiResponse>({token: "", expiresIn: 3500})
        const err = prepareError("", "")
        return Promise.resolve(resp)
        };
      }
    