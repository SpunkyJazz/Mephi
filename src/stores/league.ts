import { makeAutoObservable } from "mobx";
import { message } from "antd";
import { TLoginData } from "src/types";

export class LeagueStore {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  public login = (data: TLoginData): void => {
    if (data.login === "admin" && data.password === "adminadmin") {
      this.isAuth = true;
    } else {
      message.error("Ошибка входа");
    }
  };

  public logout = (): void => {
    this.isAuth = false;
  };
}
