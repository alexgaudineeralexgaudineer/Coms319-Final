
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios"; // For HTTP requests

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";

function App() {
  const [viewer, setViewer] = useState(1);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function changeView(viewNumber) {
    const currentNavItem = "navitem-" + viewer;
    document.getElementById(currentNavItem).classList.remove("active");
    setViewer(viewNumber);
    document.getElementById("navitem-" + viewNumber).classList.add("active");
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const CatView = () => {
    const [food, setFood] = useState([]);
    const [vets, setVets] = useState([]);
    const [toys, setToys] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newReview, setNewReview] = useState({
      productId: "",
      name: "",
      text: "",
      rating: 0,
    });

    // Fetch cat-related products on component mount
    useEffect(() => {
      const fetchFood = async () => {
        try {
          const response = await axios.get("http://localhost:8081/cats/food");
          setFood(response.data);
        } catch (error) {
          console.error("Error fetching food:", error);
        }
      };
      const fetchVets = async () => {
        try {
          const response = await axios.get("http://localhost:8081/cats/vet");
          setVets(response.data);
        } catch (error) {
          console.error("Error fetching vets:", error);
        }
      };
      const fetchToys = async () => {
        try {
          const response = await axios.get("http://localhost:8081/cats/toy");
          setToys(response.data);
        } catch (error) {
          console.error("Error fetching toys:", error);
        }
      };

      fetchFood();
      fetchToys()
      fetchVets();
    }, []);

    // Fetch reviews for the selected product
    const fetchReviews = async (productId) => {
      try {
        const response = await axios.get(
            `http://localhost:8081/${productId}/getReviews`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    // Display list of products and handle review actions
    return (
        <div className="container">
          <h1>Cat Food</h1>
          {food.length > 0 ? (
              food.map((product) => (
                  <div key={product.id}>
                    <h3>{product.title}</h3>
                    <img src={product.image} />
                    <button
                        className="btn btn-info"
                        onClick={() => {
                          setSelectedProduct(product);
                        }}
                    >
                      View Reviews
                    </button>
                    {selectedProduct && selectedProduct.id === product.id && (
                        <div>
                          <h4>Reviews</h4>
                          {selectedProduct.reviews.map((review, idx) => (
                              <div key={idx}>
                                <p>{review.name}: {review.text} (Rating: {review.rating})</p>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => {
                                      // Logic to update a review
                                    }}
                                >
                                  Edit Review
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      // Logic to delete a review
                                    }}
                                >
                                  Delete Review
                                </button>
                              </div>
                          ))}
                          <div>
                            <h4>Add Review</h4>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={newReview.name}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, name: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Your Review"
                                value={newReview.text}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, text: e.target.value })
                                }
                            />
                            <input
                                type="number"
                                placeholder="Rating (1-5)"
                                value={newReview.rating}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, rating: e.target.value })
                                }
                            />
                            <button
                                className="btn btn-success"
                                onClick={async () => {
                                  // Logic to add a review
                                }}
                            >
                              Submit Review
                            </button>
                          </div>
                        </div>
                    )}
                  </div>
              ))
          ) : (
              <p>No products found</p>
          )}
        </div>
    );
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const DogView = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingReview, setEditingReview] = useState(null); // State for editing a review
    const [editReviewData, setEditReviewData] = useState({
      name: "",
      text: "",
      rating: 0,
    });

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8081/dog/product");
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching dog products:", error);
        }
      };
      fetchProducts();
    }, []);

    const handleUpdateReview = async () => {
      try {
        const { productId, name, text, rating } = editReviewData;
        await axios.put(
            `http://127.0.0.1:8081/${productId}/updateReview/${name}`,
            { text, rating }
        );
        // Fetch updated reviews to reflect the changes
        if (selectedProduct) {
          const reviews = await fetchReviews(selectedProduct.id);
          selectedProduct.reviews = reviews;
          setSelectedProduct({ ...selectedProduct });
        }
        // Reset editing state
        setEditingReview(null);
        setEditReviewData({ name: "", text: "", rating: 0 });
      } catch (error) {
        console.error("Error updating review:", error);
      }
    };

    const fetchReviews = async (productId) => {
      try {
        const response = await axios.get(
            `http://127.0.0.1:8081/${productId}/getReviews`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
      }
    };

    return (
        <div className="container">
          <h1>Dog Products</h1>
          {products.length > 0 ? (
              products.map((product) => (
                  <div key={product.id}>
                    <h3>{product.name}</h3>
                    <button
                        className="btn btn-info"
                        onClick={() => {
                          setSelectedProduct(product);
                        }}
                    >
                      View Reviews
                    </button>
                    {selectedProduct && selectedProduct.id === product.id && (
                        <div>
                          <h4>Reviews</h4>
                          {selectedProduct.reviews.map((review, idx) => (
                              <div key={idx}>
                                <p>
                                  {review.name}: {review.text} (Rating: {review.rating})
                                </p>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => {
                                      // Start editing the review
                                      setEditingReview(review);
                                      setEditReviewData({
                                        productId: selectedProduct.id,
                                        name: review.name,
                                        text: review.text,
                                        rating: review.rating,
                                      });
                                    }}
                                >
                                  Edit Review
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={async () => {
                                      // Logic to delete the review
                                      try {
                                        await axios.delete(
                                            `http://127.0.0.1:8081/${selectedProduct.id}/deleteReview/${review.name}`
                                        );
                                        // Fetch updated reviews after deletion
                                        const updatedReviews = await fetchReviews(
                                            selectedProduct.id
                                        );
                                        selectedProduct.reviews = updatedReviews;
                                        setSelectedProduct({ ...selectedProduct });
                                      } catch (error) {
                                        console.error("Error deleting review:", error);
                                      }
                                    }}
                                >
                                  Delete Review
                                </button>
                              </div>
                          ))}
                        </div>
                    )}
                  </div>
              ))
          ) : (
              <p>No products found</p>
          )}

          {editingReview && (
              <div>
                <h4>Edit Review</h4>
                <input
                    type="text"
                    value={editReviewData.text}
                    onChange={(e) =>
                        setEditReviewData({ ...editReviewData, text: e.target.value })
                    }
                />
                <input
                    type="number"
                    value={editReviewData.rating}
                    onChange={(e) =>
                        setEditReviewData({ ...editReviewData, rating: e.target.value })
                    }
                />
                <button className="btn btn-success" onClick={handleUpdateReview}>
                  Save Changes
                </button>
              </div>
          )}
        </div>
    );
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
          </ul>
        </header>
    );
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
      <div>
        {createHeader()}
        <div className="container">
          {viewer === 1 && <StudentView />}
          {viewer === 2 && <CatView />}
          {viewer === 3 && <DogView />}
          {createFooter()}
        </div>
      </div>
  );
}

export default App;
