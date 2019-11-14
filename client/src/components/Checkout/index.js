import React, { useEffect, useState } from "react";
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import states from '../../pages/Assets/Data/states.json';
import Slide from 'react-reveal/Slide';
import { Col, Row } from "../Grid";
import API from "../../utilities/api";
import "./style.css";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing(2)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
}));

function getSteps() {
    return ['Review Items', 'Shipping Information', 'Payment Information', 'Review Order'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Review Items';
        case 1:
            return 'Shipping Information';
        case 2:
            return 'Payment Information';
        case 3:
            return 'Review Order'
        default:
            return 'Unknown step';
    }
}

function Checkout(props) {
    const theme = createMuiTheme({
        palette: {
            primary: { main: '#3E0768' },
            secondary: { main: "#000000" },
        },
    });
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState([]);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [second, setSecond] = useState("");
    const [city, setCity] = useState("");
    const [userState, setUserState] = useState("");
    const [tax, setTax] = useState(0);
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [cardNumber, setCardNumber] = useState();
    const [cardBrand, setCardBrand] = useState();
    const [cardName, setCardName] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cardCode, setCardCode] = useState();

    function goToSupport() {
        window.location.href = "/contact"
    }
    function getProduct(quantity, id) {
        API.getProductById(id)
            .then(res =>
                getTotal(res.data.results[0], quantity)
            )
            .catch(err => console.log(err));
    }
    function getUserByID() {
        API.getUser(window.sessionStorage.id)
            .then(res =>
                setUpUser(res.data.results[0])
            )
            .catch(err => console.log(err));
    }
    function setUpUser(data) {
        setUser(data);
        if (data.first_name) {
            setFirst(data.first_name);
        }
        if (data.last_name) {
            setLast(data.last_name)
        }
        if (data.email) {
            setEmail(data.email);
        }
        if (data.street_address) {
            setStreet(data.street_address);
        }
        if (data.secondary_address) {
            setSecond(data.secondary_address);
        }
        if (data.city) {
            setCity(data.city);
        }
        if (data.user_state) {
            setUserState(data.user_state);
        }
        if (data.zip_code) {
            setZip(data.zip_code);
        }
        if (data.phone) {
            setPhone(data.phone);
        }
    }
    function getTotal(item, amount) {
        setProduct(product => [...product, item]);
        setQuantity(quantity => [...quantity, amount]);
        const cost = item.price * amount;
        setTotal(total => total + cost);
    }
    useEffect(() => {
        props.lineItems.forEach(ele => {
            getProduct(ele.quantity, ele.product_id)
        });
        getUserByID();
    }, [props.lineItems]);
    useEffect(() => {
        if (userState) {
            const stateTax = states.find(({ name }) => name === userState);
            setTax(stateTax.tax);
        }
    }, [userState])

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [rightSlide, setRightSlide] = useState(true);
    const [leftSlide, setLeftSlide] = useState(false);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setRightSlide(true);
        setLeftSlide(false);
        window.scrollTo({ top: 0 });
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        setRightSlide(false);
        setLeftSlide(true);
        window.scrollTo({ top: 0 });
    };

    const goToProfile = () => {
        window.location.href = "/user/profile";
    };

    return (
        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </MuiThemeProvider>
            <div>
                {activeStep === steps.length ? (
                    <div className="cart-area">
                        <Typography className={classes.instructions}>
                            Your Order Is Complete
                        </Typography>
                        <Row>
                            <Col size="md-3" />
                            <Col size="md-2">
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        onClick={goToProfile}
                                        variant="contained"
                                        className={classes.button}
                                        color="primary"
                                    >
                                        Go To Profile
                                </Button>
                                </MuiThemeProvider>
                            </Col>
                            <Col size="md-2" />
                            <Col size="md-2">
                                <MuiThemeProvider theme={theme}>
                                    <Button
                                        onClick={goToSupport}
                                        variant="contained"
                                        className={classes.button}
                                        color="primary"
                                    >
                                        Contact Us
                                </Button>
                                </MuiThemeProvider>
                            </Col>
                            <Col size="md-3" />
                        </Row>
                    </div>
                ) : activeStep === 0 ? (
                    <div className="cart-area">
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>
                        {product.map((item, index) => (
                            <Slide left={leftSlide} right={rightSlide} key={index}>
                                <div className="cart-item">
                                    <Row>
                                        <Col size="md-2">
                                            <img src={item.image_link} alt={item.product_name} className="cart-item-img" />
                                        </Col>
                                        <Col size="md-2">
                                            <div className="cart-item-name">
                                                <span>
                                                    {item.product_name}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col size="md-2" />
                                        <Col size="md-2">
                                            <div className="cart-item-price">
                                                <span>
                                                    ${item.price}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col size="md-2">
                                            <div className="cart-item-quantity">
                                                <MuiThemeProvider theme={theme}>
                                                    <FormControl
                                                        fullWidth={true}
                                                    >
                                                        <Input
                                                            type="number"
                                                            placeholder="Quantity"
                                                            name="quantity"
                                                            fullWidth={true}
                                                            value={quantity[index]}
                                                        // onChange={props.handleInputChange}
                                                        />
                                                    </FormControl>
                                                </MuiThemeProvider>
                                            </div>
                                        </Col>
                                        <Col size="md-2">
                                            <div className="cart-item-quantity">
                                                <IconButton
                                                    // onClick={Search} 
                                                    aria-label="remove"
                                                >
                                                    <CancelIcon className="purple" />
                                                </IconButton>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Slide>
                        ))}
                    </div>
                ) : activeStep === 1 ? (
                    <div>
                        <div className="cart-area">
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>
                            <MuiThemeProvider theme={theme}>
                                <FormControl
                                    fullWidth={true}
                                >
                                    <Row>
                                        <Col size="md-12">
                                            <span className={props.errorClass}>
                                                {props.formMessage}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col size="md-1" />
                                        <Col size="md-4">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    First Name
                                             </h6>
                                                <Input
                                                    type="text"
                                                    value={first}
                                                    name="first"
                                                    fullWidth={true}
                                                // onChange={}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-2" />
                                        <Col size="md-4">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Last Name
                                            </h6>
                                                <Input
                                                    type="text"
                                                    value={last}
                                                    name="last"
                                                    fullWidth={true}
                                                // onChange={}
                                                />
                                            </Slide>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col size="md-1" />
                                        <Col size="md-10">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Street
                                            </h6>
                                                <Input
                                                    type="text"
                                                    value={street}
                                                    name="street"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-1" />
                                    </Row>
                                    <Row>
                                        <Col size="md-1" />
                                        <Col size="md-10">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Apt / Suite / Other
                                            </h6>
                                                <Input
                                                    type="text"
                                                    value={second}
                                                    name="second"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-1" />
                                    </Row>
                                    <Row>
                                        <Col size="md-1" />
                                        <Col size="md-4">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    City
                                            </h6>
                                                <Input
                                                    type="text"
                                                    value={city}
                                                    name="city"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-2" />
                                        <Col size="md-4">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    State
                                            </h6>
                                                <Select
                                                    value={userState}
                                                    // onChange={props.handleInputChange}
                                                    name="userState"
                                                    fullWidth={true}
                                                >
                                                    {states.map((state, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={state.name}
                                                        >
                                                            {state.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Slide>
                                        </Col>
                                        <Col size="md-1" />
                                    </Row>
                                    <Row>
                                        <Col size="md-1" />
                                        <Col size="md-4">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Postal Code
                                            </h6>
                                                <Input
                                                    type="number"
                                                    value={zip}
                                                    name="zip"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-2" />
                                        <Col size="md-4">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Phone Number
                                            </h6>
                                                <Input
                                                    type="number"
                                                    value={phone}
                                                    name="phone"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-2" />
                                    </Row>
                                </FormControl>
                            </MuiThemeProvider>
                        </div>
                    </div>
                ) : activeStep === 2 ? (
                    <div>
                        <div className="cart-area">
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>
                            <MuiThemeProvider theme={theme}>
                                <FormControl
                                    fullWidth={true}
                                >
                                    <Row>
                                        <Col size="md-12">
                                            <div className="card-icons">

                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col size="md-1" />
                                        <Col size="md-10">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Card Number
                                                </h6>
                                                <Input
                                                    type="number"
                                                    value={cardNumber}
                                                    name="cardNumber"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-1" />
                                    </Row>
                                    <Row>
                                        <Col size="md-1" />
                                        <Col size="md-10">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Name on card
                                                </h6>
                                                <Input
                                                    type="text"
                                                    value={cardName}
                                                    name="cardName"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-1" />
                                    </Row>
                                    <Row>
                                        <Col size="md-1" />
                                        <Col size="md-4">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Expiration Date
                                                </h6>
                                                <Input
                                                    type="text"
                                                    value={cardDate}
                                                    name="cardDate"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-2" />
                                        <Col size="md-4">
                                            <Slide left={leftSlide} right={rightSlide} cascade>
                                                <h6 className="form-titles">
                                                    Security Code
                                                </h6>
                                                <Input
                                                    type="password"
                                                    value={cardCode}
                                                    name="cardCode"
                                                    fullWidth={true}
                                                // onChange={props.handleInputChange}
                                                />
                                            </Slide>
                                        </Col>
                                        <Col size="md-1" />
                                    </Row>
                                </FormControl>
                            </MuiThemeProvider>
                        </div>
                    </div>
                ) : activeStep === 3 ? (
                    <div>
                        <div className="cart-area">
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>
                            <div className="delivery-details">
                                <Row>
                                    <Col size="md-1" />
                                    <Col size="md-4">
                                        <Row>
                                        <Slide left={leftSlide} right={rightSlide} cascade>
                                            <Col size="md-12">
                                                <h6 className="form-titles">
                                                    Delivery Details
                                            </h6>
                                            </Col>
                                            <Col size="md-12">
                                                <h6 className="form-titles">
                                                    {first + " " + last}
                                                </h6>
                                            </Col>
                                            <Col size="md-12">
                                                <h6 className="form-titles">
                                                    {street}
                                                </h6>
                                            </Col>
                                            {second ? (
                                                <Col size="md-12">
                                                    <h6 className="form-titles">
                                                        {second}
                                                    </h6>
                                                </Col>
                                            ) : (<div />)}
                                            <Col size="md-12">
                                                <h6 className="form-titles">
                                                    {city}
                                                </h6>
                                            </Col>
                                            <Col size="md-12">
                                                <h6 className="form-titles">
                                                    {userState}
                                                </h6>
                                            </Col>
                                            <Col size="md-12">
                                                <h6 className="form-titles">
                                                    {zip}
                                                </h6>
                                            </Col>
                                            </Slide>
                                        </Row>
                                    </Col>
                                    <Col size="md-2" />
                                    <Col size="md-4">
                                        <Row>
                                            <Col size="md-12">
                                                <h6 className="form-titles">
                                                    Payment Information
                                            </h6>
                                            </Col>
                                            <Col size="md-12">
                                                <h6 className="form-titles">
                                                    {cardBrand}
                                                    {/* {cardNumber.charAt(cardNumber.length - 4)}
                                                {cardNumber.charAt(cardNumber.length - 3)}
                                                {cardNumber.charAt(cardNumber.length - 2)}
                                                {cardNumber.charAt(cardNumber.length - 1)} */}
                                                </h6>
                                            </Col>
                                            <Col size="md-6">
                                                <h6 className="form-titles">
                                                    {cardDate}
                                                </h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col size="md-1" />
                                </Row>
                            </div>
                            <Row>
                                <Col size="md-1" />
                                <Col size="md-10">
                                    <h6 className="form-titles">
                                        Cart ({props.lineItems.length + " Items"})
                                    </h6>
                                </Col>
                                <Col size="md-1" />
                            </Row>
                            {product.map((item, index) => (
                                <Slide left={leftSlide} right={rightSlide} key={index}>
                                    <div className="cart-item">
                                        <Row>
                                            <Col size="md-2">
                                                <img src={item.image_link} alt={item.product_name} className="cart-item-img" />
                                            </Col>
                                            <Col size="md-2">
                                                <div className="cart-item-name">
                                                    <span>
                                                        {item.product_name}
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col size="md-2" />
                                            <Col size="md-2">
                                                <div className="cart-item-price">
                                                    <span>
                                                        ${item.price}
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col size="md-2">
                                                <div className="cart-item-quantity">
                                                    <span>
                                                        {quantity[index]}
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Slide>
                            ))}
                        </div>
                    </div>
                ) : (<div />)}
                {userState ? (
                    <div className="cart-total-bg cart-total-section">
                        <Row>
                            {/* <div className="cart-total-section"> */}
                            <Col size="md-3">
                                <h6 className="form-titles">
                                    Order Price Information
                                    </h6>
                            </Col>
                            <Col size="md-3" />
                            <Col size="md-2">
                                <h6 className="form-titles">
                                    Before Tax: ${total.toFixed(2)}
                                </h6>
                            </Col>
                            <Col size="md-2">
                                <h6 className="form-titles">
                                    {userState} Tax: ${(tax * total).toFixed(2)}
                                </h6>
                            </Col>
                            <Col size="md-2">
                                <h6 className="form-titles">
                                    Order Total: ${(total + (tax * total)).toFixed(2)}
                                </h6>
                            </Col>
                            {/* </div> */}
                        </Row>
                    </div>
                ) : (
                        <div className="cart-total-bg">
                            <Row>
                                <div className="cart-total-section">
                                    <Col size="md-3">
                                        <h6 className="form-titles">
                                            Order Price Information
                                        </h6>
                                    </Col>
                                    <Col size="md-3" />
                                    <Col size="md-2">
                                        <span className="form-titles">
                                            Order Total: ${total.toFixed(2)}
                                        </span>
                                    </Col>
                                    <Col size="md-4" />
                                </div>
                            </Row>
                        </div>
                    )}
            </div>
            <div className="cart-button-area">
                {activeStep < 4 ? (
                    <MuiThemeProvider theme={theme}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.button}
                            color="secondary"
                            variant="contained"
                        >
                            Back
                        </Button>
                        <Button
                            disabled={activeStep === 4}
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Place Order and Pay' : 'Next'}
                        </Button>
                    </MuiThemeProvider>
                ) : (<div />)}
            </div>
        </div>
    )
}

export default Checkout;