import React, { useState, useEffect } from 'react';

const PreviewImage = ({ file }) => {
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (file instanceof File) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreview(reader.result);
            };
        } else if (typeof file === 'string') {
            setPreview(file); // If file is already a URL
        } else {
            setPreview(""); // Reset preview if no file
        }
    }, [file]);

    return <img style={{ width: "100px" }} src={preview} alt="" />;
}

export default PreviewImage;
