import type { IGuessEmailForm } from 'utils/types';
export const isValidUrl = (url: IGuessEmailForm['domainUrl']) => {
  const regex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regex.test(url);
};

export const isValidFullName = (fullName: IGuessEmailForm['fullName']): boolean => {
  const regex = /^[a-zA-Z ]+$/;
  const fullNameToTest = fullName.trim();

  return fullNameToTest.split(' ').length > 1 && regex.test(fullNameToTest);
};
