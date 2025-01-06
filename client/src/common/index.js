const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const SummaryApi = {
    FetchData:{
        url:`${BACKEND_URI}/api/getAstraData`,
        method:"GET"
    }
}
export default SummaryApi;