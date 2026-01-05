export async function uploadToCloudinary(file: File, publicId?: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  if (publicId) {
    formData.append("public_id", publicId);
    formData.append("overwrite", "true");
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
}
