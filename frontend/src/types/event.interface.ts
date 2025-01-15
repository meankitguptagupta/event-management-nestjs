export interface ICreateEvent {
    name: string,
    isRecurring: boolean,
    recurrenceType?: string | null,
    eventTimestamp: string,
    recurrenceCount: number
}

export interface IEvent extends ICreateEvent {    
    createdAt: string,
    updatedAt: string,
    id: string,
    creator: {
        name: string,
        role: string
    }
}


export interface IEventDetail extends IEvent {
    creatorId: string,
    tags: string[],
    attendees: string[],
    creator: {
        id: string,
        createdAt: string,
        updatedAt: string,
        name: string,
        email: string,
        role: string,
        managerId: null
    }
}

export interface IUpdateEvent {
    name?: string,
    isRecurring?: boolean,
    recurrenceType?: string | null,
    eventTimestamp?: string,
    recurrenceCount?: number,
    tags?: string[],
    attendees?: string[]
}