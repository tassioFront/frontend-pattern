const envs = import.meta.env;

export const isPRD = envs.MODE === 'production';
