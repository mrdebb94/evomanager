import './css/site.css';
import 'typeface-roboto';
import 'whatwg-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import { ApplicationState }  from './store';
import * as RoutesModule from './routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as signalR from "@aspnet/signalr";

//signalR connection

/*const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub/projectsubscribe")
    .build();

connection.start().catch(err => document.write(err));

connection.on("ProjectSubscribeChange", (username: string, message: string) => {
    console.log("Jelentkezes tortent: " + username + " " + message);
});
*/


/*let _hubConnection = new signalR.HubConnection('/hub/projectsubscribe');

_hubConnection.start()
  .then(() => console.log('Connection started!'))
  .catch(err => console.log(err));

_hubConnection.on("ProjectSubscribeChange", (username: string, message: string) => {
    //this.msgs.push({severity: type, summary: payload});
    console.log("Jelentkezes tortent: " + username + " " + message);
  });
*/

const theme = createMuiTheme();
  
let routes = RoutesModule.routes;

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(history, initialState);

//set xsrftoken
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1");
store.dispatch({type:'SetXsrfTokenAction', xsrfToken: cookieValue});

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing configuration
    // and injects the app into a DOM element.
    ReactDOM.render(
        <AppContainer>
            <MuiThemeProvider theme={theme}>
            <Provider store={ store }>
                <ConnectedRouter history={ history } children={ routes } />
            </Provider>
            </MuiThemeProvider>
        </AppContainer>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
