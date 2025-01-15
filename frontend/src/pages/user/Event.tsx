import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEvents, selectEvent } from "../../redux/features/eventSlice";
import { EventRow } from "./event/EventRow";
import CreateEvent from "./event/CreateEvent";
import Pagination from "../../components/Pagination.component";
import { IEvent } from "../../types/event.interface";

const EventPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const eventList = useAppSelector(selectEvent);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null); // Allow null for adding new events
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default limit

    // Fetch events on component mount
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    // Toggle the visibility of the CreateEvent modal and optionally pass an event to edit
    const toggleModal = (event: IEvent | null = null) => {
        setSelectedEvent(event);
        setIsPopupVisible((prev) => !prev);
    };

    // Calculate paginated events
    const totalEvents = eventList.events.length;
    const totalPages = Math.ceil(totalEvents / itemsPerPage);
    const paginatedEvents: IEvent[] = eventList.events.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="event">
            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Items per page dropdown */}
                <div>
                    <label htmlFor="itemsPerPage" className="me-2">
                        Items per page:
                    </label>
                    <select
                        id="itemsPerPage"
                        className="form-select d-inline-block w-auto"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to page 1 on limit change
                        }}
                    >
                        {[5, 10, 20, 50, 100].map((limit) => (
                            <option key={limit} value={limit}>
                                {limit}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add button */}
                <button className="btn btn-outline-primary" onClick={() => toggleModal()}>
                    Add
                    <i className="fa fa-plus ms-2" aria-hidden="true"></i>
                </button>
            </div>

            {/* Event table */}
            <div className="table-responsive">
                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Event Date</th>
                            <th scope="col">Recurrence Type</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Created</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedEvents.map((item, index) => (
                            <EventRow
                                key={index}
                                slNo={(currentPage - 1) * itemsPerPage + index + 1}
                                event={item}
                                onEdit={() => toggleModal(item)} // Pass the event to edit
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />

            {/* CreateEvent Modal */}
            {isPopupVisible && (
                <CreateEvent
                    event={selectedEvent} // Pass the selected event for editing, or null for adding
                    onClose={() => toggleModal()}
                />
            )}
        </div>
    );
};

export default EventPage;
