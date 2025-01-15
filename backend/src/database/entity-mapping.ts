export const entityMapping = {
    USER: 'user',
    EVENT: 'event',
    TAG: 'tag',
    ATTENDEE: 'attendee'
};

export type EntityCollection = keyof typeof entityMapping;