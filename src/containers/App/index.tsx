import { ErrorBoundary } from 'react-error-boundary';

import Layout from 'containers/Layout';
import GuesserContainer from 'containers/GuesserContainer';

const App = () => {
  return (
    <Layout>
      <ErrorBoundary FallbackComponent={() => <>something happened</>}>
        <GuesserContainer />
      </ErrorBoundary>
    </Layout>
  );
};

export default App;
