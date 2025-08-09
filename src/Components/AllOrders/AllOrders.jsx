import React from "react";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="An order overview page consolidates all order information.It displays details from order capture to fulfillment, payment, shipping, delivery, and service."
        />
        <title>Your Orders</title>
      </Helmet>
      AllOrders
    </>
  );
}
