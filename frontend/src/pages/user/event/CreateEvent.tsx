import React from "react";
import { DynamicFormComponent } from "../../../components/DynamicForm";
import { DataObject } from "../../../components/DynamicForm/elements.interface";
import FormSchema from '../../../json-forms/create-event.json';
import { ICreateEvent, IEvent } from "../../../types/event.interface";
import { useAppDispatch } from "../../../redux/hooks";
import { createEvent } from "../../../redux/features/eventSlice";
import { clearGlobalError } from "../../../redux/features/globalErrorSlice";
import { useNavigate } from "react-router-dom";

interface CreateEventProps {
  event?: IEvent | null; // Allow null as a valid type
  onClose: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ event, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleFormSubmit = async (formData: DataObject) => {
      dispatch(clearGlobalError());

      let recurrenceType = null;

      if (formData.recurrenceType) {
          recurrenceType = (formData.recurrenceType as unknown as string[]).pop();
      }

      const params: ICreateEvent = {
          name: formData.name,
          isRecurring: formData.isRecurring == "1",
          recurrenceType: recurrenceType,
          eventTimestamp: new Date(formData.eventTimestamp).toISOString(),
          recurrenceCount: Number(formData.recurrenceCount) || 0
      };

      try {
          const result = await dispatch(createEvent(params)).unwrap();
          onClose();
          navigate(`/events/${result.id}`);
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
                              formData={FormSchema}
                              formId="create-event-form"
                              onSubmit={handleFormSubmit}
                          />
                      </div>
                      <div className="modal-footer">
                          <button className="btn btn-outline-secondary" type="reset">
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
