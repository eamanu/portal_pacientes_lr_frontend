export async function get (url, header) {
    const promise = await fetch(url, {
        headers: header
    });
    return promise 
}

export async function post (url, header, data) {
    const promise = await fetch(url, {
        method: 'POST',
        headers: header,
        body: data
    });
    return promise 
}
