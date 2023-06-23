import axios from 'axios'
import { QueryString } from '@/types/types';


const getMarsRover = async (query:QueryString) => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${query?.initialString}&page=${query?.pageNumber}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
    try {
        return data
    } catch (error:any) {
        return error.message
    }

}

const marsRoverService = {
    getMarsRover,
}

export default marsRoverService;