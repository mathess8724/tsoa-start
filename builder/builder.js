"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var createDirectory = function (name) {
    var dirPath = path.join(__dirname, '../src', name);
    fs.mkdirSync(dirPath, { recursive: true });
    var capitalizeFirstLetter = function (str) {
        if (str.length === 0)
            return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    var capitalName = capitalizeFirstLetter(name);
    var files = ['.ts', 'Controller.ts', 'Service.ts'];
    var interfaceContent = "export interface ".concat(capitalizeFirstLetter(name), " {\n url: string;\n}");
    var controllerContent = "import {\n        Body,\n        Controller,\n        Get,\n        Path,\n        Post,\n        Query,\n        Route,\n        SuccessResponse,\n      } from \"tsoa\";\n      import { ".concat(capitalName, " } from \"./").concat(name, "\";\n      import { ").concat(capitalName, "Service, ").concat(capitalName, "Params } from \"./").concat(name, "Service\";\n      \n      @Route(\"").concat(name, "\")\n      export class ").concat(capitalName, "Controller extends Controller {\n        @Get(\"{userId}\")\n        public async getUser(\n          @Path() userId: number,\n          @Query() name?: string\n        ): Promise<").concat(capitalName, "> {\n          return new ").concat(capitalName, "Service().get(userId, name);\n        }\n      \n        @SuccessResponse(\"201\", \"Created\") // Custom success response\n        @Post()\n        public async create").concat(capitalName, "(\n          @Body() requestBody: ").concat(capitalName, "Params\n        ): Promise<void> {\n          this.setStatus(201); // set return status 201\n          new ").concat(capitalName, "Service().create(requestBody);\n          return;\n        }\n      }");
    var serviceContent = "import { ".concat(capitalName, " } from \"./").concat(name, "\";\n\n    // A post request should not contain an id.\n    export type ").concat(capitalName, "Params = Pick<").concat(capitalName, ", \"url\">;\n    \n    export class ").concat(capitalName, "Service {\n      public get(id: number, name?: string): ").concat(capitalName, " {\n        return {\n          url: \"url string\"\n        };\n      }\n    \n      public create(").concat(name, "CreationParams: ").concat(capitalName, "Params): ").concat(capitalName, " {\n        return {\n          url: \"url created!\",\n          //...").concat(name, "CreationParams,\n        };\n      }\n    }");
    fs.writeFileSync(path.join(dirPath, (name + '.ts')), interfaceContent);
    fs.writeFileSync(path.join(dirPath, (name + 'Controller.ts')), controllerContent);
    fs.writeFileSync(path.join(dirPath, (name + 'Service.ts')), serviceContent);
    console.log("Directory and files created at ".concat(dirPath));
};
var main = function () {
    var args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('Please provide a name as an argument.');
        process.exit(1);
    }
    var name = args[0];
    createDirectory(name);
};
main();
