const fakeApi = import.meta.env.VITE_API_URL

export async function fetchFakeApi(path, option) {
  return fetch(fakeApi + path, option).then((res) => {
    if (res.status === 200) return res.json()
    throw new Response(`${res.status} when fetching ${fakeApi + path}`, {
      status: res.status,
    })
  })
}
