import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/*
  Stylesheet order is deliberate and must not be rearranged:
    variables -> the custom properties everything else reads
    reset     -> clears browser defaults
    global    -> base typography and shared utilities

  Component stylesheets are imported by the components themselves, so they land
  after these three and can safely override them.
*/
import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
