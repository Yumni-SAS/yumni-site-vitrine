import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, email, company, companySize, challenge, message } =
      body as {
        firstName?: string;
        email?: string;
        company?: string;
        companySize?: string;
        challenge?: string;
        message?: string;
      };

    // ── Validation ──────────────────────────────────────
    if (!firstName || !email || !company || !companySize || !challenge) {
      return Response.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Format d'email invalide." },
        { status: 400 }
      );
    }

    if (
      firstName.length > 100 ||
      email.length > 254 ||
      company.length > 200 ||
      companySize.length > 100 ||
      challenge.length > 100 ||
      (message && message.length > 2000)
    ) {
      return Response.json(
        { error: "Un ou plusieurs champs dépassent la longueur autorisée." },
        { status: 400 }
      );
    }

    // ── Send email ──────────────────────────────────────
    const { error } = await resend.emails.send({
      from: "Yumni Demo <onboarding@resend.dev>",
      to: ["contact@yumni.fr"],
      replyTo: email,
      subject: `[Yumni Démo] ${company} — ${firstName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1B3A2D; padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; font-size: 20px; margin: 0;">Nouvelle demande de démo</h1>
          </div>
          <div style="background: #fff; padding: 32px; border: 1px solid #E8E8E8; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px; width: 160px;">Prénom</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: 600;">${escapeHtml(firstName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #00814A;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Entreprise</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: 600;">${escapeHtml(company)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Taille</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px;"><span style="background: #E8F5EE; color: #00814A; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">${escapeHtml(companySize)}</span></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Défi RSE</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px;"><span style="background: #FEF3EC; color: #E8752A; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">${escapeHtml(challenge)}</span></td>
              </tr>
            </table>
            ${
              message
                ? `
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #E8E8E8;">
              <p style="color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
              <p style="color: #1A1A1A; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
            `
                : ""
            }
          </div>
          <p style="text-align: center; color: #9CA3AF; font-size: 11px; margin-top: 16px;">Envoyé depuis yumni.fr/demo</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Erreur lors de l'envoi. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
