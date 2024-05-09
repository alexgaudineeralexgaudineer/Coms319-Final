

import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom';
import axios from 'axios'; // For HTTP requests
import "./App.css";
//import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function App() {
    const [viewer, setViewer] = useState(1);


    const ProductDetailView = () => {
        const { productId } = useParams(); // Get product ID from the URL
        const [product, setProduct] = useState(null);


        useEffect(() => {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://nirajamin.com:8081/product/${productId}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error(`Error fetching product ${productId}:`, error);
                }
            };


            fetchProduct();
        }, [productId]);


        if (!product) {
            return <div>Loading product details...</div>;
        }


        return (
            <div className="product-detail">
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
            </div>
        );
    };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const ProductRow = ({ title, products, handleProductSelect }) => {
        if (!Array.isArray(products)) {
            products = [];
        }
        return (
            <div>
                <h2>{title}</h2>
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4">
                            <div className="card mb-3">
                                <img
                                    src={product.image} // Product image
                                    alt={product.name} // Alt text
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }} // Image style
                                />
                                <div className="card-body">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p><strong>Price:</strong> ${product.price}</p>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => handleProductSelect(product)}
                                    >
                                        View Reviews
                                    </button>
                                </div>
                            </div>
                            {product.showReviews && <ReviewManager productId={product.id} />}
                        </div>
                    ))}
                </div>
            </div>
        );
    };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function changeView(viewNumber) {
        const currentNavItem = "navitem-" + viewer;
        document.getElementById(currentNavItem).classList.remove("active");
        setViewer(viewNumber);
        document.getElementById("navitem-" + viewNumber).classList.add("active");
    }


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
    const AnimalInfo = ({ animal, infotype }) => {
        const [info, setInfo] = useState('');


        useEffect(() => {
            const fetchInfo = async () => {
                try {
                    const response = await axios.get(`http://nirajamin.com:8081/${animal}/${infotype}`);
                    const data = response.data.length ? response.data[0].description : 'No information available';
                    setInfo(data);
                } catch (error) {
                    console.error(`Error fetching ${animal} ${infotype}:`, error);
                }
            };


            fetchInfo();
        }, [animal, infotype]);


        return (
            <div>
                <h2>{animal} {infotype}</h2>
                <p>{info}</p>
            </div>
        );
    };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const CatView = () => {
        const [products, setProducts] = useState({ food: [], toy: [], vet: [] });


        useEffect(() => {
            const fetchProductsByType = async (type) => {
                try {
                    const response = await axios.get(`http://nirajamin.com:8081/listProducts/cat/${type}`);
                    return response.data;
                } catch (error) {
                    console.error(`Error fetching cat ${type}:`, error);
                }
            };


            const fetchProducts = async () => {
                const food = await fetchProductsByType('food');
                const toy = await fetchProductsByType('toy');
                const vet = await fetchProductsByType('vet');
                setProducts({ food, toy, vet });
            };


            fetchProducts();
        }, []);


        const handleProductSelect = (product) => {
            setProducts((prevProducts) => {
                const newProducts = { ...prevProducts };
                const category = Object.keys(newProducts).find((cat) =>
                    newProducts[cat].some((p) => p.id === product.id)
                );
                newProducts[category] = newProducts[category].map((p) =>
                    p.id === product.id ? { ...p, showReviews: !p.showReviews } : p
                );
                return newProducts;
            });
        };


        return (
            <div>
                <h1>Cat Products</h1>
                <ProductRow title="Food" products={products.food} handleProductSelect={handleProductSelect} />
                <ProductRow title="Toys" products={products.toy} handleProductSelect={handleProductSelect} />
                <ProductRow title="Vets" products={products.vet} handleProductSelect={handleProductSelect} />
            </div>
        );
    };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const DogView = () => {
        const [products, setProducts] = useState({ food: [], toy: [], vet: [] });


        useEffect(() => {
            const fetchProductsByType = async (type) => {
                try {
                    const response = await axios.get(`http://nirajamin.com:8081/listProducts/dog/${type}`);
                    return response.data;
                } catch (error) {
                    console.error(`Error fetching dog ${type}:`, error);
                }
            };


            const fetchProducts = async () => {
                const food = await fetchProductsByType('food');
                const toy = await fetchProductsByType('toy');
                const vet = await fetchProductsByType('vet');
                setProducts({ food, toy, vet });
            };


            fetchProducts();
        }, []);


        const handleProductSelect = (product) => {
            setProducts((prevProducts) => {
                const newProducts = { ...prevProducts };
                const category = Object.keys(newProducts).find((cat) =>
                    newProducts[cat].some((p) => p.id === product.id)
                );
                newProducts[category] = newProducts[category].map((p) =>
                    p.id === product.id ? { ...p, showReviews: !p.showReviews } : p
                );
                return newProducts;
            });
        };


        return (
            <div>
                <h1>Dog Products</h1>
                <ProductRow title="Food" products={products.food} handleProductSelect={handleProductSelect} />
                <ProductRow title="Toys" products={products.toy} handleProductSelect={handleProductSelect} />
                <ProductRow title="Vets" products={products.vet} handleProductSelect={handleProductSelect} />
            </div>
        );
    };


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
                {viewer == 4 }
                {createFooter()}
            </div>
        </div>
    );
}


export default App;

