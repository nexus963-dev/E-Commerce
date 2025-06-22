import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  //Handle adding or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 0) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };
  
  const handleRemoveFromCart = (productId, size, color) =>{
    dispatch(removeFromCart({productId,guestId,userId,size,color}));
  }

  return (
    <div className="space-y-4">
      {cart.products.map((product, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Size: {product.size} | Colour: {product.colour}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={()=> handleAddToCart(product.productId, -1,product.quantity, product.size, product.color )}
              className="border rounded-full px-3 py-1 text-xl font-medium text-gray-600 hover:bg-gray-200 transition duration-150 ease-in-out">
                -
              </button>
              <span className="text-xl font-medium text-gray-800">
                {product.quantity}
              </span>
              <button onClick={()=> handleAddToCart(product.productId, 1,product.quantity, product.size, product.color )}
               className="border rounded-full px-3 py-1 text-xl font-medium text-gray-600 hover:bg-gray-200 transition duration-150 ease-in-out">
                +
              </button>
            </div>
            <div>
              <p>${product.price.toLocaleString()}</p>
              <button onClick={()=> handleRemoveFromCart(product.productId, product.size, product.color)}>
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
