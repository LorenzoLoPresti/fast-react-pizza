import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // fallback error
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, // funzione loader
        errorElement: <Error />, // mostra Error in pagina al post di Menu
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// ALTRE POSSIBILI FEATURE
// 1) On order, you could let the user define a PIN number for the order. Then, in the page that displays the final order, the user could be allowed to actually edit the order during the first 5 minutes after submitting it, but ONLY if they input the correct PIN number (otherwise, users could edit orders from other people). This would require a PIN to be sent to the API request on order.

// 2) You could add the ability to add or remove ingredients for pizzas in the cart. Again, this would require a change in the API.

// 3) You could persist the cart data using "Redux persist"
