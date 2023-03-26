import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/iconify';
import { createUser } from 'src/actions/user';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const user = useSelector((state) => state.user.user);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleClick = () => {
    dispatch(
      createUser({
        name: name,
        username: username,
        password: password,
      })
    )
      .then((data) => {
        navigate('/home', { replace: true });
      })
      .catch(() => {
        alert('An error occur');
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Full name" value={name || ''} onChange={onChangeName} />
        <TextField name="username" label="Username" value={username || ''} onChange={onChangeUsername} />
        <TextField
          name="password"
          label="Password"
          value={password || ''}
          onChange={onChangePassword}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton sx={{marginTop:3}} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Create account
      </LoadingButton>
    </>
  );
}
