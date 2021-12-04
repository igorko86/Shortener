export enum ApiRoutes {
  // Auth
  Registration = '/auth/registration',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  // Library
  GetCards = '/library/cards',
  CreateCard = '/library/card',
  // Croups
  GetGroups = '/groups',
  CreateGroup = '/groups/group',
  // Plan
  GetPlan = '/plans/plan',
  // cards for plan
  CreatePlanCard = '/plans/plan/card',
  DeletePlanCard = '/plans/plan/card',
  MovePlanCardId = '/plans/plan/card/movement',
  MoveSubCardId = '/plans/plan/card/subCard/movement',
}
