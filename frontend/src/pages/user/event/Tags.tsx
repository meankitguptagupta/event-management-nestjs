import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, fetchTags } from '../../../redux/features/tagSlice';
import { tagEvent } from '../../../redux/features/tagSlice';
import { updateEventById } from '../../../redux/features/eventSlice';  // Import the updateEventById thunk
import { AppDispatch } from '../../../redux/store';  // Import AppDispatch
import ConfirmModal from '../../../components/ConfirmModal.component';

interface TagProps {
    eventId?: string;
    tags?: string[];
}

const Tags: React.FC<TagProps> = ({ eventId, tags = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [localTags, setLocalTags] = useState<string[]>(tags); // Use local state to manage selected tags
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal visibility state
    const [tagToRemove, setTagToRemove] = useState<string | null>(null); // The tag to remove
    const dispatch = useDispatch<AppDispatch>();  // Correctly type dispatch
    const { tags: availableTags, loading, error } = useSelector(tagEvent);

    // Using useRef to store the debounce timeout ID to clear it when necessary
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Trigger fetchTags when search query changes with debouncing
    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        if (searchQuery.trim()) {
            debounceTimeoutRef.current = setTimeout(() => {
                dispatch(fetchTags(searchQuery));
            }, 500); // 500ms delay
        }
    }, [searchQuery, dispatch]);

    // Handle tag selection from search results
    const handleTagSelect = (tag: string) => {
        if (!localTags.includes(tag)) {
            const updatedTags = [...localTags, tag];
            setLocalTags(updatedTags);

            if (eventId) {
                dispatch(updateEventById({ id: eventId, params: { tags: updatedTags } }));
            }
        }
        setSearchQuery(''); // Clear input field
    };

    // Handle adding a custom tag or selected tag
    const handleTagAdd = (tag: string) => {
        if (tag && !localTags.includes(tag)) {
            const updatedTags = [...localTags, tag];
            setLocalTags(updatedTags);

            if (eventId) {
                dispatch(updateEventById({ id: eventId, params: { tags: updatedTags } }));
                dispatch(createTag({ name: tag })); // Create the new tag
            }
        }
        setSearchQuery(''); // Clear input after adding tag
    };

    // Remove tag with confirmation
    const handleTagRemove = () => {
        if (tagToRemove && localTags.includes(tagToRemove)) {
            const updatedTags = localTags.filter(t => t !== tagToRemove); // Remove the tag immutably
            setLocalTags(updatedTags);

            if (eventId) {
                dispatch(updateEventById({ id: eventId, params: { tags: updatedTags } }));
            }
        }
        setShowConfirmModal(false); // Close the confirmation modal
        setTagToRemove(null); // Reset the tag to remove
    };

    // Confirm removal action
    const handleConfirmation = (confirmed: boolean) => {
        if (confirmed) {
            handleTagRemove();
        } else {
            setShowConfirmModal(false); // Close the modal without removing the tag
            setTagToRemove(null); // Reset the tag to remove
        }
    };

    // Handle Enter key press to add tag
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            handleTagAdd(searchQuery); // Add tag when Enter is pressed
        }
    };

    return (
        <div className="tag">
            <div className="tag-search">
                <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search or add tag"
                />
            </div>

            {searchQuery && !loading && availableTags.length > 0 && (
                <ul className="search-results list-group">
                    {availableTags.map((tag) => (
                        <li
                            key={tag.id}
                            className="search-result-item list-group-item"
                            onClick={() => handleTagSelect(tag.name)}
                        >
                            {tag.name}
                        </li>
                    ))}
                </ul>
            )}

            <div className="tag-list my-2">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                {localTags.map((tag, index) => (
                    <span key={index} className="badge rounded-pill text-bg-primary me-3 fs-6">
                        {tag}
                        <i
                            className="fa fa-times-circle ms-2 cursor-pointer"
                            onClick={() => {
                                setTagToRemove(tag);
                                setShowConfirmModal(true);
                            }}
                            aria-hidden="true"
                        ></i>
                    </span>
                ))}
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                show={showConfirmModal}
                message={`Are you sure you want to remove the tag "${tagToRemove}"?`}
                onAction={handleConfirmation}
            />
        </div>
    );
};

export default Tags;
