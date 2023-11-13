/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, createContext, useEffect, useState, useReducer } from 'react'
import { Reducer } from "./Reducer";
import axios from 'axios'

const globalContext = createContext()

const Context = ({ children }) => {
    const [popDial, setpopDial] = useState(false)
    const [tempItem, settempItem] = useState({})


    const Kid = process.env.REACT_APP_RAZORPAY_KEY_ID
    const getDataFromLocal = (key, action) => {
        let data = localStorage.getItem(key);
        try {
            if (data) {
                dispatch({ type: action, payload: JSON.parse(data) });
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getDataFromLocal("foodahCart", "SET_CART");
        getDataFromLocal("foodahAds", "SET_ADS");
        getDataFromLocal("siteOrders", "SET_ORDER");
    }, []);

    const initialState = {
        Loading: true,
        Data: [],
        MainMenu: [],
        TopDish: [],
        TopChain: [],
        Filtered: [],
        Resturent: {
            Status: [],
            Offers: [],
            ItemList: []
        },
        Collection: [],
        SortBy: '',
        FilterBy: {},
        Cart: {
            Id: '',
            Name: '',
            area: '',
            deliveryFee: '',
            Distance: '',
            CartItem: [],
            ImageId: ''
        },
        address: [],
        Payment: {
            itemTotal: '',
            deliveryFee: '',
            platformFee: 200,
            gstFee: 0,
            Total: ''
        },
        isAlert: false,
        alertMsg: "",
        alertType: "",
        statusDial: false,
        statusDialMsg: ''
    }
    const [state, dispatch] = useReducer(Reducer, initialState)

    const fetchFoodList = async () => {
        dispatch({ type: "LOADING_START" })
        const response = await axios.get("http://localhost:5000/api")
        dispatch({ type: "SET_FOOD", payload: response.data })
        dispatch({ type: "LOADING_END" })
    }

    useEffect(() => {
        fetchFoodList()
    }, [])

    const fetchResturant = async (id) => {
        dispatch({ type: "LOADING_START" })
        const response = await axios.get(`http://localhost:5000/api/restaurants/${id}`)
        dispatch({ type: "SET_RESTURENT", payload: response.data.data })
        dispatch({ type: "LOADING_END" })
    }

    const toIndianCurrency = (i) => {
        const curr = (i / 100).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
        });
        return curr;
    };

    const fetchCollection = (e) => {
        dispatch({ type: 'UPDATE_COLLECTION', payload: e })
    };
    const toggleBtn = (e) => {
        const classList = e.current.classList;
        classList.toggle("hidden");
        classList.toggle("block");
    };

    const SortByValue = (i) => {
        dispatch({ type: "SORT_BY", payload: i })
    }
    useEffect(() => {
        dispatch({ type: "SORTED_PRODUCT" })
    }, [state.SortBy])

    useEffect(() => {
        dispatch({ type: "SUB_TOTAL" })
        setTimeout(() => {
            localStorage.setItem("foodahCart", JSON.stringify(state.Cart));
        }, 2000)
    }, [state.Cart.CartItem])
    const FilterByValue = (i) => {
        dispatch({ type: "FILTER_BY", payload: i })
    }
    const clearFilterValue = (i) => {
        dispatch({ type: "CLEAR_FILTER" })
    }
    useEffect(() => {
        dispatch({ type: "UPDATE_FILTERED_PRODUCT" })
    }, [state.FilterBy])
    const addToCart = (i) => {
        if (state.Cart.CartItem.length !== 0 && state.Cart.Id !== i.Id) {
            setpopDial(true)
            settempItem(i)
        }
        else {
            dispatch({ type: "ADD_TO_CART", payload: i })
            dispatch({
                type: "ALERT",
                payload: { massage: "Item added in Cart", type: "sucess" },
            });
        }
    }
    const confirm = () => {
        dispatch({ type: "RESET_CART" })
        dispatch({ type: "ADD_TO_CART", payload: tempItem })
        setpopDial(false)
        dispatch({
            type: "ALERT",
            payload: { massage: "Item added in Cart", type: "sucess" },
        });
    }
    const notConfirm = () => {
        setpopDial(false)
    }
    const HandleInc = (i) => {
        dispatch({ type: "QTY_INC", payload: i })
        dispatch({
            type: "ALERT",
            payload: { massage: "Quantity Increased", type: "sucess" },
        });
    }
    const HandleDec = (i) => {
        dispatch({ type: "QTY_DEC", payload: i })
        dispatch({
            type: "ALERT",
            payload: { massage: "Quantity Decreased", type: "danger" },
        });
    }
    const removeCart = (i) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: i });
        dispatch({
            type: "ALERT",
            payload: { massage: "Item Removed From Cart", type: "danger" },
        });
    }

    const filterCheck = (i, tempItem) => {
        let tag = i.target.name
        let value = i.target.value
        let isChecked = i.target.checked;
        let newFilter = { ...tempItem };
        if (isChecked) {
            if (!newFilter[tag]) {
                newFilter[tag] = [value]
            }
            else if (!newFilter[tag].includes(value)) {
                newFilter[tag].push(value)
            }
        }
        else {
            if (newFilter[tag]) {
                newFilter[tag] = newFilter[tag].filter((val) => val !== value)
            }
            if (newFilter[tag]?.length === 0) {
                delete newFilter[tag];
            }
        }
        return newFilter;
    }

    const saveAddress = (i) => {
        dispatch({ type: "ADD_ADDRESS", payload: i })
    }
    const setDefault = (i) => {
        dispatch({ type: "SET_DEFAULT", payload: i });
    };
    const DeleteAds = (i) => {
        dispatch({ type: "DEL_ADS", payload: i });
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: "ALERT_TIMEOUT",
            });
        }, 3000);
    }, [state.alertMsg]);
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("foodahAds", JSON.stringify(state.address));
        }, 2000)
    }, [state.address]);

    const txnClear = ()=>{
            dispatch({ type: "REMOVE_TXN_STATUS",});
    }

    // make payment using razorpay

    const orderSuccess = (e) => {

        dispatch({ type: 'SET_TXN_STATUS', payload: 'success' })
    };

    const onScriptLoad = async () => {
        const res = await initiatePayment();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        let orderAmount = parseInt(state.Payment.Total);
        const data = await fetch("http://localhost:5000/payment/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Sub_Total: orderAmount }),
        }).then((t) => t.json());


        var options = {
            key: Kid,
            name: "Guruji Meals Pvt Ltd",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: "Thankyou for Testing My Website Payment integration system",
            image:
                "https://cdn.telanganatoday.com/wp-content/uploads/2022/12/AI-1.jpg",
            handler: function (response) {
                orderSuccess(response);
            },
            prefill: {
                name: "Test Drive",
                email: "testdrive@gmail.com",
                contact: "9898525231",
            },
            theme: {
                color: "#9333ea",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    const initiatePayment = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const makePayment = () => {
        if (state.address.length === 0) {
            dispatch({
                type: "ALERT",
                payload: {
                    massage: "Plz Add a Delivery Address before making an Payment ",
                    type: "danger",
                },
            });
        } else {
            onScriptLoad();

        }
    };
    return (
        <globalContext.Provider value={{ ...state, fetchResturant, toIndianCurrency, toggleBtn, SortByValue, FilterByValue, clearFilterValue, addToCart, fetchCollection, confirm, notConfirm, popDial, HandleDec, HandleInc, removeCart, filterCheck, setDefault, DeleteAds, txnClear, saveAddress, makePayment }}>
            {children}
        </globalContext.Provider>
    )
}

export const imageUrl = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/"
export const GlobalState = () => {
    return useContext(globalContext)
}
export default Context