import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Flip from 'react-reveal/Flip';
import Review from "../components/Review";
import Button from "../components/Button";
import ProductOrder from "../components/ProductOrder";
import API from "../utilities/api";
import "./Assets/style.css";

class ProductPage extends Component {
    state = {
        product: [],
        backgroundImage: ``,
        backgroundPosition: '0% 0%',
        borderRadius: "4px",
        cart: [],
        quantity: 0,
    }
    componentDidMount() {
        this.getProduct(window.location.pathname.slice(14));
        this.getCart();
    }
    getProduct = (id) => {
        API.getProductById(id)
            .then(res =>
                this.setState({
                    product: res.data.results[0],
                    backgroundImage: `url(${res.data.results[0].image_link})`
                })
            )
            .catch(err => console.log(err));
    }
    getCart = () => {
        if (window.sessionStorage.logged_in) {
            API.getCartByUser(window.sessionStorage.id)
                .then(res =>
                    this.setState({ cart: res.data.results })
                )
                .catch(err => console.log(err));
        }
    }
    addToCart = (id) => (event) => {
        event.preventDefault();
        const cart = this.state.cart;
        if (window.sessionStorage.logged_in) {
            if (cart.length > 0) {
                const checkCart = cart.findIndex(item => item.product_id === id);
                if (checkCart >= 0) {
                    alert("Item already added to cart");
                } else {
                    if (this.state.product.hardware && this.state.product.quantity > 0) {
                        if (this.state.quantity > 0) {
                            API.addItemToCart(this.state.cart[0].cart_id, id, this.state.quantity)
                            .then(res =>
                                this.setState({ cart: res.data.results })
                            )
                            .catch(err => console.log(err));
                        } else {
                            alert("Please select a quantity");
                        }
                    } else {
                        API.addItemToCart(this.state.cart[0].cart_id, id, 1)
                            .then(res =>
                                this.setState({ cart: res.data.results })
                            )
                            .catch(err => console.log(err));
                    }
                }
            } else {
                API.createCart(window.sessionStorage.id, id, 1)
                    .then(res =>
                        this.setState({ cart: res.data.results })
                    )
                    .catch(err => console.log(err));
            }
        } else {
            alert("Please log in to add items to your cart");
        }
    }
    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    };
    handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        this.setState({ backgroundPosition: `${x}% ${y}%` });
    }
    render() {
        return (
            <div className="page-container">
                {/* <Container fluid> */}
                    <Row>
                        <Col size="md-12">
                            <div className="product-header t-top-pad white">
                                <p>
                                    {this.state.product.product_name}
                                </p>
                            </div>
                        </Col>
                        <Col size="md-12">
                            <Row>
                                <Col size="md-1" />
                                <Col size="md-6">
                                    <figure
                                        className="product-image-zoom"
                                        onMouseMove={this.handleMouseMove}
                                        style={this.state}
                                    >
                                        <img
                                            src={this.state.product.image_link}
                                            alt={this.state.product.product_name}
                                            className="product-image-page"

                                        />
                                    </figure>
                                </Col>
                                <Col size="md-4">
                                    <Row>
                                        <ProductOrder
                                            price={this.state.product.price}
                                            hardware={this.state.product.hardware}
                                            quantity={this.state.product.quantity}
                                            software={this.state.product.software}
                                            id={window.location.pathname.slice(14)}
                                            handleInputChange={this.handleInputChange}
                                            button={<Button 
                                                action={this.addToCart(window.location.pathname.slice(14))}
                                                buttonClass="cart-add-button white"
                                                text="Add to cart"
                                            />}
                                        />
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="md-2" />
                        <Col size="md-8">
                            <div className="product-description-page white t-top-pad">
                                <p>
                                    {this.state.product.product_description}
                                </p>
                            </div>
                        </Col>
                        <Col size="md-2" />
                    </Row>
                    <Row>
                        <Col size="md-12">
                            <div className="review-section">
                                <Row>
                                    <Col size="md-1" />
                                    <Col size="md-4">
                                        <Flip top>
                                            <Review
                                                reviewerImage="https://images.unsplash.com/photo-1520715246086-96c95638169d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=932&q=80"
                                                reviewerName="Bruce Wayne"
                                                review="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
                                                bio="https://en.wikipedia.org/wiki/Batman"
                                            />
                                        </Flip>
                                    </Col>
                                    <Col size="md-2" />
                                    <Col size="md-4">
                                        <Flip top>
                                            <Review
                                                reviewerImage="https://images.unsplash.com/photo-1529847556963-9653a9366021?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1523&q=80"
                                                reviewerName="Tony Stark"
                                                review="All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
                                                bio="https://en.wikipedia.org/wiki/Tony_Stark_(Marvel_Cinematic_Universe)"
                                            />
                                        </Flip>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                {/* </Container> */}
                </div>
        )
    }
}

export default ProductPage;