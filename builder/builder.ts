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
    const interfaceContent = `export interface ${capitalizeFirstLetter(name)} {\n url: string;\n}`;
    const controllerContent = `import {
        Body,
        Controller,
        Get,
        Path,
        Post,
        Query,
        Route,
        SuccessResponse,
      } from "tsoa";
      import { ${capitalName} } from "./${name}";
      import { ${capitalName}Service, ${capitalName}Params } from "./${name}Service";
      
      @Route("${name}")
      export class ${capitalName}Controller extends Controller {
        @Get("{userId}")
        public async getUser(
          @Path() userId: number,
          @Query() name?: string
        ): Promise<${capitalName}> {
          return new ${capitalName}Service().get(userId, name);
        }
      
        @SuccessResponse("201", "Created") // Custom success response
        @Post()
        public async create${capitalName}(
          @Body() requestBody: ${capitalName}Params
        ): Promise<void> {
          this.setStatus(201); // set return status 201
          new ${capitalName}Service().create(requestBody);
          return;
        }
      }`;
    const serviceContent = `import { ${capitalName} } from "./${name}";

    // A post request should not contain an id.
    export type ${capitalName}Params = Pick<${capitalName}, "url">;
    
    export class ${capitalName}Service {
      public get(id: number, name?: string): ${capitalName} {
        return {
          url: "url string"
        };
      }
    
      public create(${name}CreationParams: ${capitalName}Params): ${capitalName} {
        return {
          url: "url created!",
          //...${name}CreationParams,
        };
      }
    }`;
    fs.writeFileSync(path.join(dirPath, (name +'.ts')), interfaceContent);
    fs.writeFileSync(path.join(dirPath, (name +'Controller.ts')), controllerContent);
    fs.writeFileSync(path.join(dirPath, (name +'Service.ts')), serviceContent);

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
