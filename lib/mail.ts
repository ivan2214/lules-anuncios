import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  type: 'STORE' | 'USER' = 'USER'
) => {
  const confirmLink = `${process.env.PUBLIC_URL}/auth/${
    type === 'STORE' ? 'store/new-verification' : 'new-verification'
  }?token=${token}`;

  const { error } = await resend.emails.send({
    from: 'onboardin@resend.dev',
    to: email,
    subject: 'Please confirm your email',
    text: `Please confirm your email by clicking here: ${confirmLink}`,
    html: `<p>Please confirm your email by clicking here: <a href="${confirmLink}">${confirmLink}</a></p>`
  });

  if (error) {
    console.log(error);
  }
};
