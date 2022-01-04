export enum ApiRoutes {
  // Auth
  Registration = '/auth/registration',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  // Library
  GetCards = '/library/cards',
  GetMyCards = '/myLibrary/cards',
  CreateCard = '/library/card',
  CardContent = '/library/card/content',
  // Croups
  GetGroups = '/groups',
  CreateCourse = '/course',
  // Plan
  GetPlan = '/plans/plan',
  UpdatePlanName = '/plans/plan/name',
  // cards for plan
  CreatePlanCard = '/plans/plan/card',
  DeletePlanCard = '/plans/plan/card',
  UpdateCardName = '/plans/plan/card/name',
  MovePlanCardId = '/plans/plan/card/movement',
  MoveSubCardId = '/plans/plan/card/subCard/movement',
  DeleteSubCardIds = '/plans/plan/card/subCard',
  // Student
  GetStudents = '/students',
  AddStudent = '/students/student',
  // Exercise
  Exercise = '/exercise',
}
