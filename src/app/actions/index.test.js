import configureMockStore from "redux-mock-store";
import {
  createEpicMiddleware,
  // combineEpics,
  ActionsObservable
} from "redux-observable";
import actions, { Epics } from "./index";
import nock from "nock";
import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";
import { toArray } from "rxjs/operators";

const host = "http://localhost";

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

// const rootEpic = combineEpics(...Object.values(Epics));

describe("Epics test", () => {
  let store;
  beforeEach(() => {
    nock.cleanAll();
    const epicMiddleware = createEpicMiddleware();
    const mockStore = configureMockStore([epicMiddleware]); // 創建包含middleware的mock store
    store = mockStore();
    epicMiddleware.run(Epics.fetchTaskDataEpic);
  });
  it("fetch tasks SUCCESS:", async () => {
    const res = {
      errorcode: 200,
      message: "操作成功",
      data: { isLogin: true }
    };
    nock("https://moocs-todo.herokuapp.com")
      .get("/api/tasks")
      .reply(200, res);

    const action$ = ActionsObservable.of(actions.fetchTaskData()); // 建立mock action
    const epic$ = Epics.fetchTaskDataEpic(action$); // 使用mock action呼叫epic
    const result = await epic$.pipe(toArray()).toPromise(); // 取得異步http請求結果

    expect(result).toEqual([actions.fetchTaskDataSuccess(res)]);

    // console.log(result, [actions.fetchTaskDataSuccess(res)]);

    // return Epics.fetchTaskDataEpic(action$, store)
    //   .toPromise()
    //   .then(actionReceived => {
    //     console.log(actionReceived.type);
    //     // expect(actionReceived.type).toBe("UPDATE_TASK_DATA");
    //   });
  });
});
