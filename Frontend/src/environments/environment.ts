// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultsLanguage: 'en',
  apiBaseURL: '//ec2-54-160-162-165.compute-1.amazonaws.com:8080/api/',
  emailPattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,3}$',
  passwordPattern:
    '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@!%?&_-])[A-Za-zd$@$!%*?&].{6,}',
  pageSize: 10,
  maxFileSize: 10000000,
  baseUrl:"http://localhost:7000"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
