import styled from 'styled-components';

export const DivWrapperLayout = styled.div`
  display: flex;
`;

export const DivPlan = styled.div`
  grid-area: plan;
`;
export const DivGroup = styled.div`
  grid-area: group;
`;
export const DivStudents = styled.div`
  grid-area: student;
`;
export const DivLib = styled.div<{
  showPlanCoursesStudents: boolean;
}>`
  grid-area: ${({ showPlanCoursesStudents }) => (showPlanCoursesStudents ? 'lib' : 'plan')};
`;
export const DivContent = styled.div`
  grid-area: cont;
`;

export const GridBlock = styled.div<{
  isTutorOpen: boolean;
  isLibraryOpen: boolean;
  showTutorLibrary: boolean;
  showPlanCoursesStudents: boolean;
}>`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: 150px auto;
  grid-template-columns: repeat(5, 19.5%);
  grid-template-areas:
    'plan ${({ showPlanCoursesStudents }) =>
      showPlanCoursesStudents ? 'group student myLib lib' : 'cont cont cont cont'}'
    'plan cont cont ${({ isTutorOpen }) =>
      isTutorOpen
        ? 'myLib'
        : 'cont'} ${({ isTutorOpen, isLibraryOpen, showPlanCoursesStudents }) => ((isTutorOpen || isLibraryOpen) && showPlanCoursesStudents ? 'lib' : 'cont')}';
  grid-column-gap: 10px;
`;
