import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Button,
  Box,
  Stack,
  Card,
  IconButton,
  Container,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import Iconify from '../../components/iconify';
import { getFoods } from 'src/actions/food';

export default function NewDiagnosis() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const foods = useSelector((state) => state.food.foods);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openStates, setOpenStates] = useState({});
  const [selectedFoods, setSelectedFoods] = useState({});
  const [count, setCount] = useState(1);

  const handleAddBox = () => {
    if (count < 20) setCount(count + 1);
  };

  useEffect(() => {
    dispatch(getFoods());
  }, []);

  const handleAutocompleteOpen = (id) => {
    setOpenStates({ ...openStates, [id]: true });
  };

  const handleAutocompleteClose = (id) => {
    setOpenStates({ ...openStates, [id]: false });
  };

  const handleAutocompleteInputChange = (index, value) => {
    setOpenStates({ ...openStates, [index]: value.trim().length > 0 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedFoods);
  };

  return (
    <>
      <Helmet>
        <title> New Prediction </title>
      </Helmet>

      <Box>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              New Prediction
            </Typography>
            <Button
              onClick={handleSubmit}
              type="submit"
              startIcon={<Iconify icon="material-symbols:play-arrow-rounded" />}
              size="medium"
              variant="outlined"
            >
              Calculate
            </Button>
          </Stack>

          <Card>
            <CardContent>
              {[...Array(count)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Box display={'flex'} gap={4} justifyContent={'space-between'} alignItems={'center'} marginBottom={2}>
                    <Autocomplete
                      sx={{ minWidth: 300 }}
                      open={openStates[index]}
                      onOpen={() => handleAutocompleteOpen(index)}
                      onClose={() => handleAutocompleteClose(index)}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      getOptionLabel={(option) => option.name}
                      options={foods}
                      renderInput={(params) => (
                        <TextField
                          sx={{
                            minWidth: '26px',
                          }}
                          {...params}
                          label="Food"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: <>{params.InputProps.endAdornment}</>,
                          }}
                          onChange={(event) => handleAutocompleteInputChange(index, event.target.value)}
                        />
                      )}
                    />

                    <TextField
                      label="Concentration"
                      id="outlined-start-adornment"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">mg/ml</InputAdornment>,
                      }}
                    />

                    {index === count - 1 && (
                      <IconButton onClick={() => handleAddBox()} color="default" sx={{ width: 40, height: 40 }}>
                        <Iconify icon="material-symbols:add-rounded" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
