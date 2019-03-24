import { securedAxiosInstance as axios, plainAxiosInstance } from './http'

export default {
  async signup (params) {
    return await plainAxiosInstance.post('/signup', { signup: params })
  },
  async signin (params) {
    return await plainAxiosInstance.post('/signin', { signin: params })
  },
  async signout () {
    return await axios.delete('/signin')
  },
  async loadUser () {
    return await axios.get('/profile')
  },
  async loadShops () {
    return await axios.get('/shops')
  },
  async loadShop (id) {
    return await axios.get(`/shops/${id}`)
  },
  async getCustomers () {
    return await axios.get(`/shops/1/customers`)
  },
  async getCustomer (id) {
    return await axios.get(`/shops/1/customers/${id}`)
  },
  async createCustomer (data) {
    return await axios.post(`/shops/1/customers`, { customer: data })
  },
  async updateCustomer (data) {
    return await axios.put(`/shops/1/customers/${data.id}`, { customer: data })
  },
  async deleteCustomer (id) {
    return await axios.delete(`/shops/1/customers/${id}`)
  },
  async activateCustomer (id) {
    return await axios.post(`/shops/1/customers/${id}/activate`)
  },
  async deactivateCustomer (id) {
    return await axios.post(`/shops/1/customers/${id}/deactivate`)
  }
}
