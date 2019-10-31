export class User {
  _id: string;
  username: string;
  password: string;
  email: string;
  facebook: FacebookUser;
  twitter: TwitterUser;
  avatar: string;
  avatar_type: string;
}

class FacebookUser {
  id: string;
  token: string;
  email: string;
  name: string;
}

class TwitterUser {
  id: string;
  token: string;
  email: string;
  name: string;
}

export class UserRegister {
  name: string;
  username: string;
  password: string;
  password2: string;
  email: string;
}

