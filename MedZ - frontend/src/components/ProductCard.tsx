import { FaPlus } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";

type ProductsProps = ({
  
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock:number;
  handler: () => void
})

const server = "lkafaf";

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {


  return (
    <div className="product-card">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>


      <div>
        <button onClick={()=>handler()}>
          <FaPlus />
        </button>

        <button>
          <MdReadMore onClick={()=>handler()} />
        </button>
      </div>
    </div>
  )
};

export default ProductCard