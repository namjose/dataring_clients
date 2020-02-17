import { BASE_URL } from './baseAxios'

export const apiAuth = {
  loginEmail: (email, password) =>
    fetch(`http://localhost:8080/user/signIn`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
}
