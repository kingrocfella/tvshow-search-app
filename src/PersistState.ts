
export const PersistState = (state: any) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("web_state", serializedState);
};

export const GetState = () => {
  const stringifiedState: string = localStorage.getItem("web_state")!;
  return JSON.parse(stringifiedState);
};

export const RemoveState = () => {
  localStorage.removeItem("web_state");
}

