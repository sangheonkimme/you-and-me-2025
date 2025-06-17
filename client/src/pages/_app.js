import Seo from '../components/Seo';
import { store } from '../reduxStore/store';
import { Provider } from 'react-redux';
import '@/src/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Seo />
      <Component {...pageProps} />
    </Provider>
  );
}
