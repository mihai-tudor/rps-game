export const generateKey = (pre) => `${pre}_${new Date().getTime()}`;
export const getDomain = () => window.location.origin;

