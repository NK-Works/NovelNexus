import React from 'react';

const Post = ( { id, title, content }) => {
    return (
            <div className="space-y-6">
                <div className="flex items-start">
                    <div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-gray-600">{content}</p>
                    </div>
                </div>
                <hr className="border-gray-300" />
            </div>
    );
}

export default Post;