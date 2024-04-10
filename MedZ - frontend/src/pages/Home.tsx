import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import data from "../assets/data.json"

const Home = () => {


  const addToCartHandler= () => {}

  return <div className="home">
    <section></section>

    <h1>Latest Products

    <Link to="search" className="findmore">
      More
      </Link>
      </h1>

      <main>
        <ProductCard 
        productId="asdadada" 
        name="Mackbook" 
        price={12000}
        stock={32}
        photo="https://m.media-amazon.com/images/I/71-D1xCuVwL._AC_SX342_.jpg"
        handler={addToCartHandler}/>

        {data.products.map((i) => (
          <ProductCard
          productId="asaasa"
          name={i.name}
          price={Number(i.price)}
          stock={3}
          photo={i.photo}
          handler={addToCartHandler}

           />
        ))}

      </main>
  </div>
}

export default Home
