import axios from 'axios';
import { ENDPOINT } from './../config/production';
import './../config/';

export default function insertItemData(data, tableName) {
  console.log('insert function called',tableName+ JSON.stringify(data));
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ENDPOINT}${tableName}`, data);
      const insertedData = response.data;
      console.log('inerted items data status=', response.statusText);
      dispatch({
        type: 'DATA_INSERTED',
        tableName,
        payload: insertedData,
      });
      return insertedData;
    } catch (e) {
      console.error(e);
    }
  };
}
