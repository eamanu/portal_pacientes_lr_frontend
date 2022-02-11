const URL = "http://128.201.239.7/portalpaciente/api/v1/institutions/all";

export default function institutionsServices(tokenUser) {
  let dataPromise;
  fetch(URL, {
    method: "GET",
    headers: {
      // "Access-Control-Allow-Origin": "*",
      accept: "application/json",
      Authorization: `Bearer ${tokenUser}`,
    },
  })
    .then(function (response) {
      console.log("response =", response);
      return response.json();
    })
    .then(function (data) {
      dataPromise = data;
      console.log("data = ", data);
    })
    .catch(function (err) {
      console.error(err);
    });

  return dataPromise;
}
