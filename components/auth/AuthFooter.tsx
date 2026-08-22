import Link from "next/link";

type Props = {
  question: string;
  actionText: string;
  href: string;
};

export default function AuthFooter({
  question,
  actionText,
  href,
}: Props) {
  return (
    <footer className="auth-footer">

      <p>

        {question}{" "}

        <Link
          href={href}
          className="auth-link"
        >
          {actionText}
        </Link>

      </p>

      <div className="auth-legal">

        <Link
          href="/privacy"
          className="auth-legal-link"
        >
          Privacy Policy
        </Link>

        {" • "}

        <Link
          href="/terms"
          className="auth-legal-link"
        >
          Terms of Service
        </Link>

      </div>

    </footer>
  );
}