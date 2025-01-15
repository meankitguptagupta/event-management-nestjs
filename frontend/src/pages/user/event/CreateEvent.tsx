import React, { useMemo } from "react";
import { DynamicFormComponent } from "../../../components/DynamicForm";
import { DataObject } from "../../../components/DynamicForm/elements.interface";
import FormSchema from "../../../json-forms/create-event.json";
import { ICreateEvent, IEvent } from "../../../types/event.interface";
import { useAppDispatch } from "../../../redux/hooks";
import { createEvent, updateEventById } from "../../../redux/features/eventSlice";
import { clearGlobalError } from "../../../redux/features/globalErrorSlice";
import { useNavigate } from "react-router-dom";

interface CreateEventProps {
  event?: IEvent | null; // Event for editing
  onClose: () => void; // To close the modal when done
}

const CreateEvent: React.FC<CreateEventProps> = ({ event, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Prepopulate FormSchema with event values if event is available
  const prepopulatedSchema = useMemo(() => {
    if (event) {
      return FormSchema.map((field) => {
        const eventValue = event[field.id as keyof IEvent]; // Get the matching value from event
        return {
          ...field,
          value: eventValue !== undefined && eventValue !== null ? String(eventValue) : field.value, // Update the value if it exists in event
        };
      });
    }
    return FormSchema;
  }, [event]);

  // Handle form submission
  const handleFormSubmit = async (formData: DataObject) => {
    dispatch(clearGlobalError());

    let recurrenceType = null;

    // Ensure recurrenceType is an array before calling .pop()
    if (formData.recurrenceType) {
      if (Array.isArray(formData.recurrenceType)) {
        recurrenceType = formData.recurrenceType.pop(); // Pop the last element from the array
      } else {
        // If it's not an array, handle it as a single value
        recurrenceType = formData.recurrenceType;
      }
    }

    const params: ICreateEvent = {
      name: formData.name,
      isRecurring: formData.isRecurring === "1",
      recurrenceType: recurrenceType,
      eventTimestamp: new Date(formData.eventTimestamp).toISOString(),
      recurrenceCount: Number(formData.recurrenceCount) || 0,
    };

    try {
      const result = event && event.id ? await dispatch(updateEventById({ id: event.id, params })).unwrap() : await dispatch(createEvent(params)).unwrap();
      onClose(); // Close the modal
      navigate(`/events/${result.id}`); // Redirect to the new event
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="createEvent">
      <div
        className="modal fade show"
        style={{ display: "block", zIndex: 1050 }}
        tabIndex={-1}
        aria-labelledby="createEventModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {event ? "Edit Event" : "Create Event"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <DynamicFormComponent
                formData={prepopulatedSchema} // Pass the updated schema
                formId="create-event-form"
                onSubmit={handleFormSubmit}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-secondary"
                type="reset"
              >
                Reset
              </button>
              <button
                className="btn btn-outline-primary"
                type="submit"
                form="create-event-form"
              >
                {event ? "Update Event" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
