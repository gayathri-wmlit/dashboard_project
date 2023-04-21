import setCookieHeader from '@/libs/utils/setCookieHeader';
import { loginProxyService } from '@/src/services/auth/loginServices';

export default async function login(request, response) {
  if (request.method === 'POST') {
    const { body: { email, password } } = request;
    response.setHeader('Content-Type', 'application/json');
    const { data, errors } = await loginProxyService(email, password);
    if (errors && Object.keys(errors).length) {
      response.status(400);
      response.setHeader('Set-Cookie', setCookieHeader());
      response.end(JSON.stringify(errors));
    } else {
      response.status(200);
      response.setHeader('Set-Cookie', setCookieHeader(data.accessToken));
      response.end(JSON.stringify(data));
    }
  } else {
    response.statusCode = 405;
    response.end();
  }
}
