import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { cart, clearCart } = useCart();
    const { isDarkTheme } = useTheme();
    const [showCouponInput, setShowCouponInput] = useState<boolean>(false);
    const [couponCodeValue,setCouponCodeValue] = useState<number>(0);
    const [appliedCoupon,setAppliedCoupon] = useState<number>(0);
    const couponCode = useRef<HTMLInputElement>(null);
    const [couponError,setCouponError] = useState<string>("");

    const navigator = useNavigate();

    const totalAmount =  useMemo(() => {
        return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    }, [cart])

    const handlePlaceOrder = useCallback(() => {
        window.alert("Your Order has been placed!");
        clearCart();
        navigator("/");
    }, [clearCart, navigator]);

    const handleCouponChange = () => {
        const value = couponCode.current?.value || "";
        if (value === "" || value === "0") 
        {
            setCouponCodeValue(0);
        }
        else{
            setCouponCodeValue(parseInt(value));
        }
    }

   const discountedTotal = useMemo(() => totalAmount * 0.30, [totalAmount])
    
    const savedAmount = useMemo(() => {
        return appliedCoupon > 0 ? Math.min(discountedTotal, totalAmount) : totalAmount
    }, [appliedCoupon, discountedTotal, totalAmount])

    const payableAmount = useMemo(() => {
        return appliedCoupon > 0 ? totalAmount - discountedTotal : totalAmount
    }, [appliedCoupon, totalAmount, discountedTotal])

    const handleApplyCoupon = useCallback(() => {
        if(couponCodeValue <=0 ){
            setCouponError("Please enter a valid coupon code.");
            return;
        }
        if(couponCodeValue.toString().length <4){
            setCouponError("Coupon code must be at least 4 digits.");
            return;
        }
        setCouponError("");
        setAppliedCoupon(couponCodeValue);
    }, [couponCodeValue]);
    
    useEffect(()=>{
        if (showCouponInput && couponCode.current) {
            couponCode.current.focus();
        }
    },[showCouponInput])

    if (cart.length === 0) {
        return (
            <div className={`${isDarkTheme ? "bg-slate-800 text-white" : "bg-white text-slate-800"} m-auto p-10 mt-20 rounded-2xl text-center`}>
                <p>Your cart is empty.</p>
                <button
                    onClick={() => navigator("/api-products")}
                    className={`${isDarkTheme ? "bg-white text-slate-800" : "bg-slate-800 text-white"} p-3 rounded-2xl mt-4`}
                >
                    Continue Shopping
                </button>
            </div>
        );
    }


    return (
        <div className={`${isDarkTheme ? "bg-slate-800 text-white" : "bg-white text-slate-800"} max-w-lg m-auto p-6 mt-20 rounded-2xl`}>
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <div className="mb-4">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b border-gray-300">
                        <span>{item.title} x {item.qty}</span>
                        <span>₹{(item.price * item.qty).toString().substring(0, 5)}</span>
                    </div>
                ))}
            </div>
            <div className="">
                {!showCouponInput 
                ? (
                    <button 
                        className={`text-yellow-400`}
                        onClick={() => setShowCouponInput(true)}
                        >
                            Have a Coupon?
                        </button>
                )
                :(
                    <div>
                        <div className={`flex gap-2`}>
                            <input 
                                type="number"
                                ref={couponCode}
                                placeholder="Enter Coupon Code"
                                value={couponCode.current?.value}
                                className=""
                                onChange={handleCouponChange}
                                />
                            <button
                                className={`font-bold p-3 bg-white rounded-xl text-black`}
                                onClick={handleApplyCoupon}
                            >
                                Apply
                            </button>
                        </div>
                       {couponError && <div className="text-red-500 mt-2">{couponError}</div>}
                    </div>
                )}
            </div>
                {appliedCoupon > 0 && (
                <div className="bg-green-100 text-green-800 p-3 rounded-xl mb-4">
                    You saved ₹{savedAmount.toFixed(2)} (was ₹{totalAmount.toFixed(2)})!
                </div>
            )}
            <div className="border-t-2 border-gray-300 pt-4 mb-4">
                <div className="flex justify-between font-bold text-xl">
                    <span>Total:</span>
                    <span>₹{(payableAmount).toString().substring(0, 5)}</span>
                </div>
            </div>

            <button
                onClick={handlePlaceOrder}
                className={` ${
                    isDarkTheme
                        ? "bg-white text-slate-800 hover:bg-gray-200"
                        : "bg-slate-800 text-white hover:bg-slate-700" } p-3 w-full rounded-2xl font-semibold     
                }`}
            >
                Place Order
            </button>
        </div>
    );
}

export default Checkout;