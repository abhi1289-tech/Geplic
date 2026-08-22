type Props = {
  title: string;
  subtitle: string;
};

export default function AuthIntro({
  title,
  subtitle,
}: Props) {
  return (
    <section className="auth-intro">

      <h1 className="auth-title">
        {title}
      </h1>

      <p className="auth-subtitle">
        {subtitle}
      </p>

    </section>
  );
}