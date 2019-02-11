## Available Scripts

In the project root directory, you can run below command. It runs the app in the production mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `sh ./start.sh`

## Server

To enter the Server directory from project root directory

### `cd server`

To install dependencies

### `yarn install`

To run tests on server code

### `npm run test`

To compile typescript files to  without watch mode

### `npm run compile`

To compile typescript files to JS with watch, so that it auto-compile for every save.

### `npm run compile:watch`

## Client

To enter the Client directory

### `cd client`

To install dependencies

### `yarn install`

To run tests on Client code without watch

### `CI=true npm run test`

To run tests on Client code with watch mode

### `npm run test`

To build Client files for production

### `npm run build`

### Requirements done

1. Poll the endpoint every 10 seconds to get the latest rates for GBP, EUR and USD. 
2. Contain at least three pockets with USD, EUR, GBP currencies
3. Make it possible to make an exchange between pockets
4. Contain two inputs on the active exchange screen for both pockets. Each input should be validated to let to type only numbers with two digits after the dot
5. Give all the necessary information: exchange rate between active pockets and pocket balances.

### Areas to improve, if allocated more time.
1. Design & User experience 
    - The gradients and backdrop can be designed better & to perfection.
    - Touch actions like swipe can be added.
2. Test coverage
    - Tests coverage can be improved from the current 82% to above 95%.
3. Deployment
    - The app can be encompassed in a docker container and deployed to a AWS / Google cloud instance.



