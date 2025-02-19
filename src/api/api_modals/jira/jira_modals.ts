/* ************************************************************************** */
/*                               Request Modals                               */
/* ************************************************************************** */

interface CreateDefectRequestModal {
    fields: Fields;
}


/* ************************************************************************** */
/*                               Response Modals                              */
/* ************************************************************************** */

interface CreateDefectResponseModal {
    id: string;
    key: string;
    self: string;
}

interface GetJiraIssuesResponse {
    startAt: number;
    maxResults: number;
    total: number;
    issues: any[];
}


/* ************************************************************************** */
/*                              Modals of SubTypes                            */
/* ************************************************************************** */

interface Fields {
    project: Project;
    summary: string;
    description: string;
    issuetype: Issuetype;
}

interface Issuetype {
    name: string;
}

interface Project {
    key: string;
}

/* ************************************************************************** */
/*                                   EXPORTS                                  */
/* ************************************************************************** */
export {
    CreateDefectRequestModal,
    CreateDefectResponseModal,
    GetJiraIssuesResponse,
}