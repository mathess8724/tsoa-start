import { Testapi } from "./testapi";

    // A post request should not contain an id.
    export type TestapiParams = Pick<Testapi, "url">;
    
    export class TestapiService {
      public get(id: number, name?: string): Testapi {
        return {
          url: "url string"
        };
      }
    
      public create(testapiCreationParams: TestapiParams): Testapi {
        return {
          url: "url created!",
          //...testapiCreationParams,
        };
      }
    }