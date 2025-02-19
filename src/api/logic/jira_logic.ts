/* ************************************************************************** */
/*                                   Imports                                  */
/* ************************************************************************** */
import { createNewJiraIssue, attachFileToIssue } from '../api_calls/jira/jira_svc_calls';
import * as jiraModals from '../api_modals/jira/jira_modals';
import { PlaywrightAPIResponse } from '../../../utils/api/types';


export const createJiraIssue = async (defectData: jiraModals.CreateDefectRequestModal, filePath: string): Promise<PlaywrightAPIResponse<jiraModals.CreateDefectResponseModal>> => {
    // TODO: Check different conditions before logging jira defect
    // let getDefectWithTitle = await getJiraDefectsWithTitle(defectData.fields.summary);
    // if (getDefectWithTitle.body.issues.length === 0) {
    //     return await createNewJiraDefect(defectData);
    // } else {
    //     return Promise.reject(new Error("A defect with the same title already exists."));
    // }
    const response = await createNewJiraIssue(defectData);
    if (response.status === 201) {
        let attachResp = await attachFileToIssue(response.body.key, filePath);
        if (attachResp.status === 200) {
            console.log("File attached successfully to issue: ", response.body.key);
        }
    }
    return response;
};