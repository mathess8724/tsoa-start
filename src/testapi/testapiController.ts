
    import {
        Body,
        Controller,
        Get,
        Path,
        Post,
        Query,
        Route,
        SuccessResponse,
      } from "tsoa";
    import { ServiceResult } from "../utils/interfaces/ServiceResult";
    import { TestapiResponse } from "./interfaces";  
    import { TestapiService, } from "./testapiService"; 
      
      @Route("testapi")
      export class Testapiontroller extends Controller {
        @Get("{userId}")
        public async getUser(
          @Path() userId: number,
          @Query() name?: string
        ): Promise<ServiceResult<TestapiResponse>> {
          const resp =  new TestapiService().get(userId, name);
          return resp
        }
      
        @SuccessResponse("201", "Created") // Custom success response
        @Post()
        public async createTestapi(
          @Body() requestBody: {test: string}
        ): Promise<ServiceResult<TestapiResponse>> {
          this.setStatus(201); // set return status 201
          const resp = new TestapiService().create(requestBody);
          return resp;
        }
      }
    