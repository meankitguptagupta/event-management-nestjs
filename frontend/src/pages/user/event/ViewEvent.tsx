import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchEventById, selectEvent, updateEventById } from '../../../redux/features/eventSlice';
import Moment from 'react-moment';
import Tags from './Tags';
import { Attendee } from './Attendee';

const ViewEvent: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the event ID from the URL
    const dispatch = useAppDispatch();
    const { selectedEvent, loading, error } = useAppSelector(selectEvent);

    // Access the logged-in user from the Redux store
    const user = useAppSelector((state) => state.auth.user);

    // Fetch event by ID on component mount
    useEffect(() => {
        if (id) {
            dispatch(fetchEventById(id));
        }
    }, [id, dispatch]);

    // Callback to handle updates to tags
    const handleUpdateTags = (updatedTags: string[]) => {
        if (selectedEvent?.id) {
            dispatch(updateEventById({ id: selectedEvent.id, params: { tags: updatedTags } }));
        }
    };

    // Callback to handle updates to attendees
    const handleUpdateAttendees = (updatedAttendees: string[]) => {
        if (selectedEvent?.id) {
            dispatch(updateEventById({ id: selectedEvent.id, params: { attendees: updatedAttendees } }));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="view-event">
            <div className="container">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <tbody>
                            <tr>
                                <th>Event Title</th>
                                <td>{selectedEvent?.name}</td>
                            </tr>
                            <tr>
                                <th>Event Date</th>
                                <td>
                                    {selectedEvent?.eventTimestamp ? (
                                        <Moment date={selectedEvent.eventTimestamp} format="MMM DD YYYY hh:mm a" />
                                    ) : (
                                        '-'
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>Recurrence Type</th>
                                <td className={`${selectedEvent?.isRecurring ? 'bg-info' : ''}`}>
                                    {selectedEvent?.recurrenceCount
                                        ? `${selectedEvent.recurrenceType} (${selectedEvent.recurrenceCount})`
                                        : selectedEvent?.recurrenceType || '-'}
                                </td>
                            </tr>
                            <tr>
                                <th>Created By</th>
                                <td>
                                    {selectedEvent?.creator.name} ({selectedEvent?.creator.role})
                                </td>
                            </tr>
                            <tr>
                                <th>Created Date</th>
                                <td>
                                    <Moment date={selectedEvent?.createdAt} format="MMM DD, YYYY" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr/>

                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <h1>Tags</h1>
                        <Tags eventId={selectedEvent?.id} tags={selectedEvent?.tags || []} onUpdateTags={handleUpdateTags} />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        {user?.role === 'manager' && (
                            <>
                                <h1>Attendees</h1>
                                <Attendee
                                    eventId={selectedEvent?.id}
                                    attendees={selectedEvent?.attendees || []}
                                    onUpdateAttendees={handleUpdateAttendees}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEvent;
