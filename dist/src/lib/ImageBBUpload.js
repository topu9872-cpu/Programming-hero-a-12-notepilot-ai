export const ImageBBUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API}`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        throw new Error("Image upload failed");
    }
    const result = await res.json();
    return result.data.url;
};
