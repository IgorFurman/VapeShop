import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { app } from './firebase-config';
import { PRODUCTS } from '../products';

const db = getFirestore(app);

export const addProductsToFirebase = async () => {
    console.log("Adding products to Firebase...");

    const productsCollectionRef = collection(db, "products");

    // Fetch all products from Firestore
    const querySnapshot = await getDocs(productsCollectionRef);
    const firestoreProducts = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

    for (const product of PRODUCTS) {
        console.log(`Processing product '${product.id}'...`);

        let isDuplicate = false;
        for (const firestoreProduct of firestoreProducts) {
            
            isDuplicate = Object.keys(product).every(key => product[key] === firestoreProduct[key]);
            if (isDuplicate) break;
        }

        if (isDuplicate) {
            console.log(`Product '${product.id}' already exists in Firestore, skipping addition`);
            continue;
        }

        try {
            console.log(`Adding product '${product.id}' to Firestore...`);
            const productDocRef = doc(db, "products", product.id.toString());
            await setDoc(productDocRef, product, {merge: true});
            console.log("Product added successfully");
        } catch (err) {
            console.error("Error adding product: ", err);
        }
    }
};
