const reducer = (state = [], action) => {
  console.log('Reducer', action);
  switch (action.type) {
    case 'CURRENT.TABLE':
      return action.payload;
    case 'SCHEMA.POPULATE':
      return action.payload;
    case 'SCHEMA.INSERT':
      return state.concat(action.payload);
    case 'SCHEMA.UPDATE': {
      const res = state.map(s => (s.id !== action.payload.id ? s : { ...s, ...action.payload }));
      console.log(res);
      return res;
    }
    case 'SCHEMA.DELETE':
      return state.filter(s => s.id !== action.payload.id);
    default:
      return state;
  }
};

const schemaReducer = (...schemas) => {
  const initialState = {};
  schemas.forEach((schema) => {
    initialState[schema] = [];
  });

  return (state = initialState, action) => {
    if (action.schema && initialState[action.schema]) {
      return Object.assign({
        ...state,
        [action.schema]: reducer(state[action.schema], action),
      });
    }
    return state;
  };
};

export default schemaReducer;
