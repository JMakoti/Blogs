import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase/firebase";

export async function uploadImageToFirebase(file: File) {
  try {
    const imageRef = ref(storage, `images/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    await addDoc(collection(db, "images"), {
      imageUrl: downloadURL,
      createdAt: new Date(),
    });

    console.log("Image uploaded successfully:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
