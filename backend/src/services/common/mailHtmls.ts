export const registerMailHtml = ({ link }: { link: string }) => {
  return `
        <div>
            <h1>To activate, follow the link</h1>
            <a href="${link}">${link}</a>
        </div>
      `;
};

export const registerNewStudentMailHtml = ({
  link,
  password,
  tutorName,
}: {
  link: string;
  password: string;
  tutorName: string;
}) => {
  return `
        <div>
            <h1>To activate your account, please, follow the link</h1>
            <a href="${link}">${link}</a>
            <p>Current password: ${password}</p>
            <p>Tutor name: ${tutorName}</p>
        </div>
  `;
};

export const registerStudentMailHtml = ({ tutorName }: { tutorName: string }) => {
  return `
        <div>
            <p>Tutor name: ${tutorName}</p>
        </div>
  `;
};
export const registerStudentWithGroupMailHtml = ({
  link,
  password,
  groupName,
  tutorName,
}: {
  link: string;
  password: string;
  groupName: string;
  tutorName: string;
}) => {
  return `
        <div>
            <h1>To activate your account, please, follow the link</h1>
            <a href="${link}">${link}</a>
            <p>Password: ${password}</p>
            <p>Tutor name: ${tutorName}</p>
            <p>Group name: ${groupName}</p>
        </div>
  `;
};

export const registerExistsStudentWithGroupMailHtml = ({
  groupName,
  tutorName,
}: {
  groupName: string;
  tutorName: string;
}) => {
  return `
        <div>
            <p>Tutor name: ${tutorName}</p>
            <p>Group name: ${groupName}</p>
        </div>
  `;
};

export const forgotPasswordMailHtml = ({ link }: { link: string }) => {
  return `
        <div>
            <h1>To reset password, follow the link</h1>
            <a href="${link}">${link}</a>
        </div>
      `;
};
