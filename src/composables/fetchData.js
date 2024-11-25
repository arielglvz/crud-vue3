import { ref } from "vue"

const fetchData = (URL) => {
  const arr = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      let data = await fetch(URL)
      if(!data.ok) {
        throw Error('no task available')
      }

      arr.value = data.json()
    }
    catch(err) {
      error.value = err.message
      console.log('error:', error.value)
    }
  }

  return { arr, error, load}
}

export default fetchData