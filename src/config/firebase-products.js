import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { app } from './firebase-config';
import { PRODUCTS } from '../products';

const db = getFirestore(app);

export const addProductsToFirebase = async () => {
    

    const productsCollectionRef = collection(db, "products");

    // Fetch all products from Firestore
    const querySnapshot = await getDocs(productsCollectionRef);
    const firestoreProducts = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

    for (const product of PRODUCTS) {
       

        let isDuplicate = false;
        for (const firestoreProduct of firestoreProducts) {
            
            isDuplicate = Object.keys(product).every(key => product[key] === firestoreProduct[key]);
            if (isDuplicate) break;
        }

        if (isDuplicate) {
            continue;
        }

        try {
            
            const productDocRef = doc(db, "products", product.id.toString());
            await setDoc(productDocRef, product, {merge: true});

        } catch (err) {
            console.error("Error adding product: ", err);
        }
    }
};
