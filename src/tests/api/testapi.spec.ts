// /* ************************************************************************** */
// /*                                   Imports                                  */
// /* ************************************************************************** */

// /** Playwright imports */
// import {test, expect, APIRequestContext, request} from '@playwright/test';

// /** Business logic imports */
// import { createUser, getUsersList} from '../../api/api_calls/users/users_svc_calls';
// import * as usersModal from '../../api/api_modals/users/users_modal';

// /** Type imports */
// import { PlaywrightAPIResponse } from '../../utils/api/types';

// /* ************************************************************************** */
// /*                                    Test1                                   */
// /* ************************************************************************** */
// const API_URL = 'https://jsonplaceholder.typicode.com/posts';
// test('GET request to the API', async ({ request }: { request: APIRequestContext }) => {
//     const userData={name,job} as usersModal.CreateUserResponseModal;
//     const response:PlaywrightAPIResponse<usersModal.CreateUserResponseModal>  = await createUser(endpoint, this.userData);
//     const {status, statusText, headers, body} = response;
//     expect(status).toEqual(200);
//     expect(body.name).toEqual(userData.name);
//     expect(body.job).toEqual(userData.job);
//     expect(body).toHaveProperty('id');
//     expect(body).toHaveProperty('createdAt');
//   });



