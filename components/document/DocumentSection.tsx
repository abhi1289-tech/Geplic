type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
};

export default function DocumentSection({
  title,
  children,
  className = "",
  actions,
}: Props) {
  return (
    <section
      className={`document-section ${className}`.trim()}
    >
      {title && (
        <>
          <header className="section-header">
            <div className="section-heading">
              <h2 className="section-title">
                {title}
              </h2>
            </div>

            {actions && (
              <div className="section-actions">
                {actions}
              </div>
            )}
          </header>

          <div
            className="section-divider"
            aria-hidden="true"
          />
        </>
      )}

      <div className="section-content">
        {children}
      </div>
    </section>
  );
}