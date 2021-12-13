import {
  FETCH_ALL_POSTINGS,
  POST_POSTING,
  DELETE_POSTING,
  PATCH_POSTING,
  POSTINGS_POSTING,
  FETCH_SCHOOL_BY_LGA_ID,
  POSTINGS_EMPLOYED,
  POST_TRANSFER,
} from "../actions/types";

const INITIALSTATE = {};

const PostingReducer = (state = INITIALSTATE, action) => {
  let output;
  switch (action.type) {
    case FETCH_ALL_POSTINGS:
      output = { ...state, fetchAllPostings: action.payload };
      break;
    case PATCH_POSTING:
      output = { ...state, patchPosting: action.payload };
      break;
    case DELETE_POSTING:
      output = { ...state, deletePosting: action.payload };
      break;
    case POST_POSTING:
      output = { ...state, postPosting: action.payload };
      break;
    case POSTINGS_POSTING:
      output = { ...state, postingsPosting: action.payload };
      break;

    case FETCH_SCHOOL_BY_LGA_ID:
      output = { ...state, postingFetchSchoolById: action.payload };
      break;

    case POSTINGS_EMPLOYED:
      output = { ...state, fetchPostingsEmployed: action.payload };
      break;
    case POST_TRANSFER:
      output = { ...state, postTransfer: action.payload };
      break;

    default:
      output = state;
      break;
  }
  return output;
};

export default PostingReducer;
