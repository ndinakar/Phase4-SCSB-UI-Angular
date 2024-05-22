

# SCSB - UI

SCSB-UI is a microservice application that provides the User Interface for the application.The User Interface has a user login on successful authentication. Based on the user’s privileges, the User Interface provides search functionality, request, reporting, batch jobs accessibility, and user management.

## Software Required

 - Angular 9
 - Node 14
 
## Prerequisite

Angular and node should be installed with 9 and 14 versions respectively.

## Build

Download the Project , navigate inside project folder and build the project using below command

**npm run build:${Environment}**

The build artifacts will be stored in the `dist/` directory. 

After successful build , copy the content of `dist` to UI-Service static folder.

