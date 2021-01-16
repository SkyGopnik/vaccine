import axios from 'axios';

export const GET_RATING_STARTED = 'GET_RATING_STARTED';
export const GET_RATING_SUCCESS = 'GET_RATING_SUCCESS';
export const GET_RATING_FAILURE = 'GET_RATING_FAILURE';

export const getRating = (needLoading = true) => {
  return dispatch => {
    if (needLoading) {
      dispatch(getRatingStarted());
    }

    axios.get('/rating/').then((res) => {
      dispatch(getRatingSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getRatingFailure(err.message));
    });
  }
};

const getRatingSuccess = (data) => ({
  type: GET_RATING_SUCCESS,
  payload: data
});

const getRatingStarted = () => ({
  type: GET_RATING_STARTED
});

const getRatingFailure = error => ({
  type: GET_RATING_FAILURE,
  payload: {
    error
  }
});
