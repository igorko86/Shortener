export enum ApiRoutes {
  // Auth
  Registration = '/auth/registration',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  // Library
  GetCards = '/library/cards',
  CreateCard = '/library/card',
  CardContent = '/library/card/content',
  // Croups
  GetGroups = '/groups',
  CreateGroup = '/groups/group',
  // Plan
  GetPlan = '/plans/plan',
  UpdatePlanName = '/plans/plan/name',
  // cards for plan
  CreatePlanCard = '/plans/plan/card',
  DeletePlanCard = '/plans/plan/card',
  UpdateCardName = '/plans/plan/card/name',
  MovePlanCardId = '/plans/plan/card/movement',
  MoveSubCardId = '/plans/plan/card/subCard/movement',
  UpdateSubCardIds = '/plans/plan/card/subCard',
}
