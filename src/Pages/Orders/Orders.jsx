// import React, { useContext, useEffect, useState } from "react";
// import Layout from "../../Components/Layout/Layout";
// import { db } from "../Utility/firebase";
// import { DataContext } from "../../Context/DataContext";
// import ProductCard from "../../Components/Product/ProductCard";
// import Classes from "./Orders.module.css";

// const Orders = () => {
//   const [{ user }] = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!user) {
//       setOrders([]);
//       return;
//     }

//     const unsubscribe = db
//       .collection("users")
//       .doc(user.uid)
//       .collection("orders")
//       .orderBy("created", "desc")
//       .onSnapshot((snapshot) => {
//         setOrders(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//           }))
//         );
//       });

//     return () => unsubscribe();
//   }, [user]);

//   return (
//     <Layout>
//       <section className={Classes.container}>
//         <div className={Classes.orders_container}>
//           <h2>Your Orders</h2>

//           {orders.length === 0 && (
//             <div style={{ padding: "20px" }}>
//               You don&apos;t have orders yet
//             </div>
//           )}

//           <div>
//             {orders.map((eachOrder) => (
//               <div key={eachOrder.id}>
//                 <hr />
//                 <p>Order ID: {eachOrder.id}</p>

//                 {eachOrder.data?.basket?.map((order) => (
//                   <ProductCard key={order.id} product={order} flex />
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Orders;

