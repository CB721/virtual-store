import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AlbumIconOutlinedIcon from '@material-ui/icons/AlbumOutlined';
import Badge from '@material-ui/core/Badge';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import "./style.css";


function Navbar() {
    const cart = useSelector(state => state.cart);
    const [cartTotal, setCartTotal] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (cart[0]) {
            setCartTotal(cart[0].line_items.length)
        }
    }, [cart[0]]);
    useEffect(() => {
        if (window.sessionStorage.id) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [loggedIn]);
    function CheckCart() {
        if (window.sessionStorage.id) {
            window.location.href = "/cart";
        } else {
            toast("Please login to view your cart", {
                className: css({
                    background: '#3E0768',
                    boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
                    borderRadius: '17px'
                }),
                bodyClassName: css({
                    fontSize: '20px',
                    color: 'white'
                }),
                progressClassName: css({
                    background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(62,7,104,1) 80%)"
                })
            });
        }
    }
    function Search() {
        if (search) {
            sessionStorage.setItem("search", search);
            window.location.href = "/search";
        } else {
            toast("Search field cannot be empty", {
                className: css({
                    background: '#3E0768',
                    boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
                    borderRadius: '17px'
                }),
                bodyClassName: css({
                    fontSize: '20px',
                    color: 'white'
                }),
                progressClassName: css({
                    background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(62,7,104,1) 80%)"
                })
            });
        }
    }
    function logOut(event) {
        event.preventDefault();
        sessionStorage.clear();
        window.location.href = "/login";
    }
    function handleInputChange(event) {
        let value = event.target.value.trim();
        setSearch(value);
    }
    const theme = createMuiTheme({
        palette: {
            primary: { main: '#3E0768' }
        },
    });

    return (
        <header className="head-bar">
            <div className="header-wrapper">
                <nav className="nav-list">
                    {loggedIn ? (
                        <ol className="ordered-list">
                            <li className="list-icons white">
                                <a href="/">
                                    <AlbumIconOutlinedIcon
                                        fontSize="large"
                                    />
                                </a>
                            </li>
                            <li className="list-items white">
                                <a href="/">Demo Company</a>
                            </li>
                            <li className="list-items white">
                                <a href="/products">Products</a>
                            </li>
                            <li className="list-items white">
                                <a href="/tutorials">Tutorials</a>
                            </li>
                            <li className="list-items white">
                                <a href="/shop">Shop</a>
                            </li>
                            <li className="list-items white">
                                <a href="/contact">Contact</a>
                            </li>
                            <li className="list-icons white">
                                <IconButton onClick={Search} aria-label="search" >
                                    <SearchIcon className="white-to-purple" />
                                </IconButton>
                            </li>
                            <li className="list-items white">
                                <input
                                    className="search-box"
                                    type="text"
                                    name="search"
                                    placeholder="Search"
                                    value={search}
                                    onChange={handleInputChange}
                                />
                            </li>
                            <li className="list-items white">
                                <a href="/user/profile">Profile</a>
                            </li>
                            <li className="list-items white">
                                <div
                                    className="white-to-purple pointer"
                                    onClick={(event) => logOut(event)}
                                >
                                    Sign Out
                                </div>
                            </li>
                            <li className="list-icons white">
                                <IconButton
                                    onClick={CheckCart}
                                    aria-label="Go to cart"
                                >
                                    <MuiThemeProvider theme={theme}>
                                        <Badge
                                            badgeContent={cartTotal}
                                            color="primary"
                                        >
                                            <ShoppingCartOutlinedIcon className="white-to-purple" />
                                        </Badge>
                                    </MuiThemeProvider>
                                </IconButton>
                            </li>
                        </ol>
                    ) : (
                            <ol className="ordered-list">
                                <li className="list-items white">
                                    <a href="/">
                                        <AlbumIconOutlinedIcon
                                            fontSize="large"
                                        />
                                    </a>
                                </li>
                                <li className="list-items white">
                                    <a href="/">Demo Company</a>
                                </li>
                                <li className="list-items white">
                                    <a href="/products">Products</a>
                                </li>
                                <li className="list-items white">
                                    <a href="/tutorials">Tutorials</a>
                                </li>
                                <li className="list-items white">
                                    <a href="/shop">Shop</a>
                                </li>
                                <li className="list-items white">
                                    <a href="/contact">Contact</a>
                                </li>
                                <li className="list-items white">
                                    <IconButton onClick={Search} aria-label="search" >
                                        <SearchIcon className="white-to-purple" />
                                    </IconButton>
                                </li>
                                <li className="list-items white">
                                    <input
                                        className="search-box"
                                        type="text"
                                        name="search"
                                        placeholder="Search"
                                        value={search}
                                        onChange={handleInputChange}
                                    />
                                </li>
                                <li className="list-items white">
                                    <a href="/login">Login</a>
                                </li>
                                <li className="list-items white">
                                    <a href="/create_account">Sign Up</a>
                                </li>
                                <li className="list-items white">
                                    <IconButton
                                        onClick={CheckCart}
                                        aria-label="Go to cart"
                                    >
                                        <MuiThemeProvider theme={theme}>
                                            <Badge
                                                badgeContent={cartTotal}
                                                color="primary"
                                            >
                                                <ShoppingCartOutlinedIcon className="white-to-purple" />
                                            </Badge>
                                        </MuiThemeProvider>
                                    </IconButton>
                                </li>
                            </ol>
                        )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
