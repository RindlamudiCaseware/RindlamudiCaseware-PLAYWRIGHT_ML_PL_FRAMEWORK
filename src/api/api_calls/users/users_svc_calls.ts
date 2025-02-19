/* ************************************************************************** */
/*                                   Imports                                  */
/* ************************************************************************** */

/** Class imports*/
import PlaywrightApiClient from '../../../../utils/api/api-client';

/** Modal Imports*/
import * as usersModal from '../../api_modals/users/users_modal';

/** Type Imports */
import {QueryParams,PlaywrightAPIResponse} from '../../../../utils/api/types';


/** API Client Creation. */
const baseURL = process.env.API_BASE_URL ?? 'https://reqres.in/api';
const apiClient = new PlaywrightApiClient(baseURL);

/* ************************************************************************** */
/*                             /GET USER REQUESTS                             */
/* ************************************************************************** */

export const getUser = async (endpoint: string) => {
 return await apiClient.get(endpoint);
};

export const getUsersList = async (endpoint: string, queryParams?: QueryParams):Promise<PlaywrightAPIResponse<usersModal.UsersListResponseModal>> => {
  return await apiClient.get<usersModal.UsersListResponseModal>(endpoint, queryParams);
};

/* ************************************************************************** */
/*                             /POST USER REQUESTS                            */
/* ************************************************************************** */
export const createUser = async (endpoint: string, userData: usersModal.CreateUserRequestModal):Promise<PlaywrightAPIResponse<usersModal.CreateUserResponseModal>> => {
  return await apiClient.post<usersModal.CreateUserResponseModal>(endpoint, userData);
};