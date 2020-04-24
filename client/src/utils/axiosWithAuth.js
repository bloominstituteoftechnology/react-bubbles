import axios from 'axios'

const url = 'http://localhost:5000'

function axiosWithAuth() {
  const token = JSON.parse(localStorage.getItem('token'))

  // pre-configure an axios object 
  return axios.create({
    headers: {
      Authorization: token,

    },
    baseURL: url,
  })
}

// export const axiosWithAuth = (axiosWithAuth || createAxiosWithAuth());
