export async function get(url, header) {
  const promise = await fetch(url, {
    headers: header,
  })
  .then((response) => response.json())
  .then((data) => data);
  return promise;
}

export async function simpleGet(url) { //note - not header
  const promise = await fetch(url)
  .then((response) => response.json())
  .then((data) => data);
  return promise;
}

export async function post(url, header, data) {
  const promise = await fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(data),
  });
  return promise;
}

export async function simplePost(url, data) { //note - not header
  const promise = await fetch(url, {
    method: "POST",
    body: data,
  });
  return promise;
}