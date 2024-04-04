import React, { useState } from 'react'

export default function PreviewImage({ file }) {
    const [preview, setPreview] = useState({});
    if (file) {
        const reader = new FileReader()
        //convert in the image url which we read in the source of image element
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result)
        }
    }
    return <img style={{ width: "100px" }} src={preview} alt="" />
}