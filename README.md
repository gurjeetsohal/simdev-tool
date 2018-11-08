# Introduction

## To use the SIMDEV Tool
 
1. Install the simdevtool.exe available in the 
 
 \sim5service\SIM5-Investigations\sim5-devtools
 ```
 |-- sim5service
    -- SIM5-Investigations
        -- sim5-devtools
```

2. After launching the tool, fill the sim5service path and the sim5launchurl in the **settings page** and apply the changes.

## To use the Concatenation Tool within the SIMDEV Tool

1. Install the simdevtool.exe available in the 
 
 ```
 |-- sim5service
    -- SIM5-Investigations
        -- sim5-devtools
```

2. After launching the tool, fill the sim5service path in the **settings page** and apply the changes.
3. Click on Concatenation Tool in the sidebar to open  **Concatenation Tool page**.
4. Enter the destination path (the folder path in the SIM5 Diretory where the concatenated task as well as its resources would      be stored).
5. Enter the following information for each Step:
    a. Enter the step info by choosing either the Step Id (the Id of the Library Step) or
    Step Path (the path of the Template XML in the SIM5 Codebase Folder) option.
    b. Enter the Step Path or Step Id as per the option selected above.
6. Click “Add Another Step” button to enter information for another step that we need to concatenate.
7. If required, remove the Step Info by clicking on the “cross” icon in the Step Info group box.
8. Click on Concatenate button to concatenate steps.
9. The output of the concatenation process will be updated in the Tool Output textbox.
10. Finally, check the destination folder to verify the concatenated task.

## To build for development

``` bash
git checkout "trunk" branch in the tools-investigations-2019 Repo
```

Install dependencies with npm :

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` that are only used in electron on the backend when the application is built by the packager. Please use `npm` as dependencies manager.


If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.  
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

- **in a terminal window** -> npm start  

SIMDEV tool app launched in a local development environment with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.  
The Angular component contains an example of Electron and NodeJS native lib import. 

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |

**Application is optimised. Only /dist folder and node dependencies are included in the executable.**

## You want to use a specific lib (like rxjs) in electron main thread ?

You can to this! Just by importing your library in npm dependencies (not devDependencies) with `npm install --save`. It will be loaded by electron during build phase and added to the final package. Then use your library by importing it in `main.ts` file. 

## Browser mode

Maybe you want to execute the application in the browser with hot reload ? You can do it with `npm run ng:serve:web`.  
Note that you can't use Electron or NodeJS native libraries in this case. Please check `providers/electron.service.ts` to watch how conditional import of electron/Native libraries is done.
