export function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'adhish' && password === 'adhish') resolve('CORRECT');
      else reject(Error('wrong username/password'));
    }, 1000);
  });
}
