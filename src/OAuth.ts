import { Endpoints, IError, post } from './utils/Http';

export interface IAuthData {
  grantType: string;
  password: string;
  termsAndConditionsChecked: boolean;
  userType: string;
  username: string;
}

export interface IToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  scope: object | null;
  tokenType: string;
  twoFactorToken: boolean;
}

export async function authenticate(authData: IAuthData): Promise<IToken | IError | undefined> {
  const response = await post<IToken>(Endpoints.OAUTH_AUTHORIZE, authData);
  return response.parsedBody;
}

export async function refresh(refreshToken: string): Promise<IToken | IError | undefined> {
  const response = await post<IToken>(Endpoints.OAUTH_REFRESH, refreshToken);
  return response.parsedBody;
}

export async function logout(token: string): Promise<boolean> {
  const response = await post<void>(Endpoints.OAUTH_REVOKE, { token }, token);
  return response.ok;
}
