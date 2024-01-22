const [OK, BAD_REQUEST, SERVER_ERROR, CREATED] = [200, 400, 500, 201];

export interface HttpResponse<T> {
  statusCode: number;
  body: T | { message: string };
}

export interface HttpRequest<T> {
  params?: never;
  headers?: never;
  body?: T;
}

export const ok = <T>(body: T): HttpResponse<T> => ({
  statusCode: OK,
  body,
});

export const badRequest = (message: string): HttpResponse<never> => ({
  statusCode: BAD_REQUEST,
  body: { message },
});

export const serverError = (message: string): HttpResponse<never> => ({
  statusCode: SERVER_ERROR,
  body: { message },
});

export const created = <T>(body: T): HttpResponse<T> => ({
  statusCode: CREATED,
  body,
});

export const STATUS = {
  SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
  OK,
};
