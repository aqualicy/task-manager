import axios, { AxiosResponse, AxiosInstance } from 'axios';

/**
 * Represents a base HTTP RESTful service
 */
class HttpService {
    instance: AxiosInstance = axios.create();

    /**
     * Creates an instance of HttpService.
     *
     * @constructor
     */
    constructor() {
        /**
         * Get service url based on requested name and env
         *
         * @returns {string} url string for api calls
         */
        const BaseUrl = (): string => {
            return `http://localhost:8080/api/tasks`;
        };

        // this.instance.defaults.headers.common.Authorization = ``;
        this.instance.defaults.headers.common.Accept = 'application/json';
        this.instance.defaults.withCredentials = false;
        this.instance.defaults.baseURL = BaseUrl();
    }

    /**
     * Executes a GET http call to fetch data
     * @param {string} url the relative API url path
     * @param {any} logProperties properties to send for logging
     * @returns {Promise<AxiosResponse>}} a response promise that a client can subscribe to
     */
    async get(url: string, logProperties: any): Promise<AxiosResponse> {
        return this.instance.get(url, logProperties);
    }

    /**
     * Make a post call
     *
     * @async
     * @returns {Promise<AxiosResponse>} response
     * @param url
     * @param record
     * @param logProperties
     */
    async post(
        url: string,
        record: any,
        logProperties: any,
    ): Promise<AxiosResponse> {
        return this.instance.post(url, record, logProperties);
    }

    /**
     * Make a put call
     *
     * @async
     * @returns {Promise<AxiosResponse>} response
     * @param url
     * @param record
     * @param logProperties
     */
    async put(
        url: string,
        record: any,
        logProperties: any,
    ): Promise<AxiosResponse> {
        return this.instance.put(url, record, logProperties);
    }

    /**
     * Make a patch call
     *
     * @async
     * @returns {Promise<AxiosResponse>} response
     * @param url
     * @param record
     * @param logProperties
     */
    async patch(
        url: string,
        record: any,
        logProperties: any,
    ): Promise<AxiosResponse> {
        return this.instance.patch(url, record, logProperties);
    }

    /**
     * Make a delete call
     *
     * @async
     * @returns {Promise<AxiosResponse>} response
     * @param url
     * @param logProperties
     */
    async delete(
        url: string,
        logProperties: any,
    ): Promise<AxiosResponse> {
        return this.instance.delete(url, logProperties);
    }
}

export default HttpService;
