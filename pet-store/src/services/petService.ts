import axios from 'axios';

const baseUrl = 'http://localhost:8080/magcalas/pets';

const petService = {
  getAllPets: async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  },
  getPetById: async (id: number) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  },
  createPet: async (pet: any) => {
    const response = await axios.post(baseUrl, pet);
    return response.data;
  },
  updatePet: async (id: number, pet: any) => {
    const response = await axios.put(`${baseUrl}/${id}`, pet);
    return response.data;
  },
  deletePet: async (id: number) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  },
};

export default petService;