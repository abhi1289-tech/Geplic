type Props = {
  message: string;
};

export default function StatusPage({
  message,
}: Props) {
  return (
    <div className="status-page">
      <p className="status-page-message">
        {message}
      </p>
    </div>
  );
}