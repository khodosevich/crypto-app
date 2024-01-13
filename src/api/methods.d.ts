export declare const methods: {
    getCoins(currentPage: number, itemsPerPage: number): Promise<import("axios").AxiosResponse<any, any>>;
    getCoin(id: string): Promise<import("axios").AxiosResponse<any, any>>;
    getCoinPriceChart: (id: any, timeframe: any) => Promise<import("axios").AxiosResponse<any, any>>;
    getTopCoins: () => Promise<import("axios").AxiosResponse<any, any>>;
};
export declare const getIcon: (id: string) => Promise<import("axios").AxiosResponse<any, any>>;
