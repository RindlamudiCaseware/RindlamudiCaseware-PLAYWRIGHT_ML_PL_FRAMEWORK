/* ************************************************************************** */
/*                                   Imports                                  */
/* ************************************************************************** */

/** Playwright Imports */
import { APIRequestContext, request, APIResponse } from '@playwright/test';

/** Types*/
import { Headers, QueryParams, PlaywrightAPIResponse } from '../api/types';
import * as fs from 'fs';
import FormData from 'form-data';

/**
 * Represents an API client for making HTTP requests using Playwright.
 */
export default class PlaywrightApiClient {
  /**
   * The base URL for the API requests.
   */
  private baseUrl: string;

  /**
   * The default headers to be included in the API requests.
   */
  private defaultHeaders: Headers;

  /**
   * The API request context for making API calls.
   */
  private apiRequestContext: APIRequestContext = null!;
  private timeout: number;

  /**
   * Constructs a new instance of the PlaywrightApiClient class.
   * @param baseUrl The base URL for the API requests.
   * @param defaultHeaders The default headers to be included in the API requests.
   */
  constructor(baseUrl: string, defaultHeaders: Headers = {}, timeout: number = 300000) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
    this.timeout = timeout;
  }

  /**
   * Initializes the API request context.
   */
  async init(): Promise<void> {
    this.apiRequestContext = await request.newContext({
      timeout: this.timeout,
    });
  }

  /**
   * Builds the complete URL for the API request.
   * @param path The path of the API endpoint.
   * @param queryParams The query parameters for the API request.
   * @returns The complete URL for the API request.
   */
  private buildUrl(path: string, queryParams?: QueryParams): string {
    let url = `${this.baseUrl}${path}`;
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams as any).toString();
      url += `?${queryString}`;
    }
    return url;
  }

  /**
   * Builds the headers for the API request.
   * @param headers The additional headers for the API request.
   * @returns The headers for the API request.
   */
  private buildHeaders(headers?: Headers): Headers {
    return { ...this.defaultHeaders, ...headers };
  }

  /**
   * Convert api response to type of PlaywrightAPIResponse<T>.
   * @param response The response object from the API request.
   * @returns The API response object.
   */
  private async getAPIResponse<T>(response: APIResponse): Promise<PlaywrightAPIResponse<T>> {
    let body: T;
    try {
      body = await response.json();
    } catch (e) {
      console.log(`Failed to parse response body:=> ${await response.json()} as JSON. Below is the error: ${e}. Trying to parse as text.`);
      body = (await response.text()) as unknown as T;
    }
    this.apiRequestContext.dispose();
    return {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      body: body
    };
  }

  /**
   * Sends a GET request to the specified API endpoint.
   * @param path The path of the API endpoint.
   * @param queryParams The query parameters for the API request.
   * @param headers The additional headers for the API request.
   * @returns The API response object.
   */
  async get<T>(path: string, queryParams?: QueryParams, headers?: Headers): Promise<PlaywrightAPIResponse<T>> {
    if (!this.apiRequestContext)
      await this.init();

    const url = this.buildUrl(path, queryParams);
    const response = await this.apiRequestContext.get(url, {
      headers: this.buildHeaders(headers),
    });

    return await this.getAPIResponse<T>(response);
  }

  /**
   * Sends a POST request to the specified API endpoint.
   * @param path The path of the API endpoint.
   * @param body The request body for the API request.
   * @param headers The additional headers for the API request.
   * @returns The API response object.
   */
  async post<T>(path: string, body: any, headers?: Headers): Promise<PlaywrightAPIResponse<T>> {
    if (!this.apiRequestContext)
      await this.init();

    const response = await this.apiRequestContext.post(`${this.baseUrl}${path}`, {
      headers: this.buildHeaders({ 'Content-Type': 'application/json', ...headers }),
      data: body,
    });

    return await this.getAPIResponse<T>(response);
  }

  /**
   * Sends a PUT request to the specified API endpoint.
   * @param path The path of the API endpoint.
   * @param body The request body for the API request.
   * @param headers The additional headers for the API request.
   * @returns The API response object.
   */
  async put<T>(path: string, body: any, headers?: Headers): Promise<PlaywrightAPIResponse<T>> {
    if (!this.apiRequestContext)
      await this.init();

    const response = await this.apiRequestContext.put(`${this.baseUrl}${path}`, {
      headers: this.buildHeaders({ 'Content-Type': 'application/json', ...headers }),
      data: body,
    });

    return await this.getAPIResponse<T>(response);
  }

  /**
   * Sends a DELETE request to the specified API endpoint.
   * @param path The path of the API endpoint.
   * @param body The request body for the API request.
   * @param headers The additional headers for the API request.
   * @returns The API response object.
   */
  async delete<T>(path: string, body?: any, headers?: Headers): Promise<PlaywrightAPIResponse<T>> {
    if (!this.apiRequestContext)
      await this.init();

    const response = await this.apiRequestContext.delete(`${this.baseUrl}${path}`, {
      headers: this.buildHeaders({ 'Content-Type': 'application/json', ...headers }),
      data: body,
    });

    return await this.getAPIResponse<T>(response);
  }

  /**
   * Sends a POST request with multipart/form-data.
   * @param endpoint The path of the API endpoint.
   * @param filePath The path to the file to be uploaded.
   * @param additionalData Additional form data to be sent along with the file.
   * @param headers The additional headers for the API request.
   * @returns The API response object.
   */
  async postMultipart<T>(endpoint: string, filePath: string, additionalData: Record<string, any> = {}, headers?: Headers): Promise<PlaywrightAPIResponse<T>> {
    if (!this.apiRequestContext)
      await this.init();

    const response = await this.apiRequestContext.post(`${this.baseUrl}${endpoint}`, {
      headers: {
        ...this.buildHeaders(headers),
      },
      multipart: {
        file: fs.createReadStream(filePath),
      },
    });
    return await this.getAPIResponse<T>(response);
  }
}