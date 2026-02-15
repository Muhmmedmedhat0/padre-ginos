const Pizza = (props) => {
  return React.createElement('div', {}, [
    React.createElement('h1', {}, 'The Pepperoni Pizza'),
    React.createElement(
      'p',
      {},
      'The classic pizza with pepperoni, tomato sauce, and mozzarella cheese.',
    ),
  ]);
};

const app = () => {
  return React.createElement('div', {}, [
    React.createElement('h1', {}, "Welcome to Padre Gino's Pizzeria"),
    React.createElement(Pizza, {}),
    React.createElement(Pizza, {}),
    React.createElement(Pizza, {}),
    React.createElement(Pizza, {}),
    React.createElement(Pizza, {}),
  ]);
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(app());
