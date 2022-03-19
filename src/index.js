import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MemberProvider} from './providers/member'
import {BrowserRouter} from "react-router-dom"
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {ThemeProvider, createTheme} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: '#71ff9f',
      main: '#33cc70',
      dark: '#009a43',
      contrastText: 'black',
    },
    secondary: {
      light: '#ffea7d',
      main: '#ffb84d',
      dark: '#c88819',
      contrastText: 'black',
    },
  }
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MemberProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </MemberProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
