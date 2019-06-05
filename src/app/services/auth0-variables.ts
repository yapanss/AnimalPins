interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'qxM3cS1UpV93dnVEezK6wuFZuL6iWJg7',
  domain: 'yapanss.auth0.com',
  callbackURL: 'http://localhost:4200/login'
  //callbackURL: 'https://myvotingapp.herokuapp.com/login'
};
