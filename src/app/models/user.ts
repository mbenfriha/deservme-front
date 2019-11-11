export class User {
  _id: string;
  username: string;
  password: string;
  email: string;
  facebook: FacebookUser;
  twitter: TwitterUser;
  instagram: InstagramUser;
  google: GoogleUser;
  avatar: string;
  avatar_type: string;
  banned: boolean;
  role: string;
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
class InstagramUser {
  id: string;
  token: string;
  email: string;
  name: string;
}

class GoogleUser {
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

