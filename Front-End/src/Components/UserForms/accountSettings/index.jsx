import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from "./index.module.scss";
import { Avatar, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firbase/firebase";
import { v4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDialog } from "../../../Redux/DataSlice";
import MsgDialogs from '../../../assets/handleErrors';

export default function AccountSettings() {
    const [imageUrl, setImageUrl] = React.useState([]);
    const [fname, setFname] = React.useState("");
    const [lname, setLname] = React.useState("");
    const [eml, setEml] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [updateState, setUpdateState] = React.useState(0);
    const [img, setImg] = React.useState('');
    const [imageUpload, setImageUpload] = React.useState(null);
    const IMG_REGEX = /\.(jpg|jpeg|png|gif)$/;
    const Image = IMG_REGEX.test(img);
    const [validImg, setValidImg] = React.useState(false);
    const [ImgFocus, setImgFocus] = React.useState(false);
    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const dispatch = useDispatch();
    const { openDialog } = useSelector((state) => state.DataReducer);
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/author/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
            });
        });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleChangeFname = (event) => {
        setFname(event.target.value);
    }
    const handleChangeLname = (event) => {
        setLname(event.target.value);
    }
    const handleChangeEml = (event) => {
        setEml(event.target.value);
    }
    const handleChangePwd = (event) => {
        setPwd(event.target.value);
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadFile();
        axios.patch(`http://localhost:3000/user`, {
            fName: fname,
            lName: lname,
            email: eml,
            password: pwd,
            img: imageUrl
        }, { withCredentials: true, credentials: 'include' })
            .then((response) => {
                dispatch(setOpenDialog(true))
                setUpdateState(1)
            })
            .catch((error) => {
                dispatch(setOpenDialog(true))
                setUpdateState(0)
            })
    }

    const refresh = 0;
    React.useEffect(() => {
        axios.get(`http://localhost:3000/user`, { withCredentials: true, credentials: 'include' })
            .then((response) => {
                setFname(response.data.fName);
                setLname(response.data.lName);
                setEml(response.data.email);
                setImageUrl(response.data.img);

            })
            .catch((error) => {
                console.log(error)
            })
    }, [refresh])

    return (
        <div className={`${styles.cont}  mx-auto  `}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50%' },
                    alignContent: 'center', alignItems: 'center'
                }}
                Validate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className={styles.divAvtar}>
                    <Avatar className={styles.avtar} src={imageUrl} alt="User Image" />
                </div>
                <div>
                    <TextField
                        fullWidth
                        required
                        id="firstName"
                        label="First Name"
                        value={fname}
                        onChange={handleChangeFname}
                    />
                    <TextField
                        fullWidth
                        required
                        id="lastName"
                        label="Last Name"
                        value={lname}
                        onChange={handleChangeLname}
                    />
                    <TextField
                        fullWidth
                        required
                        id="email"
                        type="email"
                        label="Email"
                        value={eml}
                        onChange={handleChangeEml}
                    />
                    <FormControl sx={{ m: 1, width: '50%', }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={pwd}
                            onChange={handleChangePwd}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <div className={styles.divInputFile}>
                        <input type="file" placeholder="Upload Your Picture"
                            className={styles.inputFile}
                            id='image'
                            autoComplete="off"
                            onChange={(e) => {
                                setImg(e.target.value)
                                setImageUpload(e.target.files[0])
                            }}
                            required aria-invalid={validImg ? "false" : "true"}
                            aria-describedby="uidnote" onFocus={() => setImgFocus(true)}
                            onBlur={() => setImgFocus(false)} />
                    </div>
                    <div>
                        <input type={"submit"} className={styles.btnSubmit} onClick={handleSubmit} value={"Update"} />
                    </div>
                </div>
                {openDialog && updateState === 1 ?
                    <MsgDialogs title="Update Data" msg={"Data Updated Successfully"} state={1} />
                    : openDialog && updateState === 0 ? <MsgDialogs title="Update Data" msg={"Data Not Invalid"} state={2} /> : ""}
            </Box>
        </div >
    );
}
