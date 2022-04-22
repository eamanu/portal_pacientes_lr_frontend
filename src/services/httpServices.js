export async function get(url, header) {
  const promise = await fetch(url, {
    headers: header,
  })
  .then((response) => response.json())
  .then((data) => data)
  .catch((err) => console.log(err));
  return promise;
}

export async function post(url, header, data) {
  const promise = await fetch(url, {
    method: "POST",
    headers: header,
    body: data,
  })
  .then(res => res)
  .catch(err => console.log('err', err));
  return promise;
}

export async function put(url, header, data) {
  const promise = await fetch(url, {
    method: "PUT",
    headers: header,
    body: data,
  })
  .then(res => res)
  .catch(err => console.log('err', err));
  return promise;
}
