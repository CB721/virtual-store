import React, { useState } from "react";
import CreateIcon from '@material-ui/icons/Create';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Button from "../Button";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import "./style.css";

function ProfileCard(props) {
    const theme = createMuiTheme({
        palette: {
            primary: { main: '#ffffff' },
            secondary: { main: '#3E0768' }
        },
    });
    const [newEmail, setNewEmail] = useState(window.sessionStorage.email);
    const [newPhone, setNewPhone] = useState(window.sessionStorage.phone);
    const [newStreet, setNewStreet] = useState(window.sessionStorage.street_address);
    const [newSecond, setNewSecond] = useState(window.sessionStorage.secondary_address);
    const [newCity, setNewCity] = useState(window.sessionStorage.city);
    const [newState, setNewState] = useState(window.sessionStorage.user_state);
    const [newZip, setNewZip] = useState(window.sessionStorage.zip_code);
    const handleSubmit = (event) => {
        event.preventDefault();
        props.updateUser(newEmail, newPhone, newStreet, newSecond, newCity, newState, newZip);
    }
    return (
        <div className={props.cardClass}>
            <MuiThemeProvider theme={theme}>
                <IconButton onClick={props.editAction} className="edit-icon">
                    <CreateIcon
                        className="profile-edit-icon"
                        color="primary"
                    />
                </IconButton>
            </MuiThemeProvider>
            <div className="profile-card-image">
                <img src={props.image} alt={props.status} />
            </div>
            <div className="profile-card-contact">
                <div className="profile-card-name white">
                    <h1>
                        {props.firstName}
                    </h1>
                </div>
                {props.edit ? (
                    <MuiThemeProvider theme={theme}>
                        <FormControl fullWidth={true} color="secondary">
                            <span className="white">
                                Email Address
                            </span>
                            <Input
                                onChange={(event) => setNewEmail(event.target.value)}
                                value={newEmail}
                                placeholder={props.email}
                                name="newEmail"
                                type="text"
                                inputProps={{
                                    'aria-label': 'email',
                                }}
                            />
                            <span className="white">
                                Phone Number
                            </span>
                            <Input
                                onChange={(event) => setNewPhone(event.target.value)}
                                value={newPhone}
                                placeholder={props.phone}
                                name="newPhone"
                                type="number"
                                inputProps={{
                                    'aria-label': 'phone',
                                }}
                            />
                            <span className="white">
                                Street Adress
                            </span>
                            <Input
                                onChange={(event) => setNewStreet(event.target.value)}
                                value={newStreet}
                                placeholder={props.streetAddress}
                                name="newStreet"
                                type="text"
                                inputProps={{
                                    'aria-label': 'address',
                                }}
                            />
                            <span className="white">
                                Secondary Adress
                            </span>
                            <Input
                                onChange={(event) => setNewSecond(event.target.value)}
                                value={newSecond}
                                placeholder={props.secondaryAddress}
                                name="newSecond"
                                type="text"
                                inputProps={{
                                    'aria-label': 'address',
                                }}
                            />
                            <span className="white">
                                City
                            </span>
                            <Input
                                onChange={(event) => setNewCity(event.target.value)}
                                value={newCity}
                                placeholder={props.city}
                                name="newCity"
                                type="text"
                                inputProps={{
                                    'aria-label': 'address',
                                }}
                            />
                            <span className="white">
                                State
                            </span>
                            <Input
                                onChange={(event) => setNewState(event.target.value)}
                                value={newState}
                                placeholder={props.state}
                                name="newState"
                                type="text"
                                inputProps={{
                                    'aria-label': 'address',
                                }}
                            />
                            <span className="white">
                                Zip Code
                            </span>
                            <Input
                                onChange={(event) => setNewZip(event.target.value)}
                                value={newZip}
                                placeholder={props.zip}
                                name="newZip"
                                type="text"
                                inputProps={{
                                    'aria-label': 'address',
                                }}
                            />
                            <div className="profile-submit">
                                <Button
                                    action={handleSubmit}
                                    buttonClass="explore"
                                    text="Update"
                                />
                            </div>
                        </FormControl>
                    </MuiThemeProvider>
                ) : (
                        <div>
                            <div className="profile-card-email white">
                                {props.email !== "null" ? (
                                    <span>
                                        {props.email}
                                    </span>
                                ) : (<div />)}
                            </div>
                            <div className="profile-card-phone white">
                                {props.email !== "null" ? (
                                    <span>
                                        {props.phone}
                                    </span>
                                ) : (<div />)}
                            </div>
                            <div className="profile-card-address white">
                                <span>
                                    {props.streetAddress}
                                </span>
                                {props.secondaryAddress !== "null" ? (
                                    <span>
                                        {props.secondaryAddress}
                                    </span>
                                ) : (<div />)}
                                {props.city !== "null" && props.state !== "null" && props.zip !== "null" ? (
                                    <span>
                                        {props.city + ", " + props.state + " " + props.zip}
                                    </span>
                                ) : (<div />)}
                            </div>
                        </div >
                    )
                }
            </div >
            <div className="profile-card-member-info">
                {props.edit ? (
                    <div />
                ) : (
                        <div>
                            <div className="profile-card-joined-date white">
                                <span>
                                    Member since {props.joinedDate}
                                </span>
                            </div>
                            <div className="profile-card-status white">
                                <span>
                                    {props.status}
                                </span>
                            </div>
                        </div>
                    )}
            </div>
            <div className="waves" />
        </div >
    )
}

export default ProfileCard;