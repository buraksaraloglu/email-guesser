import { rest } from 'msw';

import { EMAIL_GUESSER_SERVICE_URL } from 'utils/constants';

export const guessEmailMock = rest.post(`${EMAIL_GUESSER_SERVICE_URL}/v1/guess`, (req, res, ctx) => {
  return res(
    ctx.json({
      email: 'testuser@domain.com',
    })
  );
});
