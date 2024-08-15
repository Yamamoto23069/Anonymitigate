// languageStorage.js
import { db, auth} from "./firebase";
import { getDoc, doc } from "firebase/firestore";
export const getUserLanguage = async () => {
    // Retrieve user's preferred language from localStorage or Firebase
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      return userDoc.data()?.language || 'vi'; // Default to Vietnamese
    }
    return 'vi';
  };
  