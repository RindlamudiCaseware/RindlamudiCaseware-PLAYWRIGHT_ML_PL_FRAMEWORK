/* ************************************************************************** */
/*                              Modals of SubTypes                            */
/* ************************************************************************** */
interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface Support {
    url: string;
    text: string;
}

/* ************************************************************************** */
/*                               Request Modals                               */
/* ************************************************************************** */
interface CreateUserRequestModal {
    name: string;
    job: string;
}

/* ************************************************************************** */
/*                               Response Modals                              */
/* ************************************************************************** */
interface CreateUserResponseModal {
    name: string;
    job: string;
    id: string;
    createdAt: string;
}

interface UserResponseModal {
    data: User[];
    support: Support;
}

interface UsersListResponseModal {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: Support;
}

/* ************************************************************************** */
/*                                   EXPORTS                                  */
/* ************************************************************************** */
export {
    CreateUserRequestModal,
    CreateUserResponseModal,
    UserResponseModal,
    UsersListResponseModal
}