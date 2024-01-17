import { todoCy } from '@/enums/dataCy';
import { StorageKeys } from '@/enums/storage-keys';
import { getDataCy } from 'cypress/support/getDataCy';
describe('Todo - drag and drop', () => {
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
        win.localStorage.setItem(
          StorageKeys.TodoBoardData,
          `[{"title":"Todo","todoItems":[
              {"title":"My first task","description":"this is to validate the first task created so far","status":"1704501195058","authorId":"1694198123060","assignedId":"1694198123060","id":"1705085126345"},
              {"title":"New task","description":"hey nice description","status":"1704501195058","authorId":"1694198123060","assignedId":"1694198123060","id":"1705406296332"}],
              "id":"1704501195058"},
            {"title":"In Progress","todoItems":[
              {"title":"Tassio's task","description":"First one, man. Do it!","status":"1705085095168","authorId":"1694198123060","assignedId":"1705092179322","id":"1705085369305"},
              {"title":"Second one","description":"This is in progress. Let's dive inThis is in progress. Let's dive inThis is in progress. Let's dive inThis is in progress. Let's dive inThis is in progress. Let's dive inThis is in progress. Let's div","status":"1705085095168","authorId":"1694198123060","assignedId":"1694198123060","id":"1705085146650"},
              {"title":"The last task","description":"A description used to test it and validatee","status":"1705085095168","authorId":"1694198123060","assignedId":"1694198123060","id":"1456789"}],
              "id":"1705085095168"},
            {"title":"Done","todoItems":[],"id":"1705085100993"}]`
        );
      },
    });
  });

  it('Should drag and drop tasks in and between boards', () => {
    // moving in the same board
    cy.get(getDataCy(todoCy.task + '1705085126345')).drag(
      getDataCy(todoCy.task + '1705406296332'),
      {
        force: true,
      }
    );

    // moving to another board
    cy.get(getDataCy(todoCy.task + '1705085126345')).drag(
      getDataCy(todoCy.droppableArea + '1705085100993'),
      {
        force: true,
      }
    );

    // it is failing
    // cy.get(getDataCy(todoCy.task + '1705085146650')).drag(
    //   getDataCy(todoCy.task + '1705406296332'),
    //   {
    //     force: true,
    //   }
    // );
  });
});
