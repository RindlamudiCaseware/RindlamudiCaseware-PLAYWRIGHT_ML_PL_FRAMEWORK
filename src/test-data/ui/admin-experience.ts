import { v4 as uuid } from 'uuid';
import { CreateUserAccountForm } from '../../businesslogic/ui/pages/create-user-account.page';

/* ************************************************************************** */
/*                                  Constants                                */
/* ************************************************************************** */

// Default values for user account creation
const DEFAULT_PASSWORD = 'Test@123';
const DEFAULT_COUNTRY = 'India';

/* ************************************************************************** */
/*                                Helper Functions                           */
/* ************************************************************************** */

// Generate a unique string to ensure unique user data
const generateUniqueString = (): string => uuid().replace(/-/g, '').substring(0, 6);

/* ************************************************************************** */
/*                                  Test Data                                 */
/* ************************************************************************** */

// Generate a random string for unique user email and first name

const randomUserData = ()=>{
    const uniqueUUIDString = generateUniqueString();
    const userDataObj = {
        uniqueString: uniqueUUIDString,
        userEmail: `Test-${uniqueUUIDString}@email.com`
    }
    return userDataObj;
}

// Generate a random string for unique user email and first name
 const {uniqueString, userEmail} = randomUserData();

// Define user details for account creation
export const USER_DETAILS: CreateUserAccountForm = {
    firstName: `Test${uniqueString}`,
    lastName: 'User',
    email: userEmail,
    password: DEFAULT_PASSWORD,
    confirmPassword: DEFAULT_PASSWORD,
    countryOfResidenceSelect: DEFAULT_COUNTRY
};

// Full user name for validation purposes
export const FULL_USER_NAME = `${USER_DETAILS.firstName} ${USER_DETAILS.lastName}`;