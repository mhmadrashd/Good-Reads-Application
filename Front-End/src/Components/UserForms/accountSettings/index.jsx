import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function AccountSettings() {
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Container>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50%' },
                    alignContent: 'center', alignItems: 'center'
                }}
                Validate
                autoComplete="off"
            >
                <div>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="First Name"
                        defaultValue="Hello World"
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Last Name"
                        defaultValue="Hello World"
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        type="email"
                        label="Email"
                        defaultValue="Hello World"
                    />
                    <FormControl sx={{ m: 1, width: '50%', }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
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

                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 56, height: 56 }}
                    />
                </div>
            </Box>
        </Container >
    );
}
