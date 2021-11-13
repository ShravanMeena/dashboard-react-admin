import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

// Here is an example implementation, that you can use as a base for your own Data Providers:
// this is what we use for api calls

const apiUrl = "https://some/api/v1/anothersome"; // your api endpoint

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  // add my own headers here
  options.headers.set("Access-Control-Expose-Headers", "Content-Range");
  options.headers.set("Content-Range", "esport_game_contest 0-24/319");
  const token = JSON.parse(localStorage.getItem("token")); // get  your token
  options.headers.set("Authorization", `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
};

export const CustomDataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ headers, json }) => ({
      data: json?.results?.contest,
      total: json?.results?.contest?.length,
      //   data: json,
      //   total: json?.length,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      return {
        //   data: json?.results,
        data: json,
      };
    }),

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json?.results })),

  create: (resource, params) => {
    var time_slots = localStorage.getItem("time_slots");

    var contest_create_url = `${apiUrl}/${resource}`;
    if (params.data.multistage) {
      contest_create_url = `${apiUrl}/${resource}/createContestStructure`;
    }

    const bodyData = {
      ...params.data,
      time_slots: JSON.parse(time_slots),
    };

    return httpClient(contest_create_url, {
      method: "POST",
      body: JSON.stringify(bodyData),
    }).then(({ json }) => {
      return { data: { ...params.data, id: json.id } };
    });
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "PUT",
      body: JSON.stringify({
        id: params.id,
        deletedAt: new Date(),
      }),
    }).then(({ json }) => ({ data: json })),
};
