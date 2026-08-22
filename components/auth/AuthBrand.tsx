import BrandLogo from "../BrandLogo";

type Props = {
  tagline?: string;
};

export default function AuthBrand({
  tagline = "Digital agreements built on trust",
}: Props) {
  return (
    <header className="auth-brand">

      <BrandLogo />

      <p className="auth-tagline">
        {tagline}
      </p>

    </header>
  );
}