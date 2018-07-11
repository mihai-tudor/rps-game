const generateKey = (pre) => `${pre}_${new Date().getTime()}`;

export default generateKey;
