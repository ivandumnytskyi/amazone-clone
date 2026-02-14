export let products = [];

export function loadFatch(){
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response)=> {
    return response.json()
  })
  .then((prusuctsData) => {
    products = prusuctsData
  })

  return promise
}

export async function loadPage(func) {
  await loadFatch()
  func()  
}
