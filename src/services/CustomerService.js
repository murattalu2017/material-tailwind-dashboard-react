import axios from 'axios'
import { JPA_API_URL } from '../Constants'

class CustomerService {

    retrieveAllCustomers(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/customers`);
    }

    retrieveCustomer(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/customer/${id}`);
    }

    deleteCustomer(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/customers/${id}`);
    }

    updateCustomer(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/update-customer/${id}`, todo);
    }

    createCustomer(name, customer) {
        return axios.post(`${JPA_API_URL}/users/${name}/register-customer`, customer);
    }

}

export default new CustomerService()