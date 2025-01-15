export const entityMapping = {
    USER: 'user',
    EVENT: 'event',
    TAG: 'tag'
};

export type EntityCollection = keyof typeof entityMapping;