export const registerMailHtml = ({ link }: { link: string }) => {
  return `
        <div>
            <h1>To activate, follow the link</h1>
            <a href="${link}">${link}</a>
        </div>
      `;
};

export const registerStudentMailHtml = ({
  link,
  password,
  groupName = '',
  tutorName,
}: {
  link: string;
  password: string;
  groupName: string | undefined;
  tutorName: string;
}) => {
  const group = groupName ? `<p>Current group name ${groupName}</p>` : '';

  const templateWithPassword = `
        <div>
            <h1>To activate your account, please, follow the link</h1>
            <a href="${link}">${link}</a>
            <p>Current password ${password}</p>
            ${group}
            <p>Tutor name ${tutorName}</p>
        </div>
  `;

  const templateStandard = `
        <div>
            <p>Tutor name ${tutorName}</p>
            ${group}
        </div>
      `;

  return password ? templateWithPassword : templateStandard;
};

export const forgotPasswordMailHtml = ({ link }: { link: string }) => {
  return `
        <div>
            <h1>To reset password, follow the link</h1>
            <a href="${link}">${link}</a>
        </div>
      `;
};
