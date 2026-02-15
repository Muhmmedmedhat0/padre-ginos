const app = () => {
  return React.createElement('div', {}, 'Hello World');
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(app());
