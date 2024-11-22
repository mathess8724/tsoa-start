import * as fs from 'fs';
import * as path from 'path';

const createDirectory = (name: string) => {
    const dirPath = path.join(__dirname, '../src', name);
    fs.mkdirSync(dirPath, { recursive: true });

    const capitalizeFirstLetter = (str: string): string =>{
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const capitalName = capitalizeFirstLetter(name);
    const files = ['.ts', 'Controller.ts', 'Service.ts'];
    const interfaceContent = `
    export interface ${capitalizeFirstLetter(name)}Response {
    token: string;
    expiresIn: number;
   }
    `;

    const controllerContent2 = `
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
    import { ${capitalName}Response } from "./interfaces";  
    import { ${capitalName}Service, } from "./${name}Service"; 
      
      @Route("${name}")
      export class ${capitalName}ontroller extends Controller {
        @Get("{userId}")
        public async getUser(
          @Path() userId: number,
          @Query() name?: string
        ): Promise<ServiceResult<${capitalName}Response>> {
          const resp =  new ${capitalName}Service().get(userId, name);
          return resp
        }
      
        @SuccessResponse("201", "Created") // Custom success response
        @Post()
        public async create${capitalName}(
          @Body() requestBody: {test: string}
        ): Promise<ServiceResult<${capitalName}Response>> {
          this.setStatus(201); // set return status 201
          const resp = new ${capitalName}Service().create(requestBody);
          return resp;
        }
      }
    `
    const serviceContent2 = `
    import { prepareError, prepareSuccess, ServiceResult } from "../utils"
    import { ${capitalName}Response } from "./interfaces"

    
    export class ${capitalName}Service {
      public get(id: number, name?: string): Promise<ServiceResult<${capitalName}Response>> {
        const resp =  prepareSuccess<${capitalName}Response>(
          {token: "", expiresIn: 3500}
        )
        return Promise.resolve(resp)
      }
    
      public create(${capitalName}CreationParams: any): Promise<ServiceResult<${capitalName}Response>>{
        const resp = prepareSuccess<${capitalName}Response>({token: "", expiresIn: 3500})
        const err = prepareError("", "")
        return Promise.resolve(resp)
        };
      }
    `
  const interfaceIndexContent = `
  export * from './${capitalName}Response'
  `

    // Ensure the interfaces directory exists
    fs.mkdirSync(`${dirPath}/interfaces`, { recursive: true });

    fs.writeFileSync(path.join(`${dirPath}/interfaces`, (`${capitalName}Response` +'.ts')), interfaceContent);
    fs.writeFileSync(path.join(`${dirPath}/interfaces`, ('index' +'.ts')), interfaceIndexContent);
    fs.writeFileSync(path.join(dirPath, (name +'Controller.ts')), controllerContent2);
    fs.writeFileSync(path.join(dirPath, (name +'Service.ts')), serviceContent2);

    console.log(`Directory and files created at ${dirPath}`);
};

const main = () => {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('Please provide a name as an argument.');
        process.exit(1);
    }

    const name = args[0];
    createDirectory(name);
};

main();
