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
  orderBy,
} from "firebase/firestore";
import { db } from "../Libs/Firebase";
import { toast } from "react-toastify";
import { useProductActions } from "./ProductsActions";
// Add Items to cart_items collection (cartandorders/userid/cart_items)
const AddItemsToCart = async (
  userid,
  productid,
  product_image,
  product_price,
  product_name
) => {
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
    toast.info("Item Already Exist in Cart!");
    return false;
  }

  // new doc ref
  const newDocRef = doc(cartItemsCollectionRef);

  // Add a new doc
  await setDoc(newDocRef, {
    productid: productid,
    product_name: product_name,
    quantity: 1,
    unit_price: product_price,
    imageUrl: product_image,
    time_added: serverTimestamp(),
  }).then(() => {
    toast.success(
      `${product_name.split(" ").splice(0, 3).join(" ")} Added to Cart!`
    );
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

  // promise toast
  toast.promise(
    new Promise((resolve, reject) => {
      // delete doc with toast promise
      deleteDoc(DocRef)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err.message | err.reason);
        });
    }),
    {
      pending: "Removing Item from Cart...",
      success: "Removed from Cart!",
      error: " Removing Item from Cart Failed!",
    }
  );

  // delete doc without promise toast
  // await deleteDoc(DocRef)
  //   .then(() => {
  //     toast.info("Item Removed from Cart!", {
  //       icon: "🗑️",
  //     });
  //   })
  //   .catch((err) => {
  //     toast.error(" Removing Item from Cart Failed!" + err.message);
  //   });
};

//Read all items in cart_items collection for current user
const GetAllCartItems = async (userid) => {
  // cart collection reference
  const cartItemsCollectionRef = collection(
    db,
    "cartandorders",
    userid,
    "cart_items"
  );

  const cartItemsQuery = query(
    cartItemsCollectionRef,
    orderBy("time_added", "desc")
  );
  const cartItemsSnapshot = await getDocs(cartItemsQuery);
  const cartItems = cartItemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return cartItems;
};

// clear all cart Items in the cart_items collection for current user
const ClearAllCartItems = async (userid) => {
  // cart collection reference
  const cartItemsCollectionRef = collection(
    db,
    "cartandorders",
    userid,
    "cart_items"
  );

  // delete all items in the cart_items collection for current user
  const cartItemsQuery = query(cartItemsCollectionRef);
  const cartItemsSnapshot = await getDocs(cartItemsQuery);
  cartItemsSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  // redirect to home

  toast.success("Cart Cleared!");
};

// checkout function:
//:: Takes all the cart Items and makes the orders by adding the into the orders list

const CheckOutAllItems = async ({ userid }) => {
  // cart collection reference
  const cartItemsCollectionRef = collection(
    db,
    "cartandorders",
    userid,
    "cart_items"
  );
  // create a new order collection reference
  const ordersCollectionRef = collection(db, "cartandorders", userid, "orders");

  // get CartItems and loop through all the cart items and add them to the orders collection
  const cartItemsQuery = query(cartItemsCollectionRef);
  const cartItemsSnapshot = await getDocs(cartItemsQuery);
  try {
    cartItemsSnapshot.forEach(async (record) => {
      // create a new doc ref in the orders collection
      const newOrderDocRef = doc(ordersCollectionRef);
      // add the cart item to the orders collection
      await setDoc(newOrderDocRef, {
        productid: record.data().productid,
        product_name: record.data().product_name,
        imageUrl: record.data().imageUrl,
        quantity: record.data().quantity,
        unit_price: record.data().unit_price,
        price: record.data().quantity * record.data().unit_price,
        time_ordered: serverTimestamp(),
        status: "pending",
        time_delivered: null,
        time_cancelled: null,
        time_returned: null,
        time_shipped: null,
      })
        .then(async () => {
          // delete the cart item from the cart_items collection
          await deleteDoc(
            doc(db, "cartandorders", userid, "cart_items", record.id)
          );
        })
        .then(() => {
          // toast success checkout
          toast.success("Orders placed successfully!");
        });
    });
  } catch (err) {
    toast.error("Error placing orders!" + err?.messages);
  }
};

export {
  AddItemsToCart,
  DeleteItemFromCart,
  GetAllCartItems,
  ClearAllCartItems,
  CheckOutAllItems,
};
