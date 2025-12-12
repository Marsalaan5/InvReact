import axios from 'axios';

export async function exportPDF(endpoint, filename = 'report.pdf') {
  try {
    const response = await axios.get(endpoint, {
      responseType: 'blob', 
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('PDF export failed', err);
  }
}



export async function exportExcel(endpoint, filename = 'report.xlsx') {
  try {
    const response = await axios.get(endpoint, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Excel export failed', err);
  }
}


export async function refreshData(fetchFunction) {
  try {
    await fetchFunction();
  } catch (err) {
    console.error('Refresh failed', err);
  }
}



export function toggleHeader(dispatch, currentState, actionCreator) {
  dispatch(actionCreator(!currentState));
}