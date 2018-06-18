const secrets = {
  dbUri: process.env.DB_URL
};

export const getSecret = key => secrets[key];
