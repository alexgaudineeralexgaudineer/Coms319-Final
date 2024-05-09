import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'; // For HTTP requests
import "./App.css";
//import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";




function App() {
  const [viewer, setViewer] = useState(1);
  const [checkoutData, setCheckoutData] = useState({});
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={150} />
      {el.title}
      ${el.price}
    </div>
  ));

  function getTotal() {
    let total = 0
    cart.map((el) => {
      total += el.price
    })
    return total
  }

  const ProductRow = ({ title, products, onProductClick }) => (

      <div>
        <h2>{title}</h2>
        <div className="row">
          {products.map((product) => (
              <div key={product.id} className="col-md-4">
                <div className="card mb-3" onClick={() => onProductClick(product)}>
                  <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
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
          `http://nirajamin.com:8081/${productId}/updateReview/${review.name}`,
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
          `http://nirajamin.com:8081/${productId}/deleteReview/${review.name}`
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

  const ReviewManager = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReviewName, setNewReviewName] = useState('');
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(1);

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://nirajamin.com:8081/${productId}/getReviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    useEffect(() => {
      fetchReviews();
    }, [productId]);

    const handleAddReview = async () => {
      try {
        await axios.post(
          `http://localhost:8081/${productId}/addReview`,
          {
            name: newReviewName,
            text: newReviewText,
            rating: newReviewRating,
          }
        );
        fetchReviews(); // Refresh after adding
      } catch (error) {
        console.error("Error adding review:", error);
      }
    };

    return (
      <div>
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <Review key={review.name} productId={productId} review={review} refreshReviews={fetchReviews} />
        ))}
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={newReviewName}
            onChange={(e) => setNewReviewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your review"
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rating"
            value={newReviewRating}
            onChange={(e) => setNewReviewRating(Number(e.target.value))}
          />
          <button onClick={handleAddReview}>Add Review</button>
        </div>
      </div>
    );
  };

  const ProductDetailView = ({ product, changeView }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      // Fetch reviews for the given product
      const fetchReviews = async () => {
        if (!product || !product.id) return;
        try {
          const response = await axios.get(`http://nirajamin.com:8081/product/${product.id}/getReviews`);
          setReviews(response.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };

      fetchReviews();
    }, [product]);

    const handleAddReview = async (reviewData) => {
      try {
        await axios.post(
            `http://nirajamin.com:8081/product/${product.id}/addReview`,
            reviewData
        );
        setReviews([...reviews, reviewData]); // Add to the current state
      } catch (error) {
        console.error("Error adding review:", error);
      }
    };

    const handleUpdateReview = async (reviewName, newText) => {
      try {
        await axios.put(
            `http://nirajamin.com:8081/product/${product.id}/updateReview/${reviewName}`,
            { text: newText }
        );
        const updatedReviews = reviews.map((review) =>
            review.name === reviewName ? { ...review, text: newText } : review
        );
        setReviews(updatedReviews); // Update state with new review text
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

    const ReviewForm = ({ onSubmit }) => {
      const [reviewName, setReviewName] = useState('');
      const [reviewText, setReviewText] = useState('');
      const [reviewRating, setReviewRating] = useState(1);

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
          name: reviewName,
          text: reviewText,
          rating: reviewRating,
        });
        // Reset the form
        setReviewName('');
        setReviewText('');
        setReviewRating(1);
      };

      return (
          <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Your name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Your review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            />
            <input
                type="number"
                placeholder="Rating"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
            />
            <button type="submit">Add Review</button>
          </form>
      );
    };

    return (
        <div>
          <button onClick={() => changeView(2)}>Back to Cat Products</button>
          <h1>{product.name}</h1>
          <img src={product.image} alt={product.name} style={{ height: '400px', objectFit: 'cover' }} />
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>

          <h2>Reviews</h2>
          {reviews.map((review) => (
              <div key={review.name}>
                <strong>{review.name}</strong>: {review.text}
                <button onClick={() => handleUpdateReview(review.name, prompt("Update review text", review.text))}>
                  Edit Review
                </button>
                <button onClick={() => handleDeleteReview(review.name)}>Delete Review</button>
              </div>
          ))}

          <ReviewForm onSubmit={handleAddReview} />
        </div>
    );
  };


  const CatView = ({ onProductClick }) => {
    const [products, setProducts] = useState({ food: [], toy: [], vet: [] });

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
          Shopping cart
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
          Subtotal: {getTotal()}
          <br />
          Tax and Shipping: {getTotal() * 0.07}
          <br />
          Total: {getTotal() + (getTotal() * 0.07)}

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
              Checkout ({cart.length})
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
    <div>
      {createHeader()}
      <div className="container">
        {viewer === 1 && <StudentView />}
        {viewer === 2 && <CatView onProductClick={(product) => changeView(6, product)} />}  {/* Correctly passing onProductClick */}
        {viewer === 3 && <DogView onProductClick={(product) => changeView(6, product)} />}  {/* Same here */}
        {viewer === 4 && <CheckoutView />}
        {viewer === 5 && <ConfirmationView />}
        {viewer === 6 && <ProductDetailView product={selectedProduct} changeView={changeView} />}
        {createFooter()}
      </div>
    </div>
  );
}

export default App;
