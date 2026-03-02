import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPastOrders, getPastOrder } from "../../api/past-orders";
import { Modal } from "../shared/modal";
import { currencyFormatter } from "../../utils/currency";

export function PastOrders() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState();
  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  const { isLoading: isLoadingOrder, data: order } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 86400000, // 1 day in milliseconds
    enabled: !!focusedOrder, // only enabled if focusedOrder is truthy
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>LOADING …</h2>
      </div>
    );
  }
  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal order={order}>
          <h2>order #{focusedOrder}</h2>
          {!isLoadingOrder ? (
            <table>
              <thead className="">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{currencyFormatter.format(pizza.price)}</td>
                    <td>{pizza.quantity}</td>
                    {/* <td>{currencyFormatter.format(pizza.total)}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="loading">Loading...</p>
          )}
          <button onClick={() => setFocusedOrder(null)}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
