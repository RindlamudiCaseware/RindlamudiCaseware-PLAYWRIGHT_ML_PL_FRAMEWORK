/* ************************************************************************** */
/*                                   Imports                                  */
/* ************************************************************************** */

/** Class imports*/
import PlaywrightApiClient from '../../../utils/api/api-client';

/** Modal Imports*/
import * as jiraModals from '../../api_modals/jira/jira_modals';

/** Type Imports */
import { Headers, QueryParams, PlaywrightAPIResponse } from '../../../utils/api/types';


/** API Client Creation. */
const baseURL = 'https://pluralsight.atlassian.net/rest/api/2';
const creds = process.env.JIRA_CREDS || ''; // Format: email:token
const authHeader = 'Basic ' + Buffer.from(`${creds}`).toString('base64');
const headers: Headers = {
    'Authorization': authHeader,
    'Content-Type': 'application/json',
};

/* ************************************************************************** */
/*                             /GET USER REQUESTS                             */
/* ************************************************************************** */

export const getJiraDefectsWithTitle = async (title: string): Promise<PlaywrightAPIResponse<jiraModals.GetJiraIssuesResponse>> => {
    const apiClient = new PlaywrightApiClient(baseURL, headers);
    const endpoint = "/search";
    const jqlQuery: QueryParams = {
        'jql': `summary~"${title}" AND issuetype=Bug`,
    };
    return await apiClient.get<jiraModals.GetJiraIssuesResponse>(endpoint, jqlQuery, headers);
};

/* ************************************************************************** */
/*                             /POST USER REQUESTS                            */
/* ************************************************************************** */
export const createNewJiraIssue = async (defectData: jiraModals.CreateDefectRequestModal): Promise<PlaywrightAPIResponse<jiraModals.CreateDefectResponseModal>> => {
    const apiClient = new PlaywrightApiClient(baseURL, headers);
    const endpoint = "/issue";
    return await apiClient.post<jiraModals.CreateDefectResponseModal>(endpoint, defectData);
};

export const attachFileToIssue = async (issueKey: string, filePath: string): Promise<PlaywrightAPIResponse<any>> => {
    const mheaders: Headers = {
        'Authorization': authHeader,
        'X-Atlassian-Token': 'no-check',
    };
    const apiClient = new PlaywrightApiClient(baseURL, mheaders);
    const endpoint = `/issue/${issueKey}/attachments`;
    return await apiClient.postMultipart(
        endpoint,
        filePath,
    );
};