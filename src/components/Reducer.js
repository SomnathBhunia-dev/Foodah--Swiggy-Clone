export const Reducer = (state, action) => {
    const extractCost = (costString) => parseInt(costString.replace(/\D/g, ""));
    switch (action.type) {
        case "LOADING_START":
            return {
                ...state,
                Loading: true
            }
        case "LOADING_END":
            return {
                ...state,
                Loading: false
            }
        case "SET_FOOD":
            const inyourMind = action.payload.data.cards[1]?.card.card.imageGridCards?.info
            const allItem = [...state.MainMenu, ...state.TopChain].reduce((acc, obj) => {
                obj.info.cuisines.forEach(str => {
                    if (!acc.includes(str)) {
                        acc.push(str);
                    }
                });
                return acc;
            }, []);
            const yourMind = inyourMind?.filter((i) => allItem.includes(i.action.text))
            // const notYourMind = inyourMind?.filter((i) => !allItem.includes(i.action.text))
            return {
                ...state,
                Data: action.payload,
                MainMenu: action.payload.data.cards[5].card.card.gridElements?.infoWithStyle.restaurants,
                Filtered: action.payload.data.cards[5].card.card.gridElements?.infoWithStyle.restaurants,
                TopChain: action.payload.data.cards[2].card.card.gridElements?.infoWithStyle.restaurants,
                TopDish: yourMind
            }
        case "SET_RESTURENT":
            let Result = action.payload
            return {
                ...state, Resturent: {
                    ...state.Resturent,
                    Status: Result.cards[0].card.card.info,
                    Offers: Result.cards[1].card.card.gridElements.infoWithStyle.offers,
                    ItemList: Result.cards[2].groupedCard.cardGroupMap.REGULAR.cards
                }
            }
        case "UPDATE_COLLECTION":
            const filterUniqueObjects = (array) => {
                const uniqueMap = new Map();
                array.forEach((obj) => {
                    const key = obj.info.id + obj.info.name;
                    if (!uniqueMap.has(key)) {
                        uniqueMap.set(key, obj);
                    }
                });
                return Array.from(uniqueMap.values());
            };

            // Merge the arrays and filter unique objects
            const AllResturent = filterUniqueObjects([...state.MainMenu, ...state.TopChain]);

            let tempCollection = AllResturent.filter((i) => {
                return i.info.cuisines.includes(action.payload)
            });
            return {
                ...state,
                Collection: tempCollection
            }
        case "RESET_CART":
            return {
                ...state,
                Cart: {},
                Payment: {}
            }
        case "ADD_TO_CART":
            let { CartItem, Id, Name, deliveryFee, Distance, area, ImageId } = action.payload
            let prevCart = state.Cart.Id === Id ? state.Cart : null
            if (prevCart) {
                let prevItem = state.Cart.CartItem.find((i) => i.id === CartItem.id)
                if (prevItem) {
                    let updatedCart = state.Cart.CartItem.map((i) => {
                        if (i.id === CartItem.id) {
                            let newQty = i.Qty + CartItem.Qty
                            return {
                                ...i,
                                Qty: newQty
                            };
                        }
                        else return i;
                    })
                    return {
                        ...state,
                        Cart: {
                            ...state.Cart,
                            CartItem: updatedCart
                        }
                    }
                }
                else return {
                    ...state,
                    Cart: {
                        ...state.Cart,
                        CartItem: [...state.Cart.CartItem, CartItem]
                    }
                }
            }
            else return {
                ...state,
                Cart: {
                    Id: Id,
                    Name: Name,
                    area: area,
                    deliveryFee: deliveryFee,
                    Distance: Distance,
                    CartItem: [CartItem],
                    ImageId: ImageId
                }
            }
        case "SORT_BY":
            return {
                ...state,
                SortBy: action.payload
            }
        case "FILTER_BY":
            return {
                ...state,
                FilterBy: action.payload
            }
        case "CLEAR_FILTER":
            return {
                ...state,
                FilterBy: {}
            }
        case "FILTERED_PRODUCT":
            return {
                ...state,
                Filtered: []
            }
        case "SORTED_PRODUCT":
            let product = [...state.Filtered]
            let Sorted;
            const sortingProducts = (a, b) => {
                if (state.SortBy === 'deliveryTimeAsc') {
                    return a.info.sla.deliveryTime - b.info.sla.deliveryTime
                }
                if (state.SortBy === 'modelBasedRatingDesc') {
                    return b.info.avgRating - a.info.avgRating
                }
                if (state.SortBy === 'costForTwoAsc') {
                    return extractCost(a.info.costForTwo) - extractCost(b.info.costForTwo)
                }
                if (state.SortBy === 'costForTwoDesc') {
                    return extractCost(b.info.costForTwo) - extractCost(a.info.costForTwo)
                }
            }
            if (state.SortBy === 'relevance') {
                Sorted = [...state.MainMenu];
            }
            else {
                Sorted = product.sort(sortingProducts);
            }

            return {
                ...state,
                Filtered: Sorted
            };

        case "UPDATE_FILTERED_PRODUCT":
            let tempFiltered = [...state.MainMenu]
            const { catalog_cuisines, deliveryTime, rating, isVeg, costForTwo } = state.FilterBy;

            const sortingdeliveryTime = (a, b) => {
                return a.info.sla.deliveryTime - b.info.sla.deliveryTime
            }
            if (catalog_cuisines?.length > 0) {
                tempFiltered = tempFiltered.filter((i) => {
                    return i.info.cuisines.some((cuisine) =>
                        catalog_cuisines.includes(cuisine)
                    );
                });
            }
            if (deliveryTime?.length > 0) {
                tempFiltered = tempFiltered.sort(sortingdeliveryTime);
            }
            // if (explore?.length > 0) {
            //     tempFiltered = tempFiltered.filter((i) => {
            //         return i.info.cuisines.some((cuisine) =>
            //             catalog_cuisines.includes(cuisine)
            //         );
            //     });
            // }
            if (rating?.length > 0) {
                const ratingNumbers = rating.map(str => parseFloat(str.match(/\d+\.\d+/)[0]));
                let maxRating = Math.max(...ratingNumbers)
                tempFiltered = tempFiltered.filter((i) => {
                    return i.info.avgRating >= maxRating
                });
            }
            if (isVeg?.length > 0) {
                tempFiltered = tempFiltered.filter((i) => {
                    if (isVeg.includes('Pure Veg')) {
                        return i.info.veg === true
                    }
                    else return true
                });
            }
            if (costForTwo?.length > 0) {
                tempFiltered = tempFiltered.filter((i) => {
                    if (costForTwo.includes('Greater than Rs. 600')) {
                        return extractCost(i.info.costForTwo) > 600
                    }
                    else if (costForTwo.includes('Rs. 300-Rs. 600')) {
                        return extractCost(i.info.costForTwo) >= 300 && extractCost(i.info.costForTwo) <= 600
                    }
                    else return extractCost(i.info.costForTwo) < 300
                });
            }
            return {
                ...state,
                Filtered: tempFiltered
            }
        case "QTY_INC":
            let updateQty = state.Cart.CartItem.map((i) => {
                if (i.id === action.payload) {
                    return {
                        ...i,
                        Qty: i.Qty + 1
                    }
                }
                else return i;
            })
            return {
                ...state,
                Cart: {
                    ...state.Cart,
                    CartItem: updateQty
                }
            }
        case "QTY_DEC":
            let updatedQty = state.Cart.CartItem.map((i) => {
                if (i.id === action.payload) {
                    let newQty = i.Qty - 1
                    if (newQty < 1) {
                        newQty = 1
                    }
                    return {
                        ...i,
                        Qty: newQty
                    }
                }
                else return i;
            })
            return {
                ...state,
                Cart: {
                    ...state.Cart,
                    CartItem: updatedQty
                }
            }
        case "REMOVE_FROM_CART":
            let newCartItem = state.Cart.CartItem.filter((i) => i.id !== action.payload)
            return {
                ...state,
                Cart: {
                    ...state.Cart,
                    CartItem: newCartItem
                }
            }
        case "SUB_TOTAL":
            const itemTotal = state.Cart.CartItem.reduce((acc, item) => acc + item.price * item.Qty, 0);
            const gstFee = itemTotal * 0.10;
            const Total = itemTotal + state.Cart.deliveryFee + state.Payment.platformFee + gstFee;
            return {
                ...state,
                Payment: {
                    ...state.Payment,
                    itemTotal,
                    deliveryFee: state.Cart.deliveryFee,
                    gstFee,
                    Total
                }
            }

        case 'SET_CART':
            return {
                ...state,
                Cart: action.payload
            }
        case "ADD_ADDRESS":
            if (action.payload.Default) {
                const updatedAddresses = state.address.map((a) => {
                    return { ...a, Default: false };
                });
                return {
                    ...state,
                    address: [...updatedAddresses, action.payload],
                };
            } else {
                if (state.address.length === 0) {
                    return {
                        ...state,
                        address: [{ ...action.payload, Default: true }],
                    };
                } else {
                    return {
                        ...state,
                        address: [...state.address, { ...action.payload, Default: false }],
                    };
                }
            }
        case "SET_ADS":
            return {
                ...state,
                address: action.payload,
            };
        case "DEL_ADS":
            const updateAddresses = state.address.filter(
                (i) => i.id !== action.payload
            );
            if (updateAddresses.length === 1) {
                updateAddresses[0].Default = true;
            }
            return {
                ...state,
                address: updateAddresses,
            };

        case "SET_DEFAULT":
            const updatedAddresses = state.address.map((a) => {
                if (a.id === action.payload) return { ...a, Default: true };
                else {
                    return { ...a, Default: false };
                }
            });
            return {
                ...state,
                address: updatedAddresses,
            };

        case "ALERT":
            return {
                ...state,
                isAlert: true,
                alertMsg: action.payload.massage,
                alertType: action.payload.type,
            };
        case "ALERT_TIMEOUT":
            return {
                ...state,
                isAlert: false,
                alertMsg: "",
                alertType: "",
            };
        case "SET_TXN_STATUS":
            return {
                ...state,
                statusDial: true,
                statusDialMsg: action.payload,
            };
            case "REMOVE_TXN_STATUS":
                return{
                    ...state,
                    Cart: {
                        ...state.Cart,
                        CartItem: []
                    },
                statusDial: false,
                }
        default:
            return state
    }
}