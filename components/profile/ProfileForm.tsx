"use client";

type Props = {
  fullName: string;
  setFullName: (value: string) => void;

  designation: string;
  setDesignation: (value: string) => void;

  saving: boolean;

  onSave: () => void;
};

export default function ProfileForm({
  fullName,
  setFullName,
  designation,
  setDesignation,
  saving,
  onSave,
}: Props) {

  const initials = fullName
    ? fullName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (

    <section className="profile-card">

      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}

      <header className="profile-header">

        <div className="profile-avatar">
          {initials}
        </div>

        <div className="profile-header-content">

          <h1 className="profile-title">
            Your Profile
          </h1>

          <p className="profile-subtitle">
            Manage your Geplic identity
          </p>

        </div>

      </header>


      {/* =====================================================
          PROFILE FORM
      ===================================================== */}

      <form
        className="profile-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >

        {/* ===================================================
            FULL NAME
        =================================================== */}

        <div className="profile-field">

          <label htmlFor="profile-full-name">
            Full Name
          </label>

          <input
            id="profile-full-name"
            type="text"
            className="profile-input"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            autoComplete="name"
          />

        </div>


        {/* ===================================================
            DESIGNATION
        =================================================== */}

        <div className="profile-field">

          <label htmlFor="profile-designation">
            Designation
          </label>

          <input
            id="profile-designation"
            type="text"
            className="profile-input"
            placeholder="Your role or profession"
            value={designation}
            onChange={(e) =>
              setDesignation(e.target.value)
            }
            autoComplete="organization-title"
          />

        </div>


        {/* ===================================================
            SAVE
        =================================================== */}

        <div className="profile-actions">

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-lg"
          >
            {saving
              ? "Saving..."
              : "Save Profile"}
          </button>

        </div>

      </form>

    </section>

  );
}