import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { db } from "../Utility/firebase";
import { DataContext } from "../../Context/DataContext";
import ProductCard from "../../Components/Product/ProductCard";
import Classes from "./Orders.module.css";
// Import Firebase v9 functions
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs, // Add this for manual testing
} from "firebase/firestore";

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState("");

  // Function to manually check Firestore
  const checkFirestoreManually = async () => {
    if (!user?.uid) {
      setDebugInfo("No user logged in");
      return;
    }

    try {
      console.log("🔍 MANUAL CHECK: User UID:", user.uid);

      // Check if the orders collection exists at all
      const ordersPath = `users/${user.uid}/orders`;
      console.log("📁 Checking path:", ordersPath);

      const ordersRef = collection(db, "users", user.uid, "orders");
      const snapshot = await getDocs(ordersRef);

      console.log("📊 Manual check found:", snapshot.size, "orders");

      if (snapshot.size === 0) {
        setDebugInfo(`No orders found at path: ${ordersPath}`);
        console.log("❌ Possible issues:");
        console.log("1. Payment might not be saving to Firestore");
        console.log("2. Wrong user ID is being used");
        console.log("3. Firestore rules blocking writes");
        console.log("4. Different Firestore database/emulator");
      } else {
        snapshot.forEach((doc) => {
          console.log("✅ Order found - ID:", doc.id);
          console.log("📦 Data:", doc.data());
        });
        setDebugInfo(`Found ${snapshot.size} orders in Firestore`);
      }
    } catch (error) {
      console.error("❌ Manual check error:", error);
      setDebugInfo(`Error: ${error.message} (code: ${error.code})`);

      if (error.code === "permission-denied") {
        console.error("⚠️ FIREBASE PERMISSION ERROR!");
        console.error("Update Firestore rules to allow reads:");
        console.error(`
          rules_version = '2';
          service cloud.firestore {
            match /databases/{database}/documents {
              match /users/{userId}/orders/{orderId} {
                allow read, write: if request.auth != null && request.auth.uid == userId;
              }
            }
          }
        `);
      }
    }
  };

  useEffect(() => {
    if (!user || !user.uid) {
      console.log("👤 No user or user.uid found");
      setOrders([]);
      setLoading(false);
      return;
    }

    console.log("🔄 Starting orders fetch for user:", {
      uid: user.uid,
      email: user.email,
    });

    try {
      // Create a reference to the user's orders subcollection
      const ordersCollectionRef = collection(db, "users", user.uid, "orders");
      console.log("📁 Firestore path:", ordersCollectionRef.path);

      // Try different orderBy options
      let ordersQuery;
      try {
        ordersQuery = query(ordersCollectionRef, orderBy("created", "desc"));
        console.log("✓ Using orderBy('created', 'desc')");
      } catch (error) {
        console.log("⚠️ Could not order by 'created', trying without order");
        ordersQuery = query(ordersCollectionRef);
      }

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        ordersQuery,
        (snapshot) => {
          console.log("✅ Snapshot received!");
          console.log("📊 Document count:", snapshot.size);

          if (snapshot.size === 0) {
            console.log("📭 Snapshot is empty - no orders found");
            setDebugInfo(
              "Snapshot received but empty. Checking Firestore manually..."
            );
            // Run manual check when snapshot is empty
            setTimeout(() => checkFirestoreManually(), 1000);
          } else {
            console.log("🎉 Orders found! Processing...");
          }

          const ordersData = snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log(`📦 Processing order ${doc.id}:`, {
              hasBasket: !!data.basket,
              basketLength: data.basket?.length,
              amount: data.amount,
              created: data.created,
              hasTimestamp: !!data.timestamp,
            });

            return {
              id: doc.id,
              data: data,
            };
          });

          setOrders(ordersData);
          setLoading(false);
        },
        (error) => {
          console.error("❌ Snapshot error:", error);
          console.error("Full error object:", {
            code: error.code,
            message: error.message,
            name: error.name,
          });

          setDebugInfo(`Snapshot error: ${error.code} - ${error.message}`);
          setLoading(false);

          // Check for specific errors
          if (error.code === "failed-precondition") {
            console.error(
              "⚠️ Need to create Firestore index for 'created' field"
            );
            setDebugInfo(
              "Need Firestore index. Check browser console for link."
            );
          } else if (error.code === "permission-denied") {
            console.error("⚠️ PERMISSION DENIED! Update Firestore rules:");
            console.error("Go to Firebase Console → Firestore → Rules");
          }
        }
      );

      // Cleanup function
      return () => {
        console.log("🧹 Cleaning up orders listener");
        unsubscribe();
      };
    } catch (error) {
      console.error("❌ Error in useEffect:", error);
      setDebugInfo(`Setup error: ${error.message}`);
      setLoading(false);
    }
  }, [user]);

  // Debug button component
  const DebugPanel = () => (
    <div
      style={{
        background: "#f5f5f5",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "1px solid #ddd",
      }}
    >
      <h4 style={{ marginTop: "0", color: "#666" }}>Debug Panel</h4>
      <div style={{ marginBottom: "10px" }}>
        <strong>User:</strong> {user?.email || "Not logged in"} (
        {user?.uid?.substring(0, 8)}...)
      </div>
      <button
        onClick={checkFirestoreManually}
        style={{
          padding: "8px 16px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Check Firestore Manually
      </button>
      <button
        onClick={() => {
          console.log("🔄 Current state:", { orders, loading, user });
          console.log("📋 Orders array:", orders);
        }}
        style={{
          padding: "8px 16px",
          background: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Log Current State
      </button>
      {debugInfo && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "4px",
            color: "#856404",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          <strong>Debug:</strong> {debugInfo}
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <section className={Classes.container}>
        <div className={Classes.orders_container}>
          <h2>Your Orders</h2>

          <DebugPanel />

          {loading ? (
            <div className={Classes.loading}>
              <div className={Classes.spinner}></div>
              <p>Loading your orders...</p>
              <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
                If this takes too long, click "Check Firestore Manually"
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className={Classes.no_orders}>
              <h3>No orders yet</h3>
              <p>
                Your order history will appear here once you place an order.
              </p>

              <div className={Classes.troubleshooting}>
                <h4>Troubleshooting:</h4>
                <ul>
                  <li>Make sure you're logged in with the correct account</li>
                  <li>Check browser console (F12) for errors</li>
                  <li>Verify Firebase emulator is running</li>
                  <li>Click "Check Firestore Manually" above</li>
                </ul>
              </div>

              <button
                onClick={() => (window.location.href = "/")}
                className={Classes.shop_button}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className={Classes.orders_list}>
              {orders.map((eachOrder) => {
                // Convert timestamp if needed
                const orderDate = eachOrder.data?.created
                  ? new Date(eachOrder.data.created * 1000) // Stripe timestamp is in seconds
                  : eachOrder.data?.timestamp
                  ? new Date(eachOrder.data.timestamp) // Our custom timestamp
                  : new Date();

                return (
                  <div key={eachOrder.id} className={Classes.order_card}>
                    <div className={Classes.order_header}>
                      <div>
                        <h3>
                          Order #{eachOrder.id.substring(0, 8)}...
                          <span className={Classes.order_date}>
                            {orderDate.toLocaleDateString()}
                          </span>
                        </h3>
                        <p className={Classes.order_amount}>
                          Total: $
                          {(eachOrder.data?.amount / 100).toFixed(2) || "0.00"}
                        </p>
                        <p className={Classes.order_status}>
                          Status: {eachOrder.data?.status || "Processing"}
                        </p>
                        <p className={Classes.order_id_small}>
                          ID: {eachOrder.id}
                        </p>
                      </div>
                    </div>

                    <div className={Classes.order_items}>
                      <h4>Items ({eachOrder.data?.basket?.length || 0})</h4>
                      {eachOrder.data?.basket?.map((order) => (
                        <ProductCard
                          key={order.id}
                          product={order}
                          flex
                          hideButton
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Orders;