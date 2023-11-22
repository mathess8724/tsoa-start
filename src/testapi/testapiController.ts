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
      import { Testapi } from "./testapi";
      import { TestapiService, TestapiParams } from "./testapiService";
      
      @Route("testapi")
      export class TestapiController extends Controller {
        @Get("{userId}")
        public async getUser(
          @Path() userId: number,
          @Query() name?: string
        ): Promise<Testapi> {
          return new TestapiService().get(userId, name);
        }
      
        @SuccessResponse("201", "Created") // Custom success response
        @Post()
        public async createTestapi(
          @Body() requestBody: TestapiParams
        ): Promise<void> {
          this.setStatus(201); // set return status 201
          new TestapiService().create(requestBody);
          return;
        }
      }