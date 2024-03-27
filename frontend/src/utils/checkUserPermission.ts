import { Auth } from 'aws-amplify';

const allowedGroups = ['Admin'];

export const checkUserPermission = (): Promise<boolean> => {
  return Auth.currentAuthenticatedUser()
    .then(user => {
      const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'];
      const validUserGroups = Array.isArray(userGroups) ? userGroups : [];
      return allowedGroups.some(group => validUserGroups.includes(group));
    })
    .catch(error => {
      console.log('獲取使用者資訊時發生錯誤:', error);
      return false;
    });
};