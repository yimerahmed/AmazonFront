import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Classes from "./Cart.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext, actionTypes } from "../../Context/DataContext";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket?.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  return (
    <Layout>
      <section className={Classes.container}>
        <div className={Classes.cart_container}>
          {/* LEFT SIDE */}
          <div className={Classes.left}>
            <h2>Hello, {user?.email || "Guest"}</h2>
            <h3>Your Shopping Basket</h3>
            <hr />

            {basket?.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              basket.map((item) => (
                <div key={item.id} className={Classes.cart_item}>
                  <div className={Classes.newadjusted}>
                    <ProductCard
                      product={item}
                      rendereddescription={true}
                      renderadd={false}
                      flex={true}
                    />
                  </div>

                  <div className={Classes.cart_controls}>
                    {/* UP ICON → INCREASE */}
                    <button
                      onClick={() =>
                        dispatch({
                          type: actionTypes.INCREASE_QUANTITY,
                          id: item.id,
                        })
                      }
                    >
                      <FaAngleUp />
                    </button>

                    <span>{item.amount}</span>

                    {/* DOWN ICON → DECREASE */}
                    <button
                      onClick={() =>
                        dispatch({
                          type: actionTypes.DECREASE_QUANTITY,
                          id: item.id,
                        })
                      }
                    >
                      <FaAngleDown />
                    </button>

                    <button
                      onClick={() =>
                        dispatch({
                          type: actionTypes.REMOVE_FROM_BASKET,
                          id: item.id,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT SIDE */}
          {basket?.length > 0 && (
            <div className={Classes.right}>
              <div className={Classes.subtotal_box}>
                <p>
                  Subtotal ({basket.length} items):{" "}
                  <strong>
                    <CurrencyFormat amount={total} />
                  </strong>
                </p>

                <small>
                  <input type="checkbox" />
                  <span>This order contains a gift</span>
                </small>

                <Link to="/payment" className={Classes.checkout_btn}>
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
