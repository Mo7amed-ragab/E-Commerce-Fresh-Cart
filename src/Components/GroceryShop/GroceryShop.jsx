import storeGraphics from "../../assets/images/store-graphics.svg";

export default function GroceryShop() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="mb-4 bg-light d-lg-flex justify-content-between align-items-center rounded grocery">
            <div className="p-5">
              <h2 className="mb-2 fw-bold fsGrocery">One Stop Grocery Shop</h2>
              <p className="mb-0 lead text-muted">
                Shopping for your furry friend? Find food,
                <br />
                treats, and more in one easy spot.
              </p>

              <a href="/products" className="btn btn-dark mt-5 btnGrocery">
                Get Discount on Share
              </a>
            </div>
            <div className="p-6 d-lg-block col-md-6 d-none">
              <img
                src={storeGraphics}
                alt="storeGraphics"
                className="img-fluid"
                width="512"
                height="160"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
