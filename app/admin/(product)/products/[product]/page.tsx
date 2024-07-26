import React from "react";

const AdminProduct = () => {
  return (
    <div className="flex flex-col">
      <button>Save</button>
      <input value="Product Name" />
      <input value="Product Image" />
      <input value="Product Price" />
      <input value="Product Description" />
      <input value="Product Category" />
      <input value="Product Quantity" />
      <input value="Product Status" />
      <input value="Product Created" />
      <input value="Product Updated" />
      <input value="Product Deleted" />
      <div>
        <div className="flex gap-5">
          <div>customer</div>
          <div>review</div>
          <div>stars</div>
          <div>time</div>
        </div>
        <div className="flex gap-5">
          <div>customer</div>
          <div>review</div>
          <div>stars</div>
          <div>time</div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
