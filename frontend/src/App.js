import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route, Link, redirectDocument } from 'react-router-dom';
import axios from 'axios'; // For HTTP requests
import "./App.css";
import Navbar from "./navbar";
//import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";




function App() {
  const [viewer, setViewer] = useState(1);
  const [checkoutData, setCheckoutData] = useState({});
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const StarRating = ({ rating }) => {
    const fullStar = '★'; // Character for a filled star
    const emptyStar = '☆'; // Character for an empty star

    // Create an array of star symbols based on the given rating
    const stars = Array.from({ length: 5 }, (_, index) =>
        index < rating ? fullStar : emptyStar
    );

    // Join the array of stars into a single string for display
    return <span>{stars.join(' ')}</span>;
  };

  const addToCart = (el) => {
    console.log(el)
    let hardCopy = [...cart];
    let elFound = false

    hardCopy.map((cartEl) => {
      if (cartEl.id == el.id) {
        cartEl.quantity += 1;
        setCart(hardCopy)
        elFound = true
      }
    })

    if (!elFound) {
      el.quantity = 1;
      setCart([...cart, el]);
    }
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];

    hardCopy.map((cartEl) => {
      if (cartEl.id == el.id) {
        cartEl.quantity -= 1;
      }
    })

    hardCopy = hardCopy.filter((cartItem) => cartItem.quantity !== 0);
    setCart(hardCopy);
  };

  function howMany(el) {
    let total = 0;
    cart.map((cartEl) => {
      if (cartEl.id == el.id) {
        total = cartEl.quantity
      }
    })

    return total
  }

  function totalLength() {
    let total = 0;
    cart.map((cartEl) => {
      total += cartEl.quantity
    })
    return total
  }

  const cartItems = cart.map((el) => (
      <>
        <div className='checkout-item' key={el.id}>
          <div>
            <img class="img-fluid" src={el.image} width={250} />
          </div>

          <div className='checkout-info'>

            Product: <b>{el.title}</b>
            <br />
            Price <b>${el.price}</b>
            <br />
            <br />
            <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>
            {"  " + howMany(el) + " "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>


          </div>
        </div>
      </>
  ));

  function getTotal() {
    let total = 0
    cart.map((el) => {
      total += (el.price * el.quantity)
    })
    total = (Math.round(total * 100)) / 100
    return total
  }

  const ProductRow = ({ title, products, onProductClick }) => (
      <div>
        <h2>

          {title}

        </h2>
        <div className="row">
          {products.map((product) => (
              <div key={product.id} className="col-md-4">
                <div className="card mb-3">
                  <div
                      onClick={() => onProductClick(product)}
                      style={{ width: '100%', height: '200px', cursor: 'pointer' }}
                  >
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }} // Entire image visible
                    />
                  </div>
                  <div className="card-body">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    {/* Cart management */}
                    <button type="button" onClick={() => removeFromCart(product)}> - </button>
                    {"  " + howMany(product) + " "}
                    <button type="button" onClick={() => addToCart(product)}> + </button>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );

  const changeView = (viewNumber, product = null) => {
    setViewer(viewNumber);
    if (product) {
      setSelectedProduct(product);
    }

  };

  function StudentView() {
    const teacherImageAlpaca =
        "https://www.cs.iastate.edu/files/styles/people_thumb/public/people/profilepictures/1517665937421.jpg?itok=15jJS_fr";

    return (
        <div className="student-view p-5" style={{ backgroundColor: "#2F4F4F" }}>
          <div className="container-fluid py-5 bg-dark text-white rounded shadow-lg">
            <h1 className="display-4 text-center text-info">SE/COMS 319</h1>
            <p className="fs-4 text-center text-light">
              SE/COMS 319 teaches website programming and creation at Iowa State University.
            </p>
          </div>

          <div className="container-fluid p-4 rounded-lg" style={{ backgroundColor: "#778899" }}>
            <h2 className="text-center text-warning">Professor</h2>
            <div className="d-flex justify-content-center">
              <div className="card bg-light text-dark p-3 rounded-lg shadow-lg" style={{ border: "2px solid #FFD700" }}>
                <h3 className="text-center">Professor Aldaco</h3>
                <img
                    className="rounded-circle"
                    src={teacherImageAlpaca}
                    alt="Professor Alpaca"
                    style={{ width: "120px", border: "3px solid #FFD700" }}
                />
              </div>
            </div>
          </div>

          <div className="container-fluid p-4 rounded-lg mt-4 shadow-lg" style={{ backgroundColor: "#708090" }}>
            <h2 className="text-center text-light">Students</h2>
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center">
                <div className="card bg-light text-dark p-3 rounded-lg shadow-lg" style={{ border: "2px solid #00FA9A" }}>
                  <h3 className="text-center">Niraj Amin</h3>
                  <p className="text-center fs-6">
                    An extremely skilled computer scientist specializing in big data.
                  </p>
                  <p className="text-center fs-6">
                    Email: namin@iastate.edu
                    <br />
                    Junior, loves cats and video games.
                  </p>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <div className="card bg-light text-dark p-3 rounded-lg shadow-lg" style={{ border: "2px solid #00FA9A" }}>
                  <h3 className="text-center">Alex Gaudineer</h3>
                  <p className="text-center fs-6">
                    A software engineer who aspires to be a Project Manager post-grad.
                  </p>
                  <p className="text-center fs-6">
                    Email: alexgaud@iastate.edu
                    <br />
                    Junior, loves everything about engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid bg-primary text-white p-4 rounded-lg mt-4 shadow-lg">
            <h2 className="text-center">Date: 4/27/24</h2>
            <p className="fs-4 text-center">
              This project involves creating an API for a MERN stack website. It includes MongoDB, Express, React, and NodeJS.
            </p>
          </div>
        </div>
    );
  }

  const Review = ({ productId, review, refreshReviews }) => {
    const [reviewText, setReviewText] = useState(review.text);

    const handleUpdateReview = async () => {
      try {
        await axios.put(
            `http://nirajamin.com:8081/product/${productId}/updateReview/${review.name}`,
            { text: reviewText }
        );
        refreshReviews(); // Refresh after update
      } catch (error) {
        console.error("Error updating review:", error);
      }
    };

    const handleDeleteReview = async () => {
      try {
        await axios.delete(
            `http://nirajamin.com:8081/product/${productId}/deleteReview/${review.name}`
        );
        refreshReviews(); // Refresh after delete
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    };

    return (
        <div>
          <strong>{review.name}</strong>: {review.text}
          <br />
          <input
              type="text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
          />
          <button onClick={handleUpdateReview}>Update Review</button>
          <button onClick={handleDeleteReview}>Delete Review</button>
        </div>
    );
  };

  const ProductDetailView = ({ product, changeView }) => {
    const [reviews, setReviews] = useState([]);
    const [reviewName, setReviewName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(1);

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://nirajamin.com:8081/product/${product.id}/getReviews`);
        setReviews(response.data); // Set reviews in state
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    // Determine the product category, logging for debugging
    const productCategory = product.animal ? product.animal.toLowerCase() : 'unknown';

    console.log("Product category:", productCategory); // Debugging information


    const returnButtonText = productCategory === 'cat' ? 'Return to Cat Products' : 'Return to Dog Products';
    const returnView = productCategory === 'cat' ? 2 : 3;


    useEffect(() => {
      fetchReviews(); // Fetch reviews on component mount
    }, [product]);

    const handleAddReview = async () => {
      try {
        const newReview = {
          productid: product.id,
          name: reviewName,
          text: reviewText,
          rating: reviewRating,
        };

        await axios.post(
            `http://nirajamin.com:8081/product/${product.id}/addReview`,
            newReview
        );

        fetchReviews(); // Fetch updated reviews to reflect changes
      } catch (error) {
        console.error("Error adding review:", error);
      }
    };

    const handleUpdateReview = async (reviewName, newText, newRating) => {
      try {
        const updatedReview =
            {
              text: newText,
              rating: newRating
            }
        console.log(updatedReview)
        await axios.put(
            `http://nirajamin.com:8081/product/${product.id}/updateReview/${reviewName}`, updatedReview

        );

        fetchReviews(); // Fetch updated reviews to reflect changes
      } catch (error) {
        console.error("Error updating review:", error);
      }
    };

    const handleDeleteReview = async (reviewName) => {
      try {
        await axios.delete(
            `http://nirajamin.com:8081/product/${product.id}/deleteReview/${reviewName}`
        );
        const remainingReviews = reviews.filter((review) => review.name !== reviewName);
        setReviews(remainingReviews); // Remove deleted review from state
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    };


    return (
        <div>
          <button onClick={() => changeView(returnView)}>{returnButtonText}</button>
          <h1>{product.name}</h1>
          <div style={{width: '100%', height: '400px'}}>
            <img
                src={product.image}
                alt={product.name}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }} // Entire image visible
            />
          </div>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>

          <br/>
          <h2>Reviews</h2>
          {reviews.map((review) => (
              <div key={review.name}>
                <br/>
                <strong>{review.name}</strong>: {review.text} - <StarRating rating={review.rating}/>
                <br/>
                <button
                    onClick={() => {
                      const newText = prompt("Update review text", review.text);
                      const newRating = parseInt(prompt("Update rating (1-5)", review.rating));
                      if (newText && newRating >= 1 && newRating <= 5) {
                        handleUpdateReview(review.name, newText, newRating);
                      }
                    }}
                >
                  Edit Review
                </button>
                {" "}
                <button onClick={() => handleDeleteReview(review.name)}>Delete Review</button>
              </div>
          ))}
          <br/>
          <br/>
          <div>
            <h3>Add a Review</h3>
            <input
                type="text"
                placeholder="Your name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
            />
            <br/>
            <input
                type="text"
                placeholder="Your review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            />{" "}
            <input
                type="number"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
            /> ★
            <br/>
            <button onClick={handleAddReview}>Add Review</button>
          </div>
        </div>
    );
  };

  const CatView = ({onProductClick}) => {
    const [products, setProducts] = useState({food: [], toy: [], vet: []});

    useEffect(() => {
      const fetchProductsByType = async (type) => {
        const response = await axios.get(`http://nirajamin.com:8081/listProducts/cat/${type}`);
        return response.data;
      };

      const fetchProducts = async () => {
        const food = await fetchProductsByType('food');
        const toy = await fetchProductsByType('toy');
        const vet = await fetchProductsByType('vet');
        setProducts({ food, toy, vet });
      };

      fetchProducts();
    }, []);

    return (
        <div>
          <h1>Cat Products</h1>
          <ProductRow title="Food" products={products.food} onProductClick={onProductClick} />
          <ProductRow title="Toys" products={products.toy} onProductClick={onProductClick} />
          <ProductRow title="Vets" products={products.vet} onProductClick={onProductClick} />
        </div>
    );
  };

  const DogView = ({ onProductClick }) => {
    // Initialize products with a default structure to avoid undefined errors
    const [products, setProducts] = useState({
      food: [],
      toy: [],
      vet: []
    });

    useEffect(() => {
      const fetchProductsByType = async (type) => {
        try {
          const response = await axios.get(`http://nirajamin.com:8081/listProducts/dog/${type}`);
          return response.data; // Ensure a valid return value, even if empty
        } catch (error) {
          console.error(`Error fetching dog ${type}:`, error);
          return []; // Return an empty array to avoid undefined errors
        }
      };

      const fetchProducts = async () => {
        const food = await fetchProductsByType('food');
        const toy = await fetchProductsByType('toy');
        const vet = await fetchProductsByType('vet');
        setProducts({ food, toy, vet }); // Assign the fetched values
      };

      fetchProducts(); // Ensure this only runs once (similar to componentDidMount)
    }, []); // Empty dependency array to avoid re-fetching unnecessarily

    return (
        <div>
          <h1>Dog Products</h1>
          {Object.values(products).some((arr) => arr.length > 0) ? (
              <>
                <ProductRow title="Food" products={products.food} onProductClick={onProductClick} />
                <ProductRow title="Toys" products={products.toy} onProductClick={onProductClick} />
                <ProductRow title="Vets" products={products.vet} onProductClick={onProductClick} />
              </>
          ) : (
              <div>Loading products...</div> // Show a loading message until data is fetched
          )}
        </div>
    );
  };

  const CheckoutView = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
      // update hooks
      setCart([]);
      setCheckoutData(data);
      changeView(5)
      data = {}
    }

    return (
        <div className='checkout-main'>
          <div className='checkout-left'>
            <br />
            <br />
            {cartItems}
          </div>
          <div className='checkout-mid'>
            <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">

              <div className="form-group">
                <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control" />
                {errors.fullName && <p className="text-danger">Full Name is required.</p>}
              </div>
              <div className="form-group">
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control" />
                {errors.email && <p className="text-danger">Email is required.</p>}
              </div>
              <div className="form-group">
                <input {...register("creditCard", { required: true })} placeholder="Credit Card" className="form-control" />
                {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
              </div>
              <div className="form-group">
                <input {...register("address", { required: true })} placeholder="Address" className="form-control" />
                {errors.address && <p className="text-danger">Address is required.</p>}
              </div>
              <div className="form-group">
                <input {...register("address2")} placeholder="Address 2" />
                <input {...register("city", { required: true })} placeholder="City" className="form-control" />
                {errors.city && <p className="text-danger">City is required.</p>}
              </div>
              <div className="form-group">
                <input {...register("state", { required: true })} placeholder="State" className="form-control" />
                {errors.state && <p className="text-danger">State is required.</p>}
              </div>
              <div className="form-group">
                <input {...register("zip", { required: true })} placeholder="Zip" className="form-control" />
                {errors.zip && <p className="text-danger">Zip is required.</p>}
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className='checkout-right'>
            <br />
            <br />
            Subtotal: <b>${getTotal()}</b>
            <br />
            Tax and Shipping: <b>${Math.round(getTotal() * 7) / 100}</b>
            <br />
            Total: <b>${Math.round(getTotal() * 100 + (getTotal() * 7)) / 100}</b>

          </div>
        </div>
    );
  }

  const ConfirmationView = () => {

    const updateHooks = () => {
      changeView(1);
      setCheckoutData({});
    };

    return (<div>
      <h1>Payment summary:</h1>
      <h3>{checkoutData.fullName}</h3>
      <p>{checkoutData.email}</p>
      <p>{checkoutData.creditCard}</p>
      <p>{checkoutData.address}</p>
      <p>{checkoutData.city},{checkoutData.state} {checkoutData.zip} </p>
      <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
    </div>);
  }

  function createHeader() {
    return (
        <header className="d-flex justify-content-center py-3">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <p
                  className="nav-link active"
                  id="navitem-1"
                  onClick={() => changeView(1)}
              >
                Students
              </p>
            </li>
            <li className="nav-item">
              <p
                  className="nav-link"
                  id="navitem-2"
                  onClick={() => changeView(2)}
              >
                Cats
              </p>
            </li>
            <li className="nav-item">
              <p
                  className="nav-link"
                  id="navitem-3"
                  onClick={() => changeView(3)}
              >
                Dogs
              </p>
            </li>
            <li className="nav-item">
              <p
                  className="nav-link"
                  id="navitem-4"
                  onClick={() => changeView(4)}
              >
                Checkout ({totalLength()})
              </p>
            </li>
          </ul>
        </header>
    );
  }

  function createFooter() {
    return (
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p class="col-md-4 mb-0 text-body-secondary">
            Com S 319
            <br></br>Niraj Amin & Alex Gaudineer
          </p>
        </footer>
    );
  }

  return (
      <div className="page-background"> {/* Apply 'page-background' */}
        <Navbar changeView={changeView} totalLength={totalLength} />
        <div className="container">
          {/* Render different views based on the `viewer` state */}
          {viewer === 1 && <StudentView />}
          {viewer === 2 && <CatView onProductClick={(product) => changeView(6, product)} />}
          {viewer === 3 && <DogView onProductClick={(product) => changeView(6, product)} />}
          {viewer === 4 && <CheckoutView />}
          {viewer === 5 && <ConfirmationView />}
          {viewer === 6 && <ProductDetailView product={selectedProduct} changeView={changeView} />}
        </div>
        {createFooter()}
      </div>
  );
}

export default App;