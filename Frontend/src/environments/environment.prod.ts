export const environment = {
  production: true,
  defaultsLanguage: 'en',
  apiBaseURL: '//ec2-54-160-162-165.compute-1.amazonaws.com:8080/api/',
  emailPattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,3}$',
  passwordPattern: '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@!%?&_-])[A-Za-z\d$@$!%*?&].{6,}',
  pageSize: 10,
};
