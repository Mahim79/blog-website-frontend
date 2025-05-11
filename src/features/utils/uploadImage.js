async function uploadImage(image) {
  if (!["image/jpeg", "image/png", "image/jpg"].includes(image.type)) {
    throw new Error("Please upload a valid image (JPEG, PNG, JPG)");
  }

  if (image.size > 2 * 1024 * 1024) {
    throw new Error("Image size should not exceed 2MB.");
  }

  const imgData = new FormData();
  imgData.append("file", image);
  imgData.append("upload_preset", "ic-blog");
  imgData.append("cloud_name", "dutnq2gdm");

  const res = await fetch("https://api.cloudinary.com/v1_1/dutnq2gdm/image/upload", {
    method: "POST",
    body: imgData,
  });

  const data = await res.json();
  if (!res.ok || !data.secure_url) {
    throw new Error("Image upload failed.");
  }

  return data.secure_url;
}

export default uploadImage;