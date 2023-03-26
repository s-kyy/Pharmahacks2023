import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDiagnosis } from 'src/actions/diagnosis';
import moment from 'moment';

import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../components/diagnosis/app';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

export default function ViewDiagnosis() {
  const theme = useTheme();
  const { id } = useParams();
  const diagnosis = useSelector((state) => state.diagnosis.diagnosis);
  const [foodData, setFoodData] = useState({});
  const [inputData, setInputData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiagnosis(id)).then(() => {
      setFoodData(diagnosis.foodContributionMapJson);
      setInputData(diagnosis.inputContributionMapJson);
    });
  }, []);

  const chartConfig = {
    labels: foodData && Object.keys(foodData),
    datasets: [
      {
        label: 'Food Contribution',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: foodData && Object.values(foodData),
      },
      {
        label: 'Input Contribution',
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: inputData && Object.values(inputData),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title> View Diagnosis </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Prediction made on {moment(diagnosis.timestamp).format('MMMM Do YYYY, h:mm a')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Expected contribution"
              total={diagnosis.predictedContributionValue || 0}
              icon={'mingcute:target-line'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Recommendation"
              total={diagnosis.recommendationMessage || ''}
              color="info"
              icon={'carbon:recommend'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {diagnosis && (
              <Bar
                data={chartConfig}
                options={{
                  title: {
                    display: true,
                    text: 'Contributions Chart',
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
