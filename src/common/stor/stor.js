export function formatURL () {
  const queryString = window.location.search
  let arr = queryString.match(/\w+/g)
  let obj = {}

  if (arr) {
    arr.forEach((item, idx) => {
      if ((idx % 2) === 0) {
        obj[item] = arr[idx + 1]
      } else {
        return false
      }
    })
    return obj
  } else {
    return {}
  }
}

export function setLocal (key, value) {
  window.localStorage.setItem(JSON.stringify(key), JSON.stringify(value))
}

export function getLocal (key) {
  return JSON.parse(window.localStorage.getItem(JSON.stringify(key)))
}
