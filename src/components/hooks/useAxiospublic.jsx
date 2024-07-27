import axios from "axios";

const axiosPublic = axios.create({
  baseURL:"https://finally-deploy.vercel.app"
});

const useAxiospublic = () => {
  return axiosPublic;
};

export default useAxiospublic;