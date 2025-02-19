import { Credentials } from "../shared-data";
import * as stageCredsData from './user-details-stage.json';
import * as qaCredsData from './user-details-qa.json';

const env = process.env.TEST_ENV || 'stage';

export function adminCredentials(): Credentials {
  switch (env) {
    case 'stage':
      return stageCredsData.adminCredentials as Credentials;
    case 'qa':
      return qaCredsData.adminCredentials as Credentials;
    default:
      return stageCredsData.adminCredentials as Credentials;
  }
};

export function learnerCredentials(): Credentials {
  switch (env) {
    case 'stage':
      return stageCredsData.learnerCredentials as Credentials;
    case 'qa':
      return qaCredsData.learnerCredentials as Credentials;
    default:
      return stageCredsData.learnerCredentials as Credentials;
  }
};

export function fullManagerCredentials(): Credentials {
  switch (env) {
    case 'stage':
      return stageCredsData.fullManagerCredentials as Credentials;
    case 'qa':
      return qaCredsData.fullManagerCredentials as Credentials;
    default:
      return stageCredsData.fullManagerCredentials as Credentials;
  }
};

export function basicManagerCredentials(): Credentials {
  switch (env) {
    case 'stage':
      return stageCredsData.basicManagerCredentials as Credentials;
    case 'qa':
      return qaCredsData.basicManagerCredentials as Credentials;
    default:
      return stageCredsData.basicManagerCredentials as Credentials;
  }
};

export function limitedManagerCredentials(): Credentials {
  switch (env) {
    case 'stage':
      return stageCredsData.limitedManagerCredentials as Credentials;
    case 'qa':
      return qaCredsData.limitedManagerCredentials as Credentials;
    default:
      return stageCredsData.limitedManagerCredentials as Credentials;
  }
};