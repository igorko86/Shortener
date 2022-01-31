export enum ApiRoutes {
  // Auth
  Registration = '/auth/registration',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
  ForgotPassword = '/auth/forgot-password',
  ResetPassword = '/auth/reset-password',
  ChangeRole = '/auth/change-role',
  // Library
  GetCards = '/library/cards',
  CreateCard = '/library/card',
  CardContent = '/library/card/content',
  // Croups
  GetTutorCourses = '/courses/tutor-courses',
  GetStudentCourses = '/courses/student-courses',
  CreateCourse = '/courses/course',
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
  DeleteStudents = '/students',
  DeleteStudentsInGroup = '/students/student-groups',
  GetStudentsInGroup = '/students/student-groups',
  AddNewStudent = '/students/student',
  AddStudent = '/students/student-group',
  // Exercise
  CreateExercise = '/exercises/exercise',
  RemoveExercisesByIds = '/exercises/exercise',
  GetExerciseList = '/exercises',
}
