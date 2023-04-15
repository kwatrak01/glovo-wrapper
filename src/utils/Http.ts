interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export interface IError {
  error: object;
}

function getHeaders(token: string | null): HeadersInit {
  const headers = new Headers();
  headers.set('glovo-language-code', 'pl');
  headers.set('glovo-app-type', 'courier');
  headers.set('glovo-app-source', 'app-store');
  headers.set('glovo-app-version', '2.175.0');
  headers.set('glovo-api-version', '8');
  headers.set('glovo-app-platform', 'iOS');
  headers.set('user-agent', 'Glover/15364 CFNetwork/1404.0.5 Darwin/22.3.0');
  headers.set('content-type', 'application/json');
  if (token !== null) {
    headers.set('authorization', token);
  }
  return headers;
}

export function isHttpError(obj: any): obj is IError {
  return (obj as IError).error !== undefined;
}

async function http<T>(request: Request): Promise<HttpResponse<T | IError>> {
  const response: HttpResponse<T | IError> = await fetch(request);
  try {
    response.parsedBody = await response.json();
  } catch (err: any) {}

  return response;
}

export async function get<T>(
  path: string,
  token: string | null = null,
  args: RequestInit = { method: 'get', headers: getHeaders(token) },
) {
  return await http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: any,
  token: string | null = null,
  args: RequestInit = { method: 'post', body: JSON.stringify(body), headers: getHeaders(token) },
) {
  return await http<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: any,
  token: string | null = null,
  args: RequestInit = { method: 'put', body: JSON.stringify(body), headers: getHeaders(token) },
) {
  return await http<T>(new Request(path, args));
}

export enum Endpoints {
  OAUTH_AUTHORIZE = 'https://api.glovoapp.com/oauth/token',
  OAUTH_REFRESH = 'https://api.glovoapp.com/oauth/refresh',
  OAUTH_REVOKE = 'https://api.glovoapp.com/oauth/revoke',

  SWK_SETTINGS = 'https://api.glovoapp.com/v3/couriers/cities/SWK/settings',
  ME = 'https://api.glovoapp.com/v3/couriers/me',
  PROFILE = 'https://api.glovoapp.com/v3/couriers/profile',
  CHALLENGES = 'https://api.glovoapp.com/courier-challenges/challenges?source=challenges',
  DELIVERIES = 'https://api.glovoapp.com/v3/couriers/app/deliveries',
  CHECK_IN = 'https://api.glovoapp.com/v3/couriers/scheduling/check_in_info',
  REPORTS = 'https://api.glovoapp.com/v3/couriers/summary_periods?limit=[LIMIT]&offset=[OFFSET]',
  CALENDAR = 'https://api.glovoapp.com/v3/scheduling/calendar',
  REPORT_DETAILS = 'https://api.glovoapp.com/robin/couriers/summary_periods/[REPORT_ID]',
  BOOK_SLOT = 'https://api.glovoapp.com/v3/scheduling/slots/[SLOT_ID]',
}
