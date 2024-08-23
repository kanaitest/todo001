// database
import {
  collection,
  doc,
  query,
  getDocs,
  where,
  setDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Libs/Firebase";
import { toast } from "react-toastify";
import { useProductActions } from "./ProductsActions";
// Add Items to cart_items collection (cartandorders/userid/cart_items)
const AddItemsToCart = async (userid, productid) => {
  // cart collection reference
  const cartItemsCollectionRef = collection(
    db,
    "cartandorders",
    userid,
    "cart_items"
  );
  // check if doc with productid === productid
  const existingDocQuery = query(
    cartItemsCollectionRef,
    where("productid", "==", productid)
  );
  const existingDocsnapshot = await getDocs(existingDocQuery);

  // if snapshot has data then product exists and cannot be updates
  if (existingDocsnapshot.docs.length != 0) {
    // do not update
    toast.error("Item Already Exist in Cart!");
    return false;
  }

  // new doc ref
  const newDocRef = doc(cartItemsCollectionRef);

  // Add a new doc
  await setDoc(newDocRef, {
    productid: productid,
    time_added: serverTimestamp(),
  }).then(() => {
    toast.success("Item Added to Cart!");
  });
};

// Add Items to orders collection (cartandorders/userid/orders)
// const AddItemsToOrders = async (userid, productid, quantity) => {
//   // cart collection reference
//   const cartItemsCollectionRef = collection(
//     db,
//     "cartandorders",
//     userid,
//     "orders"
//   );

//   // new doc ref
//   const newDocRef = doc(cartItemsCollectionRef);

//   const { fetchSingleProduct } = useProductActions;
//   //   get the product details
//   try {
//     const productaData = await fetchSingleProduct(productid);
//     const unit_price = productaData.price;
//     const total_price = unit_price * quantity;

//     // Add a new doc
//     await setDoc(newDocRef, {
//       productid: productid,
//       quantity: quantity,
//       unit_price: unit_price,
//       total_price: total_price,
//       status: "pending",
//       time_ordered: serverTimestamp(),
//       time_delivered: null,
//       time_cancelled: null,
//       time_returned: null,
//       time_shipped: null,
//     }).then(() => {
//       toast.success("Item Added to Orders!");
//     });
//   } catch (err) {
//     toast.error("Error Adding Item to Orders!" + err.message);
//   }
// };

// delete Item from cart_items given its docid
const DeleteItemFromCart = async (docid, userid) => {
  // doc ref
  const DocRef = doc(db, "cartandorders", userid, "cart_items", docid);
  // delete doc
  await deleteDoc(DocRef)
    .then(() => {
      toast.success("Item Deleted from Cart!");
    })
    .catch((err) => {
      toast.error("Error Deleting Item from Cart!" + err.message);
    });
};

//Read all items in cart_items collection for current user
const GetAllCartItems = async (userid)=>{
    // cart collection reference
  const cartItemsCollectionRef = collection(
    db,
    "cartandorders",
    userid,
    "cart_items"
  );

  const cartItemsQuery = query(cartItemsCollectionRef);
  const cartItemsSnapshot = await getDocs(cartItemsQuery);
  const cartItems = cartItemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return cartItems;
} 

export { AddItemsToCart, DeleteItemFromCart, GetAllCartItems };
