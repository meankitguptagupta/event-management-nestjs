import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, fetchTags } from '../../../redux/features/tagSlice';
import { tagEvent } from '../../../redux/features/tagSlice';
import ConfirmModal from '../../../components/ConfirmModal.component';
import { AppDispatch } from '../../../redux/store';

interface TagProps {
    eventId?: string;
    tags: string[]; // Tags are now managed in the parent
    onUpdateTags: (updatedTags: string[]) => void; // Callback to update tags in the parent
}

const Tags: React.FC<TagProps> = ({ eventId, tags, onUpdateTags }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [tagToRemove, setTagToRemove] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { tags: availableTags, loading, error } = useSelector(tagEvent);

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Fetch matching tags as the user types (debounced)
    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        if (searchQuery.trim()) {
            debounceTimeoutRef.current = setTimeout(() => {
                dispatch(fetchTags(searchQuery));
            }, 500); // 500ms debounce delay
        }
    }, [searchQuery, dispatch]);

    // Handle adding a tag (from search results or custom input)
    const handleTagAdd = (tag: string) => {
        if (!tags.includes(tag)) {
            const updatedTags = [...tags, tag];
            onUpdateTags(updatedTags); // Notify the parent
            dispatch(createTag({ name: tag })); // Optional: Save new tag in the database
        }
        setSearchQuery(''); // Clear the search query
    };

    // Handle selecting a tag from the search results
    const handleTagSelect = (tag: string) => {
        handleTagAdd(tag); // Reuse the same logic for adding tags
    };

    // Handle removing a tag (with confirmation)
    const handleTagRemove = () => {
        if (tagToRemove) {
            const updatedTags = tags.filter((t) => t !== tagToRemove);
            onUpdateTags(updatedTags); // Notify the parent
            setShowConfirmModal(false); // Close the modal
            setTagToRemove(null); // Reset the state
        }
    };

    // Handle Enter key press in the input field
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            handleTagAdd(searchQuery); // Add the tag on Enter
        }
    };

    return (
        <div className="tag">
            {/* Input for searching or adding tags */}
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

            {/* Display search results */}
            {searchQuery && !loading && availableTags.length > 0 && (
                <ul className="search-results list-group">
                    {availableTags.map((tag) => (
                        <li
                            key={tag.id}
                            className="search-result-item list-group-item list-group-item-action"
                            onClick={() => handleTagSelect(tag.name)}
                        >
                            {tag.name}
                        </li>
                    ))}
                </ul>
            )}

            {/* Display selected tags */}
            <div className="tag-list my-2">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {tags.map((tag, index) => (
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
                onAction={(confirmed) => {
                    if (confirmed) handleTagRemove();
                    else setShowConfirmModal(false);
                }}
            />
        </div>
    );
};

export default Tags;
