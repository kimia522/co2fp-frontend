// theme
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./themes/Theme";
// local context
import DateTimeAdapter from "./context/datetimeadapter";
import {DeviceProvider} from "./context/devicecontext";
import {AuthProvider} from "./hooks/useAuth";
import Main from "./layouts/main";
// React Router DOM to manage Routing in ReactAPP
import { BrowserRouter as Router } from "react-router-dom";

function App() {

    //  getting user infromation from local storage
    // scenario is to store Auth Data in local storage after fetching from backend
    const user = JSON.parse(localStorage.getItem('signed-user'));

  return (
      // this context provider let us manage our theme
      <ThemeProvider theme={theme}>
        {/* this context let us adapt our date and time in material ui style using Dayjs package */}
        <DateTimeAdapter>
          {/* this context let us know the current size of screen */}
          <DeviceProvider>
              {/* this context let us handle authentication */}
              <AuthProvider user={user}>
                  {/* Router DOM Context to handle Routes Defined in Main.js*/}
                  <Router>
                    {/* The Routes Defined in Main.js ./layouts */}
                    <Main/>
                  </Router>
              </AuthProvider>
          </DeviceProvider>
        </DateTimeAdapter>
      </ThemeProvider>
  );
}

export default App;
