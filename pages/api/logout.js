
export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.setHeader('Set-Cookie', `${process.env.COOKIE_NAME}=''; Max-Age=0; Path=/`);

    res.end(JSON.stringify({ detail: 'logout Successful' }));
  } else {
    res.statusCode = 405;
    res.end();
  }
}
