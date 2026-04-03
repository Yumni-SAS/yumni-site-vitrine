import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_TYPES = [
  "Démo produit",
  "Devis Pro/Enterprise",
  "Programme partenaire",
  "Support",
  "Presse",
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, company, type, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      type?: string;
      message?: string;
    };

    // ── Validation ──────────────────────────────────────
    if (!name || !email || !company || !type || !message) {
      return Response.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Format d'email invalide." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(type as (typeof ALLOWED_TYPES)[number])) {
      return Response.json(
        { error: "Type de demande invalide." },
        { status: 400 }
      );
    }

    // Limit field lengths to prevent abuse
    if (
      name.length > 200 ||
      email.length > 254 ||
      company.length > 200 ||
      message.length > 5000 ||
      (phone && phone.length > 30)
    ) {
      return Response.json(
        { error: "Un ou plusieurs champs dépassent la longueur autorisée." },
        { status: 400 }
      );
    }

    // ── Send email ──────────────────────────────────────
    const { error } = await resend.emails.send({
      from: "Yumni Contact <onboarding@resend.dev>",
      to: ["contact@yumni.fr"],
      replyTo: email,
      subject: `[Yumni Contact] ${type} — ${company}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1B3A2D; padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; font-size: 20px; margin: 0;">Nouveau message — ${type}</h1>
          </div>
          <div style="background: #fff; padding: 32px; border: 1px solid #E8E8E8; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px; width: 140px;">Nom</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: 600;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #00814A;">${escapeHtml(email)}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Téléphone</td><td style="padding: 8px 0; color: #1A1A1A; font-size: 14px;">${escapeHtml(phone)}</td></tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Entreprise</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: 600;">${escapeHtml(company)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Type</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px;"><span style="background: #E8F5EE; color: #00814A; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">${escapeHtml(type)}</span></td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #E8E8E8;">
              <p style="color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</p>
              <p style="color: #1A1A1A; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
          </div>
          <p style="text-align: center; color: #9CA3AF; font-size: 11px; margin-top: 16px;">Envoyé depuis yumni.fr/contact</p>
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
