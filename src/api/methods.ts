import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coincap.io/v2/",
});


export const methods = {
    getCoins(currentPage: number, itemsPerPage: number) {
        return api.get(`assets?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`);  
    },
    getCoin(id: string) {
        return api.get(`assets/${id}`);  
    },
    getCoinPriceChart: (id, timeframe) => {
        return api.get(`assets/${id}/history?interval=${timeframe}`);
    },
    getTopCoins: () => {
        return api.get(`assets?limit=3`);
    }
}

export const getIcon = (id: string) => {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
}