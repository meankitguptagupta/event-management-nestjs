import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, fetchTags } from '../../../redux/features/tagSlice';
import { tagEvent } from '../../../redux/features/tagSlice';
import { updateEventById } from '../../../redux/features/eventSlice';  // Import the updateEventById thunk
import { AppDispatch } from '../../../redux/store';  // Import AppDispatch

interface TagProps {
    eventId?: string;
    tags?: string[];
}

const Tags: React.FC<TagProps> = ({ eventId, tags = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [localTags, setLocalTags] = useState<string[]>(tags); // Use local state to manage selected tags
    const dispatch = useDispatch<AppDispatch>();  // Correctly type dispatch
    const { tags: availableTags, loading, error } = useSelector(tagEvent);

    // Using useRef to store the debounce timeout ID to clear it when necessary
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Trigger fetchTags when search query changes with debouncing
    useEffect(() => {
        // Clear previous timeout if there is one
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Set new timeout to trigger the fetch after 500ms
        if (searchQuery.trim()) {
            debounceTimeoutRef.current = setTimeout(() => {
                dispatch(fetchTags(searchQuery));
            }, 500); // 500ms delay
        }
    }, [searchQuery, dispatch]);

    // Handle tag selection from search results
    const handleTagSelect = (tag: string) => {
        // Only update if tag is not already in the list
        if (!localTags.includes(tag)) {
            const updatedTags = [...localTags, tag];  // Add tag immutably
            setLocalTags(updatedTags);  // Update the localTags state

            // Update the event with the new tags
            if (eventId) {
                dispatch(updateEventById({ id: eventId, params: { tags: updatedTags } }));
            }
        }
        setSearchQuery(''); // Clear input field
    };

    // Handle adding a custom tag or selected tag
    const handleTagAdd = (tag: string) => {
        if (tag && !localTags.includes(tag)) {
            const updatedTags = [...localTags, tag]; // Add custom tag immutably
            setLocalTags(updatedTags); // Update localTags state

            // Create the new tag and update the event with the new tags
            if (eventId) {
                dispatch(updateEventById({ id: eventId, params: { tags: updatedTags } }));
                dispatch(createTag({ name: tag })); // Create the new tag
            }
        }
        setSearchQuery(''); // Clear input after adding tag
    };

    const removeTag = (tag: string) => {
        if (tag && localTags.includes(tag)) {
            const updatedTags = localTags.filter(t => t !== tag); // Add custom tag immutably
            setLocalTags(updatedTags); // Update localTags state

            // Create the new tag and update the event with the new tags
            if (eventId) {
                console.info('yes=--->', updatedTags, eventId)
                dispatch(updateEventById({ id: eventId, params: { tags: updatedTags } }));
            }
        }
    }

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
                    onKeyDown={handleKeyDown} // Listen for Enter key
                    placeholder="Search or add tag"
                />
            </div>

            {/* Display search results as a list */}
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

                {/* Display selected tags */}
                {localTags.map((tag, index) => (
                    <span key={index} className="badge rounded-pill text-bg-primary me-3 fs-6">
                        {tag} <i className="fa fa-times-circle ms-2 cursor-pointer" onClick={() => removeTag(tag)} aria-hidden="true"></i>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Tags;
