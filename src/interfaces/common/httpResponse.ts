export interface HttpResponse<T> {
  statusCode: number;
  body: T | { message: string };
}
