import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/*PROCUCT IMAGE*/}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/*PROCUCT INFO*/}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</p>
      </div>
    </div >
  )
}

export default ProductCard;
