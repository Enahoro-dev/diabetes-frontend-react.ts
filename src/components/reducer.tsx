export enum ActionType {
    USER = 'user',
    FAMILY = 'family'
  }
  
  export type Action = {
    type: ActionType,
    payload: {
      field: string,
      value: string | number | Array<string | number>
    }
  }
  
  export type FormData = {
    user: {
      name: string,
      age: number,
      email:string,
      pregnancy:number,
      glucose:number,
      pressure:number,
      thickness:number,
      insulin:number,
      bmi:number
    },
    family: {
      states: Array<number>
    }
  }
  
  export const reducer = (previousData: FormData, action: Action) => {
    const { type, payload } = action
    const { field, value } = payload
    switch (type) {
      case ActionType.USER:
        return {
          ...previousData,
          user: {
            ...previousData.user,
            [field]: value
          }
        }
      case ActionType.FAMILY:
        return {
          ...previousData,
          family: {
            ...previousData.family,
            [field]: value
          }
        }
      default:
        return previousData
    }
  }