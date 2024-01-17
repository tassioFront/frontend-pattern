import { baseScreen, editableTypo, btn } from '@/enums/dataCy';
import { StorageKeys } from '@/enums/storage-keys';
import { getDataCy } from 'cypress/support/getDataCy';

describe('Todo - empty state', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/app/to-do', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          StorageKeys.GHUserData,
          `{"login":"tassioFront","id":47509510,"node_id":"MDQ6VXNlcjQ3NTA5NTEw","avatar_url":"https://avatars.githubusercontent.com/u/47509510?v=4","gravatar_id":"","url":"https://api.github.com/users/tassioFront","html_url":"https://github.com/tassioFront","followers_url":"https://api.github.com/users/tassioFront/followers","following_url":"https://api.github.com/users/tassioFront/following{/other_user}","gists_url":"https://api.github.com/users/tassioFront/gists{/gist_id}","starred_url":"https://api.github.com/users/tassioFront/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/tassioFront/subscriptions","organizations_url":"https://api.github.com/users/tassioFront/orgs","repos_url":"https://api.github.com/users/tassioFront/repos","events_url":"https://api.github.com/users/tassioFront/events{/privacy}","received_events_url":"https://api.github.com/users/tassioFront/received_events","type":"User","site_admin":false,"name":"Tássio","company":"@juntossomosmais","blog":"https://frontend-pattern.vercel.app/about","location":"Brazil","email":null,"hireable":null,"bio":"I'm FrontEnd Developer that loves wine and coffee. ☕️🍷👨🏻‍💻","twitter_username":null,"public_repos":52,"public_gists":0,"followers":88,"following":70,"created_at":"2019-02-10T23:25:10Z","updated_at":"2023-06-07T00:15:31Z"}`
        );
        win.localStorage.setItem(StorageKeys.GHUserName, 'tassioFront');
        win.localStorage.setItem(
          StorageKeys.TodoUsersData,
          `[{"name":"Chuck Norris","id":"1704479903004"}]`
        );
        win.localStorage.setItem(
          StorageKeys.TodoSelectedUser,
          `{"name":"Chuck Norris","id":"1704479903004"}`
        );
      },
    });
  });

  it('Should show empty state to create boards and be able to create them', () => {
    cy.get(getDataCy(baseScreen.isEmptyMessage)).contains(
      'create the first board'
    );
    cy.get(getDataCy(baseScreen.onEmpty)).click();
    cy.get(getDataCy(editableTypo.editableInput)).type('First board{Enter}');
    cy.get(getDataCy(btn.float)).click();
    cy.contains('First board').should('exist');
    cy.contains('Sorry, there is nothing here yet');
  });
});
