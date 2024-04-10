import { useState, useEffect } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId : "asdasdada",
    photo : "https://m.media-amazon.com/images/I/71-D1xCuVwL._AC_SX342_.jpg",
    name : "Mackbook",
    price : 3000,
    quantity : 4,
    stock : 30
  }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + tax + shippingCharges;
const discount = 400;

const Cart = () => {




  const [couponCode,setCouponCode] = useState<string>("");
  const [isValidCouponCode, setisValidCouponCode ] = useState<boolean>(false);

  useEffect(()=> {

    const timeOutID = setTimeout(() => {
      if(Math.random()>0.5) setisValidCouponCode(true)
      else setisValidCouponCode(false);
    },1000);


    return () => {
      clearTimeout(timeOutID);
      setisValidCouponCode(false);
    }
  },[couponCode])

  return <div className="cart">
    <main> 

    {cartItems.length > 0 ? 
      cartItems.map((i, idx) => (
      <CartItem key={idx} cartItem={i}/>)) : <h1>No Items Added</h1>
    }



    </main>




    <aside>
      <p>Subtotal: ₹{subtotal}</p>
      <p>Shipping Charges: ₹{shippingCharges}</p>
      <p>Tax: ₹{tax}</p>
      <p>
          Discount - <em className="red">
          ₹{discount}
        </em>
      </p>
      <p>
        <b>Total : ₹{total}</b>
      </p>

      <input type="text" 
      value={couponCode} 
      placeholder="Coupon Code" 
      onChange={(e)=> setCouponCode(e.target.value)} />



      {couponCode &&(
        isValidCouponCode ? (
          <span className="green">
           ₹{discount} off using the <code>
             {couponCode} </code>
             </span>) : <span className="red">Inavlid Coupon <VscError /></span>
       
      )}


      {
        cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
      }
    </aside>
  </div>
}

export default Cart