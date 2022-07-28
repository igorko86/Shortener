import styled from 'styled-components';
import { Form } from '../../../shared/styles/formStyles';
import { theme } from '../../../theme';

export const CreateCardDiv = styled.div`
  min-height: calc(100vh - 360px);
  display: flex;
  gap: 10px;
`;

export const PanelForm = styled(Form)`
  width: 25%;
  background: ${theme.colors.light5};
  border-radius: ${theme.borderRadius} 0 0 ${theme.borderRadius};
  margin-top: 57px;
  padding: 10px;
  border: 1px solid ${theme.colors.black};
`;

export const InfoPanelDiv = styled.div`
  width: 75%;

  .ql-toolbar.ql-snow {
    border-radius: 0 ${theme.borderRadius} 0 0;
  }

  .ql-container.ql-snow {
    border-radius: 0 0 ${theme.borderRadius} 0;
  }

  .ql-container.ql-snow,
  .ql-toolbar.ql-snow {
    border: 1px solid ${theme.colors.black};
  }
  .ql-editor,
  .ql-editor.ql-blank {
    height: calc(100vh - 360px);
    overflow-y: auto;
    overflow-x: hidden;
  }
`;
