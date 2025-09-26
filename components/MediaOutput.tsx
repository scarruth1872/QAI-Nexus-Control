// Fix: Replaced placeholder content with a valid React component.
import React from 'react';

interface MediaOutputProps {
    imageUrl: string | null;
    prompt: string | null;
}

const MediaOutput: React.FC<MediaOutputProps> = ({ imageUrl, prompt }) => {
    return (
        <div className="module-panel">
            <h3>Media Output</h3>
            {imageUrl ? (
                <div>
                    <img src={imageUrl} alt={prompt || "Generated media"} style={{ maxWidth: '100%' }} />
                    <p><em>{prompt}</em></p>
                </div>
            ) : (
                <p>No media generated.</p>
            )}
        </div>
    );
};

export default MediaOutput;
