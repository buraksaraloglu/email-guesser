import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

import Layout from 'containers/Layout';
import GuesserContainer from 'containers/GuesserContainer';

import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import Alert from 'components/Alert';

const App = () => {
  const isDarkModePreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <>
      <Layout>
        <ErrorBoundary FallbackComponent={Alert}>
          <GuesserContainer />
        </ErrorBoundary>
      </Layout>
      <ToastContainer theme={isDarkModePreferred ? 'dark' : 'light'} />
    </>
  );
};

export default App;
